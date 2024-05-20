import { Inject, Injectable } from '@nestjs/common';
import { ConsumerSqsPorts } from 'src/domain/ports/consumer.sqs.port';

@Injectable()
export class ConsumerSqsService {
    constructor(@Inject('SqsConsumerInterface') private readonly sqsConsumer: ConsumerSqsPorts) { }

    async processMessage(message: any): Promise<void> {
        await this.sqsConsumer.handleMessage(message);
    }
}

