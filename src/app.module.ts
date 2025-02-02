import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoinModule } from './coin/coin.module';

@Module({
  imports: [ScheduleModule.forRoot(), AuthModule, CoinModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
