import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';
import {
  CreateTenantRequest,
  CreateTenantResponse,
} from 'src/models/tenant.model';
import { ApiResponse } from '@nestjs/swagger';

@Controller('tenant')
export class TenantController {
  constructor(private tenantservice: TenantService) {}

  @ApiResponse({
    status: 200,
    description: 'Tenant created successfully',
    type: CreateTenantResponse,
  })
  @Post()
  @HttpCode(200)
  async createTenant(
    @Body() request: CreateTenantRequest,
  ): Promise<CreateTenantResponse> {
    return this.tenantservice.createNewTenant(request);
  }
}
