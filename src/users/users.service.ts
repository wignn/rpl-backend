import { user } from './../../node_modules/.prisma/client/index.d';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/common/validate.service';
import {
  FindOneResponse,
  LoginUserRequest,
  RegisterUserRequest,
  RegisterUserResponse,
} from 'src/models/user.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/common/prisma.service';
import { UserValidation } from './user.validation';
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

  async signIn(request: LoginUserRequest):Promise<any>{
    this.logger.info(`Signing in user`);
    
    const user = await this.prismaService.user.findUnique({
      where: {
        email: request.email,
      }
    })

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
              privateKey: process.env.JWT_REFRESH_TOKEN
          }),
      },
  };
  }

  async create(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    this.logger.info(`Creating user `);
    console.log(request);
    const registerUserRequest: RegisterUserRequest =
      this.ValidationService.validate(UserValidation.create, request);
    console.log(registerUserRequest, 'registerUserRequest');
    const confirm = await this.prismaService.user.findUnique({
      where: {
        email: registerUserRequest.email,
      },
    });
    console.log(confirm);
    if (confirm) {
      throw new HttpException('User already exists', 409);
    }

    if (registerUserRequest.password !== registerUserRequest.confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    console.log(registerUserRequest);
    const hashPassword = await bcrypt.hash(registerUserRequest.password, 10);
    console.log(hashPassword);
    const user = await this.prismaService.user.create({
      data: {
        email: registerUserRequest.email,
        password: hashPassword,
        username: registerUserRequest.username,
        role: registerUserRequest.role,
      },
    });

    return {
      id_user: user.id_user,
      email: user.email,
      username: user.username,
      role: user.role as any,
    };
  }

  async findAll(): Promise<FindOneResponse[]> {
    this.logger.info(`Finding all users`);

    const users = await this.prismaService.user.findMany({
      where: { deleted: false },
    });

    return users.map((user) => ({
      id: user.id_user,
      email: user.email,
      name: user.id_user,
      role: user.role as any,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async findOne(id: string): Promise<FindOneResponse> {
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
      email: user.email,
      name: user.id_user,
      role: user.role as any,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }



  async update(id: string, request) {
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
    })


    return {
      id: updateUser.id_user,
      email: updateUser.email,
      name: updateUser.id_user,
      role: updateUser.role as any,
      createdAt: updateUser.createdAt,
      updatedAt: updateUser.updatedAt,
    }
  }


  
}
