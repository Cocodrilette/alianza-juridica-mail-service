import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [MailController],
  providers: [MailService, CommonModule],
})
export class MailModule {}
