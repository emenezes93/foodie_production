import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SqsModule } from '@ssut/nestjs-sqs';
import { AppModule } from 'src/app.module';
import { HealthController } from 'src/api/controllers/health.controller';
import { OrderController } from 'src/api/controllers/order.controller';
import { OrderService } from 'src/domain/use-cases/order.service';
import { ConsumerSqsService } from 'src/domain/use-cases/sqs.consumer.service';
import { RequestService } from 'src/infrastructure/axios/request.service';
import { OrderRequestService } from 'src/infrastructure/axios/order.request.service';
import { ConsumeSqsAdapter } from 'src/infrastructure/adapters/consumer.sqs.adapter';
import configuration from 'src/config/config';

describe('AppModule', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
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
                AppModule,
            ],
        }).compile();
    });

    it('should be defined', () => {
        expect(app).toBeDefined();
    });

    it('HealthController should be defined', () => {
        const healthController = app.get<HealthController>(HealthController);
        expect(healthController).toBeDefined();
    });

    it('OrderController should be defined', () => {
        const orderController = app.get<OrderController>(OrderController);
        expect(orderController).toBeDefined();
    });

    it('OrderService should be defined', () => {
        const orderService = app.get<OrderService>(OrderService);
        expect(orderService).toBeDefined();
    });

    it('ConsumerSqsService should be defined', () => {
        const consumerSqsService = app.get<ConsumerSqsService>(ConsumerSqsService);
        expect(consumerSqsService).toBeDefined();
    });

    it('RequestService should be defined', () => {
        const requestService = app.get<RequestService>(RequestService);
        expect(requestService).toBeDefined();
    });

    it('OrderRequestService should be defined', () => {
        const orderRequestService = app.get<OrderRequestService>(OrderRequestService);
        expect(orderRequestService).toBeDefined();
    });

    it('ConsumeSqsAdapter should be defined', () => {
        const consumeSqsAdapter = app.get<ConsumeSqsAdapter>(ConsumeSqsAdapter);
        expect(consumeSqsAdapter).toBeDefined();
    });
});
