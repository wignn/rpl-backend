import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import {
  FasilityCreateRequest,
  FasilityCreateResponse,
} from 'src/models/fasility.mode';
import { Logger } from 'winston';
import { FasilityValidation } from './fasility.validation';

@Injectable()
export class FasilityService {
  constructor(
    private validationService: ValidationService,
    private readonly prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async create(
    request: FasilityCreateRequest,
  ): Promise<FasilityCreateResponse> {
    this.logger.info(`Creating new fasility`);

    const fasilityRequest: FasilityCreateRequest =
      this.validationService.validate(FasilityValidation.CREATE, request);

    const facility = await this.prismaService.facility.create({
      data: fasilityRequest,
    });

    return {
      id_fasility: facility.id_facility,
      facility_name: facility.facility_name,
      desc: facility.desc,
      created_at: facility.created_at,
      updated_at: facility.updated_at,
    };
  }


  async findAll(): Promise<FasilityCreateResponse[]> {
    this.logger.info(`Finding all fasility`);
    const fasility = await this.prismaService.facility.findMany({
      where: {
        deleted: false,
      },
        orderBy: {
            created_at: 'desc',
        },
        include: {
            
        }
    });

    return fasility.map((item) => ({
      id_fasility: item.id_facility,
      facility_name: item.facility_name,
      desc: item.desc,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

  }
}
