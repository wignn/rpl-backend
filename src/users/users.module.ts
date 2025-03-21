import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ValidationService } from 'src/common/validate.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
