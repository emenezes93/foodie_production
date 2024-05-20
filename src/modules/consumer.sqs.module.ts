import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConsumeSqsAdapter } from 'src/infrastructure/adapters/consumer.sqs.adapter';
import { ConsumerSqsService } from 'src/domain/use-cases/sqs.consumer.service';

@Module({
    imports: [
        SqsModule.register({
            consumers: [
                {
                    name: 'foodieFlow-SQS',
                    queueUrl: 'https://sqs.us-east-2.amazonaws.com/339712853459/foodieFlow-SQS',
                    region: 'us-east-2',
                },
            ],
        }),
    ],
    providers: [
        {
            provide: 'SqsConsumerInterface',
            useClass: ConsumeSqsAdapter,
        },
        ConsumerSqsService,
    ],
    exports: [ConsumerSqsService],
})
export class SqsConsumerModule { }

