import { ConsumeSqsAdapter } from "src/infrastructure/adapters/consumer.sqs.adapter";
import { OrderRequestServiceMock } from "./OrderRequestService.mock";
import { OrderRequestService } from "src/infrastructure/axios/order.request.service";

describe('ConsumeSqsAdapter', () => {
  let consumeSqsAdapter: ConsumeSqsAdapter;
  let orderRequestServiceMock: OrderRequestServiceMock;

  beforeEach(() => {
    orderRequestServiceMock = new OrderRequestServiceMock();
    jest.spyOn(orderRequestServiceMock, 'ChangeOrderForPreparation');

    consumeSqsAdapter = new ConsumeSqsAdapter(orderRequestServiceMock as OrderRequestService);
  });

  it('should be defined', () => {
    expect(consumeSqsAdapter).toBeDefined();
  });

  describe('handleMessage', () => {
    it('should call ChangeOrderForPreparation method of OrderRequestService with correct parameters', async () => {
      const orderId = '123';
      const status = '2';
      const message = { Body: JSON.stringify({ order_id: orderId }) };

      await consumeSqsAdapter.handleMessage(message);

      expect(orderRequestServiceMock.ChangeOrderForPreparation).toHaveBeenCalledWith(orderId, status);
    });
  });
});
