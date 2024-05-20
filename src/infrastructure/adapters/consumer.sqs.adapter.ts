import { ConsumerSqsPorts } from 'src/domain/ports/consumer.sqs.port';
import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { OrderRequestService } from 'src/infrastructure/axios/order.request.service';

@Injectable()
export class ConsumeSqsAdapter implements ConsumerSqsPorts {
    constructor(
        @Inject('OrderRequestService')
        private readonly orderRequestService: OrderRequestService,
    ) {}
    @SqsMessageHandler('foodieFlow-SQS', false)
    async handleMessage(message: any): Promise<void> {
        console.log('Received message:', message);
        const body = JSON.parse(message.Body);

        const orderId = body.order_id;
        
        await this.orderRequestService.ChangeOrderForPreparation(orderId, "2");
    }
}