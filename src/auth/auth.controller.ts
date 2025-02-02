import {
  Controller,
  Body,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { createUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() createUserDto: createUserDto) {
    return this.authService.signUp(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      createUserDto.banned ?? false,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
