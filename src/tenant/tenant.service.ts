import { ValidationService } from 'src/common/validate.service';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/common/prisma.service';
import { TenantCreateRequest, TenantCreateResponse } from 'src/models/tenant.model';
import { TenantValidation } from './tenat.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TenantService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(request: TenantCreateRequest): Promise<TenantCreateResponse> {
    this.logger.info(`Creating new tenant`);

    const tenantRequest: TenantCreateRequest = this.validationService.validate(
      TenantValidation.create,
      request,
    );

    const isUserExist = await this.prismaService.tenant.count({
      where: {
        no_telp: tenantRequest.no_telp,
      },
    });

    if (isUserExist > 0) {
      throw new HttpException('User already exists', 400);
    }

    const hashPassword = await bcrypt.hash(tenantRequest.no_telp, 10);

    const user = await this.prismaService.user.create({
      data: {
        phone: tenantRequest.no_telp,
        name: tenantRequest.full_name,
        password: hashPassword,
        role: 'TENANT',
      },
    });

    const tenant = await this.prismaService.tenant.create({
      data: {
        address: tenantRequest.address,
        no_ktp: tenantRequest.no_ktp,
        status: tenantRequest.status,
        no_telp: tenantRequest.no_telp,
        full_name: tenantRequest.full_name,
        id_user: user.id_user,
      },
    });

    const roomData = await this.prismaService.rent_Data.create({
      data: {
        id_tenant: tenant.id_tenant,
        id_room: tenantRequest.id_room,
        rent_date: tenantRequest.rent_in,
      },
    });

    return {
      user: {
        id_user: user.id_user,
        name: user.name,
        role: user.role,
      },
      tenant: {
        id_tenant: tenant.id_tenant,
        address: tenant.address,
        no_ktp: tenant.no_ktp,
        status: tenant.status,
        no_telp: tenant.no_telp,
        full_name: tenant.full_name,
      },
      roomData: {
        id_rent: roomData.id_rent,
        id_tenant: roomData.id_tenant,
        id_room: roomData.id_room,
        rent_date: roomData.rent_date,
      },
    };
  }

  async findAll(): Promise<any> {
    this.logger.info('Fetching all tenants');

    const data = await this.prismaService.tenant.findMany({
      where: { deleted: false },
      include: {
        user: true,
        rent_data: {
          include: {
            room: {
              include: {
                roomtype: true,
              },
            },
          },
        },
      },
    });

    return data.map((tenant) => ({
      id_tenant: tenant.id_tenant,
      address: tenant.address,
      no_ktp: tenant.no_ktp,
      status: tenant.status,
      no_telp: tenant.no_telp,
      full_name: tenant.full_name,
      room: tenant.rent_data
        ? {
            id_room: tenant.rent_data.id_room,
            room_name: tenant.rent_data.room?.roomtype?.room_type ?? null,
            rent_in: tenant.rent_data.rent_date,
            rent_out: tenant.rent_data.rent_out,
            status: tenant.rent_data.room?.status ?? null,
          }
        : null,
    }));
  }
}
