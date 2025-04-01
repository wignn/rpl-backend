import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportCreateRequest, ReportResponse } from 'src/models/report.model';
import { ApiResponse } from '@nestjs/swagger';
import { DeleteResponse } from 'src/models/common.model';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Report successfully created',
    type: ReportResponse,
  })
  async create(@Body() request: ReportCreateRequest): Promise<ReportResponse> {
    return this.reportService.create(request);
  }

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get all reports',
    type: [ReportResponse],
  })
  async findAll(): Promise<ReportResponse[]> {
    return this.reportService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get report by ID',
    type: ReportResponse,
  })
  async findOne(@Param('id') id: string): Promise<ReportResponse> {
    return this.reportService.findOne(id);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Update report by ID',
    type: ReportResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() request: ReportCreateRequest,
  ): Promise<ReportResponse> {
    return this.reportService.update(id, request);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Delete report by ID',
    type: DeleteResponse,
  })
  async delete(@Param('id') id: string): Promise<DeleteResponse> {
    return this.reportService.delete(id);
  }
}
