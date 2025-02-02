import { PrismaModule } from 'src/prisma/prisma.module';
import { CoinController } from './coin.controller';
import { CoinsService } from './coin.service';
import { CoinCronService } from './coincron.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [CoinsService, CoinCronService],
  controllers: [CoinController],
})
export class CoinModule {}
