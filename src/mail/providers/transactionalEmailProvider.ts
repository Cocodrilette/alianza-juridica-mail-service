import * as nodemailer from 'nodemailer';
import { CreateMailDto } from '../dto/create-mail.dto';
import { constants } from '../constants';
import { InternalServerErrorException } from '@nestjs/common';
import { htmlEmail } from './mail';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export class TransactionalEmailProvider {
  private transporter: nodemailer.Transporter;

  async authenticate(emailPassword: string) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bot.alianzajuridica@gmail.com',
        pass: emailPassword,
      },
    });
  }

  async sendConfirmationEmail(createMailDto: CreateMailDto) {
    const mailOptions: MailOptions = {
      from: constants.contact.email,
      to: createMailDto.email,
      subject: 'Confirmación de consulta',
      html: htmlEmail(createMailDto.expIdentifier),
    };

    await this.sendMail(mailOptions);

    return {
      ok: true,
      message: 'Email sent successfully',
    };
  }

  private async sendMail(mailOptions: MailOptions) {
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
