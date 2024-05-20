import { ConsumerSqsPorts } from "src/domain/ports/consumer.sqs.port";

export class ConsumerSqsPortsMock implements ConsumerSqsPorts {
    async handleMessage(message: any): Promise<void> {
      return Promise.resolve();
    }
  }
  