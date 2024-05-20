import { HttpModule } from '@nestjs/axios';
import {Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';
import { HealthController } from 'src/api/controllers/health.controller';
import { OrderController } from 'src/api/controllers/order.controller';
import { ConsumeSqsAdapter } from 'src/infrastructure/adapters/consumer.sqs.adapter';
import { OrderService } from 'src/domain/use-cases/order.service';
import { RequestService } from 'src/infrastructure/axios/request.service';
import { OrderRequestService } from 'src/infrastructure/axios/order.request.service';
import { ConsumerSqsService } from 'src/domain/use-cases/sqs.consumer.service';
import { SqsModule } from '@ssut/nestjs-sqs';

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
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [HealthController, OrderController],
  providers: [
    ConsumerSqsService,
    RequestService,
    OrderRequestService,
    OrderService,
    {
      provide: 'SqsConsumerInterface',
      useClass: ConsumeSqsAdapter,
    },
    {
      provide: 'OrderRequestService',
      useClass: OrderRequestService,
    },
    {
      provide: 'OrderService',
      useClass: OrderService,
    },
  ],
})
export class AppModule {}
