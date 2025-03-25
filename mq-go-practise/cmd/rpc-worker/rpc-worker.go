package main

import (
	"context"
	"log"
	"mq-practice/internal/fibonacci"
	"mq-practice/internal/utils"
	"strconv"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {

	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	utils.FailOnError(err, "Failed to open connection")
	defer conn.Close()

	ch, err := conn.Channel()
	utils.FailOnError(err, "Failed to open channel")
	ch.Qos(20, 0, false)

	q, err := ch.QueueDeclare(
		"rpc_queue", // name
		false,       // durable
		false,       // delete when unused
		false,       // exclusive
		false,       // noWait
		amqp.Table{
			amqp.QueueTTLArg: 5000,
		}, // arguments
	)
	utils.FailOnError(err, "Failed qo declare queue")

	ch.Qos(
		1,
		0,
		false,
	)

	msgs, err := ch.Consume(
		q.Name,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	utils.FailOnError(err, "Failed to consume queue.")

	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		for d := range msgs {
			log.Printf("[.] rpc_queue Received a message: %s", d.Body)
			n, err := strconv.Atoi(string(d.Body))
			utils.FailOnError(err, "Failed to parse int")

			log.Printf("[.] fib(%d)", n)
			result := fibonacci.Fib(int(n))

			err = ch.PublishWithContext(ctx,
				"",        // exchange
				d.ReplyTo, // routing key
				false,     // mandatory
				false,     // immediate
				amqp.Publishing{
					ContentType:   "text/plain",
					CorrelationId: d.CorrelationId,
					Body:          []byte(strconv.Itoa(result)),
				})
			utils.FailOnError(err, "Failed to publish reply")

			log.Printf("Published reply to %s with corrId %s", d.ReplyTo, d.CorrelationId)
			d.Ack(false)
		}
	}()

	log.Println("[.] Awaiting RPC Request")
	utils.Forever()
}
