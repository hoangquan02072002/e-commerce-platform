import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
// import { KafkaListener } from './kafkaListener.service';
// import { ChatModule } from '../chatgateway/chat.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order-service',
            // clientId: 'order-service-client',
            brokers: [process.env.KAFKA_BROKERS || 'kafka:29092'],
            // brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
          },
          consumer: {
            groupId: 'order-consumer-group',
          },
        },
      },
    ]),
    // ChatModule,
  ],
  controllers: [KafkaController],
  providers: [KafkaService],
  exports: [ClientsModule, KafkaService],
})
export class KafkaModule {}

// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { KafkaService } from './kafka.service';
// import { KafkaListener } from './kafkaListener.service';
// import { ChatModule } from '../chatgateway/chat.module';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'KAFKA_SERVICE',
//         transport: Transport.KAFKA,
//         options: {
//           client: {
//             clientId: 'order-service-client',
//             brokers: [process.env.KAFKA_BROKERS || 'kafka:9092'],
//             connectionTimeout: 3000,
//             authenticationTimeout: 1000,
//             reauthenticationThreshold: 10000,
//             retry: {
//               initialRetryTime: 100,
//               retries: 8,
//             },
//           },
//           consumer: {
//             groupId: 'order-consumer-group',
//             retry: {
//               initialRetryTime: 100,
//               retries: 8,
//             },
//             allowAutoTopicCreation: true,
//           },
//           producer: {
//             retry: {
//               initialRetryTime: 100,
//               retries: 8,
//             },
//             allowAutoTopicCreation: true,
//           },
//         },
//       },
//     ]),
//     ChatModule,
//   ],
//   providers: [KafkaService, KafkaListener],
//   exports: [ClientsModule, KafkaService],
// })
// export class KafkaModule {}
