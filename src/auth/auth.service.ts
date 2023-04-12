import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  private readonly apiKey = this.configService.get<string>('apiKey');

  validateApiKey(apiKey: string) {
    return this.apiKey === apiKey;
  }
}
