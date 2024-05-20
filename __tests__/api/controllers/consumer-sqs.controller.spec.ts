import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerSqsController } from 'src/api/controllers/consumer.sqs.controller';
import { ConsumerSqsService } from 'src/domain/use-cases/sqs.consumer.service';

describe('ConsumerSqsController', () => {
  let controller: ConsumerSqsController;
  let mockConsumerSqsService: jest.Mocked<ConsumerSqsService>; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerSqsController],
      providers: [
        {
          provide: ConsumerSqsService,
          useFactory: () => ({
            processMessage: jest.fn(),
          }),
        },
      ],
    }).compile();

    controller = module.get<ConsumerSqsController>(ConsumerSqsController);
    mockConsumerSqsService = module.get(ConsumerSqsService) as jest.Mocked<ConsumerSqsService>; 
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('processMessage', () => {
    it('should call processMessage method of ConsumerSqsService with the provided message', async () => {
      const message = { teste: "teste" };

      await controller.processMessage(message);

      expect(mockConsumerSqsService.processMessage).toHaveBeenCalledWith(message);
    });
  });
});
