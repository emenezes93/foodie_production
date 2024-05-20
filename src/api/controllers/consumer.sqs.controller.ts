import { Controller, Post, Body } from '@nestjs/common';
import { ConsumerSqsService } from 'src/domain/use-cases/sqs.consumer.service';

@Controller('sqs-consumer')
export class ConsumerSqsController {
    constructor(private readonly sqsConsumerService: ConsumerSqsService) { }

    @Post('process')
    async processMessage(@Body() message: any): Promise<void> {
        await this.sqsConsumerService.processMessage(message);
    }
}
