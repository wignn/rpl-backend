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

    const isUserExist = await this.prismaService.user.count({
      where: { phone: tenantRequest.no_telp },
    });

    if (isUserExist > 0) {
      throw new HttpException('User already exists', 400);
    }

    const u = await this.prismaService.room.findUnique({
      where: { id_room: tenantRequest.id_room },
      include: {
        roomType:{
          select:{
            room_type:true,
            price:true,
          }
        }
      },
    })


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
        jatuh_tempo:tenantRequest.rent_in,
        tagihan: u?.roomType.price,
        userId: user.id_user, 
        address: tenantRequest.address,
        no_ktp: tenantRequest.no_ktp,
        status: tenantRequest.status,
        no_telp: tenantRequest.no_telp,
        full_name: tenantRequest.full_name,
      },
    });

    const roomData = await this.prismaService.rentData.create({
      data: {
        tenantId: tenant.id_tenant,
        roomId: tenantRequest.id_room,
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
        id_tenant: roomData.tenantId,
        id_room: roomData.roomId,
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
        rentData: {
          include: {
            room: {
              include: {
                roomType: true,
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
      room: tenant.rentData
        ? {
            id_room: tenant.rentData.roomId,
            room_name: tenant.rentData.room?.roomType?.room_type ?? null,
            rent_in: tenant.rentData.rent_date,
            rent_out: tenant.rentData.rent_out,
            status: tenant.rentData.room?.status ?? null,
          }
        : null,
    }));
  }
}
