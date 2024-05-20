import { IsString } from '@nestjs/class-validator';

export class ConsumerSqsDto {
    
    @IsString()
    name: string;
}
