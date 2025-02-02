import {
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Body,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { createUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateWatchListDto } from './dto/create-watchlist.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userservice: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAllUsers() {
    return this.userservice.findAllUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userservice.findUserById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createUser(@Body() createUserDto: createUserDto): Promise<object> {
    return await this.userservice.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
      (createUserDto.banned = false),
    );
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('createWatchList')
  async createWatchlist(@Body() createWatchListDto: CreateWatchListDto) {
    return await this.userservice.createWatchList(createWatchListDto.WalletId);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  async updateUserEmail(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await this.userservice.updateUserEmail(id, updateUserDto.email);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<object> {
    return await this.userservice.deleteUser(id);
  }
}
