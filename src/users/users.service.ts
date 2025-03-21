import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ValidationService } from 'src/common/validate.service';
import { RegisterUserRequest, RegisterUserResponse} from 'src/models/user.model';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/common/prisma.service';
import { UserValidation } from './user.validation';

@Injectable()
export class UsersService {
  constructor(
    private ValidationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}
  async create(request: RegisterUserRequest):Promise<RegisterUserResponse> {
    this.logger.info(`Creating user `);

    const registerUserRequest: RegisterUserRequest = this.ValidationService.validate(
      UserValidation.create,
      request,
    );

    const confirm = await this.prismaService.user.findUnique({
      where: {
        email: registerUserRequest.email,
      },
    })

    if (confirm) {
      throw new HttpException('User already exists', 400);
    }

    if(registerUserRequest.password !== registerUserRequest.confirmPassword){
      throw new HttpException('Passwords do not match', 400);
    }


    const user = await this.prismaService.user.create({
      data: {
        email: registerUserRequest.email,
        password: registerUserRequest.password,
        name: registerUserRequest.name,
        role: registerUserRequest.role
      }
    });

    return {
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role as any 
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
