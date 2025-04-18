import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';
import {
  TenantCreateRequest,
  TenantCreateResponse,
} from 'src/models/tenant.model';
import { ApiResponse } from '@nestjs/swagger';

@Controller('api/tenant')
export class TenantController {
  constructor(private tenantservice: TenantService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Tenant created successfully',
    type: TenantCreateResponse,
  })
  async create(
    @Body() request: TenantCreateRequest,
  ): Promise<TenantCreateResponse> {
    return this.tenantservice.create(request);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Tenant retrieved successfully',
    type: TenantCreateResponse,
  })
  async findAll(): Promise<any> {
    return this.tenantservice.findAll();
  }
}
