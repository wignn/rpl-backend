import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/common/validate.service';
import { UserLoginRequest, UserDetailResponse, UserLoginResponse } from 'src/models/user.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DeleteResponse } from 'src/models/common.model';

@Injectable()
export class UsersService {
  constructor(
    private ValidationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(request: UserLoginRequest): Promise<UserLoginResponse> {
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
      username: user.name,
      isAdmin: user.role,
      sub: {
        name: user.name,
      },
    };

    return {
      id_user: user.id_user,
      name: user.name,
      role: user.role,
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

  async findAll(): Promise<UserDetailResponse[]> {
    this.logger.info(`Finding all users`);

    const users = await this.prismaService.user.findMany({
      where: { deleted: false },
    });

    return users.map((user) => ({
      id_user: user.id_user,
      phone: user.phone,
      name: user.id_user,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));
  }

  async findOne(id: string): Promise<UserDetailResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id_user: id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return {
      id_user: user.id_user,
      phone: user.phone,
      name: user.id_user,
      role: user.role as any,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async delete(id: string): Promise<DeleteResponse> {
    this.logger.info(`Deleting user with id ${id}`);

    const user = this.prismaService.user.findUnique({
      where: {
        id_user: id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.prismaService.user.update({
      where: {
        id_user: id,
      },
      data: {
        deleted: true,
      },
    });


    return {
      message:"delete success",
    }
  }

  async update(id: string, request): Promise<UserDetailResponse> {
    this.logger.info(`Updating user`);

    const user = await this.prismaService.user.findUnique({
      where: {
        id_user: id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const updateUser = await this.prismaService.user.update({
      where: {
        id_user: id,
      },
      data: request,
    });

    return {
      id_user: updateUser.id_user,
      phone: updateUser.phone,
      name: updateUser.id_user,
      role: updateUser.role,
      created_at: updateUser.created_at,
      updated_at: updateUser.updated_at,
    };
  }
  async refreshToken(user: any): Promise<UserLoginResponse> {
    const payload = {
        username: user.username,
        sub: {
            name: user.name,
        },
    };

    console.log(payload)
    return {
        id_user: user.id_user,
        name: user.name,
        role: user.isAdmin,
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
}
