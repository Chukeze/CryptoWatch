import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validUser(
    email: string,
    password: string,
    name?: string,
    banned?: boolean,
  ): Promise<object> {
    //validate service
    const user = await this.usersService.findUserByEmail(email);
    if (user && user['password'] === password) {
      const { ...result } = user;
      return result;
    }
    return {};
  }

  async signIn(email: string, password: string): Promise<object> {
    const user = await this.validUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name
    };

    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(
    name: string,
    email: string,
    password: string,
    isBanned: boolean,
  ): Promise<object> {
    const validUser = await this.validUser(email, password, name, isBanned);
    if (!validUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const user = await this.usersService.createUser(
      validUser.email,
      validUser.password,
      validUser.name,
      validUser.isBanned,
    );
    const payload = { sub: user.id, email: user.name };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
