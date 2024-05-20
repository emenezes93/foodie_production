import { validate } from '@nestjs/class-validator';
import { ConsumerSqsDto } from 'src/api/dto/consumer.sqs.dto';

describe('ConsumerSqsDto', () => {
    it('should validate name field', async () => {
        const dto = new ConsumerSqsDto();
        dto.name = 'Test Name';

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should return error when name is not a string', async () => {
        const dto = new ConsumerSqsDto();
        dto.name = 123 as any;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});
