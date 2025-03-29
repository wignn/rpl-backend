import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/common/validate.service';
import { LoginUserRequest, userResponse } from 'src/models/user.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private ValidationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(request: LoginUserRequest): Promise<any> {
    this.logger.info(`Signing in user`);

    const user = await this.prismaService.user.findUnique({
      where: {
        phone: request.phone,
      },
    });

    if (!user) {
      throw new HttpException('Email or password is incorrect ', 404);
    }

    const passwordMatch = await bcrypt.compare(request.password, user.password);
    if (!passwordMatch) {
      throw new HttpException('Email or password is incorrect ', 404);
    }

    const payload = {
      username: user.username,
      isAdmin: user.role,
      sub: {
        name: user.username,
      },
    };

    return {
      id: user.id_user,
      username: user.username,
      isAdmin: user.role,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          privateKey: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          privateKey: process.env.JWT_REFRESH_TOKEN,
        }),
      },
    };
  }

  async findAll(): Promise<userResponse[]> {
    this.logger.info(`Finding all users`);

    const users = await this.prismaService.user.findMany({
      where: { deleted: false },
    });

    return users.map((user) => ({
      id: user.id_user,
      phone: user.phone,
      name: user.id_user,
      role: user.role as any,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));
  }

  async findOne(id: string): Promise<userResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id_user: id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return {
      id: user.id_user,
      phone: user.phone,
      name: user.id_user,
      role: user.role as any,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async update(id: string, request): Promise<userResponse> {
    this.logger.info(`Updating user`);

    const user = await this.prismaService.user.findUnique({
      where: {
        id_user: id,
      },
    });

    if (!user) {
      throw new HttpException('Internal server error', 500);
    }

    const updateUser = await this.prismaService.user.update({
      where: {
        id_user: id,
      },
      data: request,
    });

    return {
      id: updateUser.id_user,
      phone: updateUser.phone,
      name: updateUser.id_user,
      role: updateUser.role as any,
      created_at: updateUser.created_at,
      updated_at: updateUser.updated_at,
    };
  }
}
