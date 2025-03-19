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

func main() {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to open connection")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open channel")

	q, err := ch.QueueDeclare(
		"hello",
		false,
		false,
		false,
		false,
		nil)

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

	var forever chan struct{}

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)
			dotCount := bytes.Count(d.Body, []byte("."))
			log.Printf("count: %d", dotCount)

			t := time.Duration(dotCount)
			time.Sleep(t * time.Second)
			log.Printf("Done")
			err := d.Ack(false)
			failOnError(err, "Failed to ack")
		}
	}()

	log.Println("[*] Waiting for message. To exit press CTRL+C")

	<-forever
}
