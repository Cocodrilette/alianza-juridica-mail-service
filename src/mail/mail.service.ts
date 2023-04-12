import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {
  sendConfirmationEmail(createMailDto: CreateMailDto) {
    return { createMailDto };
  }
}
