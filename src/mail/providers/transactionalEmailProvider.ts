import * as nodemailer from 'nodemailer';
import { CreateMailDto } from '../dto/create-mail.dto';
import { constants } from '../constants';
import { InternalServerErrorException } from '@nestjs/common';

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
        user: constants.contact.email,
        pass: emailPassword,
      },
    });
  }

  async sendConfirmationEmail(createMailDto: CreateMailDto) {
    const mailOptions: MailOptions = {
      from: constants.contact.email,
      to: createMailDto.email,
      subject: 'Confirmación de consulta',
      html: `<h1>Hola ${createMailDto.fullName},</h1> <p>Hemos recibido su consulta, pronto nos pondremos en contacto con usted. <p><i>Este correo fue enviado automáticamente. Por favor no responder.</i></p>`,
    };

    await this.sendMail(mailOptions);

    return {
      ok: true,
      message: 'Email sent successfully',
    };
  }

  private async sendMail(mailOptions: MailOptions) {
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', { info });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
