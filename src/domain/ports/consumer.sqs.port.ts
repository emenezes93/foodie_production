//import { ExampleEntity } from '@domain/entities/example.entity';

export interface ConsumerSqsPorts {
    handleMessage(message: any): Promise<void>;
}

