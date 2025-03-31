import { Module } from '@nestjs/common';
import { FasilityController } from './fasility.controller';
import { FasilityService } from './fasility.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FasilityController],
  providers: [FasilityService, JwtService]
})
export class FasilityModule {}
