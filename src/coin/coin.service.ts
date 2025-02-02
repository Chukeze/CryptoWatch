import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Observable } from 'rxjs';

@Injectable()
export class CoinsService {
  constructor(private prisma: PrismaService) {}

  async fetchAllCoinData() {
    //const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const response = await fetch('');
  }

  async saveCoinsToDB() {
    const coinsData = await this.fetchAllCoinData();
    for (const coin of coinsData) {
      await this.prisma.coins.create({
        data: {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          total_volume: coin.total_volume,
          high_24h: coin.high_24h,
          low_24h: coin.low_24h,
          price_change_24h: coin.price_change_24h,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          market_cap_change_24h: coin.market_cap_change_24h,
          market_cap_change_percentage_24h:
            coin.market_cap_change_percentage_24h,
          circulating_supply: coin.circulating_supply,
          total_supply: coin.total_supply,
          ath: coin.ath,
          ath_change_percentage: coin.ath_change_percentage,
          ath_date: new Date(coin.ath_date),
          atl: coin.atl,
          atl_change_percentage: coin.atl_change_percentage,
          atl_date: new Date(coin.atl_date),
        },
      });
    }
  }

  async getAllCoins(): Promise<Observable<[object]>> {
    return await this.prisma.coin.findMany();
  }

  async updateCoinsInDB() {
    const coinsData = await this.fetchAllCoinData;
    for (const coin of coinsData) {
      await this.prisma.coin.upsert({
        where: { id: coin.id },
        update: {
          symbol: coin.symbol,
          name: coin.name,
          currentPrice: coin.current_price,
          marketCap: coin.market_cap,
        },
        create: {
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          currentPrice: coin.current_price,
          marketCap: coin.market_cap,
        },
      });
    }
  }
}
