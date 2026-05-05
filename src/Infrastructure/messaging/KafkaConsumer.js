// src/Infrastructure/Messaging/KafkaConsumer.js
import { Kafka } from "kafkajs";

class KafkaConsumer {
  constructor() {
    this.kafka = new Kafka({
      clientId: "post-service-consumer",
      brokers: [process.env.KAFKA_BROKER || "kafka:29092"],
    });
    this.consumer = this.kafka.consumer({ groupId: "post-events-group" });
  }

  async start(topic) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: topic, fromBeginning: true });

    console.log(` Kafka Consumer listening on topic: ${topic}`);

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payload = JSON.parse(message.value.toString());
        console.log(
          `Consumer Received Item: ${payload.data.title || "New Item"}`,
        );
      },
    });
  }
}

export default new KafkaConsumer();
