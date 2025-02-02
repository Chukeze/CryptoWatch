import { Observable } from 'rxjs';
import { CoinsService } from './coin.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('coins')
export class CoinController {
  constructor(private readonly coinService: CoinsService) {}

  @Get()
  async getCoins(
    @Query('currency') currency?: string,
  ): Promise<Observable<any>> {
    return await this.coinService.getAllCoins();
  }

  @Get('platform/*')
  getCoinsByPlatform(@Query('price') price?: string): Observable<any> {
    return this.coinService.getCoinsByPlatform();
  }
}
