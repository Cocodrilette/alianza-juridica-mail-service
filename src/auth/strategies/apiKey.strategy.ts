import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly authService: AuthService) {
    super({ header: 'X-Api-Key', prefix: 'alianza-' }, true, (apiKey, done) => {
      const checkKey = this.authService.validateApiKey(apiKey);

      if (!checkKey) {
        return done(false);
      }
      return done(true);
    });
  }
}
