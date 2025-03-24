package main

import (
	"context"
	"log"
	"os"
	"strings"
	"time"

	"github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

func bodyForm(args []string) string {
	var s string
	if len(args) < 3 || args[2] == "" {
		s = "hello"
	} else {
		s = strings.Join(args[2:], " ")
	}
	return s
}

func topicForm(args []string) string {
	var s string
	if len(args) < 2 || args[1] == "" {
		s = "hello"
	} else {
		s = args[1]
	}
	return s
}

func main() {
	conn, err := amqp091.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	err = ch.ExchangeDeclare(
		"zoo",   // name
		"topic", // type
		false,   // durable
		false,   // auto-deleted
		false,   // internal
		false,   // no-wait
		nil,     // arguments
	)
	failOnError(err, "Failed to declare exchange")

	// q, err := ch.QueueDeclare(
	// 	"hello", // name
	// 	false,   // durable
	// 	false,   // delete when unused
	// 	false,   // exclusive
	// 	false,   // no-wait
	// 	nil,     // arguments
	// )
	// failOnError(err, "Failed to declare a queue")

	publishCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	body := bodyForm(os.Args)
	topic := topicForm(os.Args)

	err = ch.PublishWithContext(publishCtx,
		"zoo", // exchange
		topic, // routing key
		false, // mandatory
		false, // immediate
		amqp091.Publishing{
			// DeliveryMode: amqp091.Persistent,
			ContentType: "text/plain",
			Body:        []byte(body),
		})
	failOnError(err, "Failed to publish a message")
	log.Printf(" [x] Sent %s\n", body)
}
