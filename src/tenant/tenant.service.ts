import { ValidationService } from 'src/common/validate.service';
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateTenantRequest,
  CreateTenantResponse,
} from 'src/models/tenant.model';
import { TenantValidation } from './tenat.validation';

@Injectable()
export class TenantService {
  constructor(
    private ValidationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async createNewTenant(
    request: CreateTenantRequest,
  ): Promise<CreateTenantResponse> {
    this.logger.info(`Creating new tenant`);
    const tenantRequest: CreateTenantRequest = this.ValidationService.validate(
      TenantValidation.create,
      request,
    );

    const tenant = await this.prismaService.tenant.create({
        data: tenantRequest
    })

    return {
        id_tenant: tenant.id_tenant,
        addres: tenant.addres,
        no_telp: tenant.no_telp,
        status: tenant.status
    }
  }
}
