import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { ConfigService } from '@nestjs/config';
import { TransactionalEmailProvider } from './providers/transactionalEmailProvider';

@Injectable()
export class MailService {
  transactionalEmailProvider: TransactionalEmailProvider =
    new TransactionalEmailProvider();

  constructor(private readonly configService: ConfigService) {
    this.transactionalEmailProvider.authenticate(
      this.configService.get('emailPassword'),
    );
  }

  sendConfirmationEmail(createMailDto: CreateMailDto) {
    return this.transactionalEmailProvider.sendConfirmationEmail(createMailDto);
  }
}
