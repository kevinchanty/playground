package main

import (
	"bytes"
	"log"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func forever() {
	select {}
}

func main() {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to open connection")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open channel")
	ch.Qos(20, 0, false)

	err = ch.ExchangeDeclare(
		"logs",   // name
		"fanout", // type
		false,    // durable
		false,    // auto-deleted
		false,    // internal
		false,    // no-wait
		nil,      // arguments
	)

	q, err := ch.QueueDeclare("", false, false, true, false, nil)
	ch.QueueBind(q.Name, "", "logs", false, nil)

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register consumer")

	// var forever chan struct{}

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
			dotCount := bytes.Count(d.Body, []byte("."))
			log.Printf("dot count: %d", dotCount)
			log.Printf("Create user id: %s", d.UserId)

			go func() {
				t := time.Duration(dotCount)
				time.Sleep(t * time.Second)
				log.Printf("Message Done: %s", d.Body)

				// var err error
				if d.Redelivered {
					log.Printf("redelivered!")
					d.Nack(false, false)
				} else {
					log.Printf("not redelivered!")

					d.Nack(false, true)
				}
				failOnError(err, "Failed to ack")
			}()

		}
	}()

	log.Println("[*] Waiting for message. To exit press CTRL+C")

	forever()
}
