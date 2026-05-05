import { Kafka, Partitioners } from "kafkajs";

class KafkaProducer {
  constructor() {
    this.kafka = new Kafka({
      clientId: "post-service-producer",
      brokers: [process.env.KAFKA_BROKER || "kafka_container:29092"],
      retry: {
        initialRetryTime: 100,
        retries: 4,
      },
    });

    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });

    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) return;

    try {
      await this.producer.connect();
      this.isConnected = true;
      console.log("Kafka Producer Connected Successfully");
    } catch (error) {
      console.error("Kafka Producer Connection Error:", error);
      throw error;
    }
  }

  async sendEvent(topic, payload) {
    try {
      await this.connect();

      await this.producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(payload) }],
      });
      console.log(`Producer Event sent to topic: ${topic}`);
    } catch (error) {
      console.error(" Producer Error sending event:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
    }
  }
}

export default new KafkaProducer();
