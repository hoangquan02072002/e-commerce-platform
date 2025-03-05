import { Module } from '@nestjs/common';
import { EmailService } from './emailService';

@Module({
  providers: [EmailService],
  exports: [EmailService], // Export if it's used outside this module
})
export class UtilsModule {}
