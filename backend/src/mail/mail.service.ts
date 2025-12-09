import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendVerifyEmail(email: string, verifyCode: string) {
    await this.mailService.sendMail({
      to: email,
      subject: 'Ověřte svůj email',
      html: `<h2>Jako fakt jste to vy?</h2><h1>Ověřte svůj e-mail</h1><h3>${verifyCode}</h3>`,
    });
  }
}
