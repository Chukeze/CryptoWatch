import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    email: string,
    password: string,
    name: string,
    isBanned: boolean,
  ): Promise<object> {

    const hashedPassword: string = await bcrypt.hash(password, 10);

    return await this.prisma.user
      .create({
        data: {
          email,
          password: hashedPassword,
          name,
          banned: isBanned,
        },
      })
      .catch((error) => {
        console.log('Error creating user:', error);
        return null;
      })
      .finally(() => {
        console.log('User creation process completed');
      });
  }

  async findUserById(id: string): Promise<object> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAllUsers(): Promise<object> {
    return await this.prisma.user.findMany();
  }

  async findUserByEmail(email: string): Promise<object> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUserPassword(id: string, password: string): Promise<object> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        password,
      },
    });
  }
  async updateUserEmail(id: string, email: string): Promise<object> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        email,
      },
    });
  }

  async deleteUser(id: string): Promise<object> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async deleteAllUsers(): Promise<object> {
    return await this.prisma.user.deleteMany();
  }


  async createWatchList(walletId: string, note?: string): Promise<object> {
    return await this.prisma.wallet.update({
      where: { id: walletId },
      data: {
        watchlist: {
          create: {
            note: note,
          },
        },
      },
      include:{
        watchlist:true
      }
    });
  }

  async createWallet(userId: string, name: string, note?: string): Promise<object> {
    return await this.prisma.user.update({
        where: { id: userId},
        data: {
            wallet: {
                create: {
                    name: name,
                    note: note,
                },
            },
        },
        include: {
            wallet: true,
        }
    })
  }

  //Admin functionality
  async banUser(id: string): Promise<object> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        banned: true,
      },
    });
  }
}
