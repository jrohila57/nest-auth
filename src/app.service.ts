import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getPort(): string {
    return this.configService.get<string>('PORT')!;
  }
  getHello(): string {
    return `Server is Live!: ${this.configService.get<string>('PORT')!}`;
  }
}
