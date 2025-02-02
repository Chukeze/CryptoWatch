import { Injectable } from '@nestjs/common';
import { CoinsService } from './coin.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CoinCronService {
  // This service will handle the logic for interacting with the Coincron API
  // and storing the data in the database.

  constructor(private coinService: CoinsService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    await this.coinService.updateCoinsInDB();
    console.log('Coins updated in DB' + new Date());
  }
}
