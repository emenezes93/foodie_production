import { ConsumerSqsService } from "src/domain/use-cases/sqs.consumer.service";
import { ConsumerSqsPortsMock } from "./ConsumerSqsPortsMock ";

describe('ConsumerSqsService', () => {
  let consumerSqsService: ConsumerSqsService;
  let consumerSqsPortsMock: ConsumerSqsPortsMock;

  beforeEach(() => {
    consumerSqsPortsMock = new ConsumerSqsPortsMock();

    consumerSqsService = new ConsumerSqsService(consumerSqsPortsMock);
  });

  it('should be defined', () => {
    expect(consumerSqsService).toBeDefined();
  });

  describe('processMessage', () => {
    it('should call handleMessage method of ConsumerSqsPorts', async () => {
      const handleMessageSpy = jest.spyOn(consumerSqsPortsMock, 'handleMessage');
      await consumerSqsService.processMessage({});
      expect(handleMessageSpy).toHaveBeenCalledWith({});
    });
  });
});
