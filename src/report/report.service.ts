import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validate.service';
import {
  ReportCreateRequest,
  ReportResponse,
  ReportUpdateRequest,
} from 'src/models/report.model';
import { ReportValidation } from './report.validation';
import { Logger } from 'winston';
import { DeleteResponse } from 'src/models/common.model';

@Injectable()
export class ReportService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(request: ReportCreateRequest): Promise<ReportResponse> {
    this.logger.info(`Creating report`);
    const ReportCreateRequest: ReportCreateRequest =
      this.validationService.validate(ReportValidation.CREATE, request);

    const isFacilityExists = await this.prismaService.facility.count({
      where: {
        id_facility: ReportCreateRequest.id_facility,
      },
    });

    const isTenantExists = await this.prismaService.tenant.count({
      where: {
        id_tenant: ReportCreateRequest.id_tenant,
      },
    });

    if (isFacilityExists === 0) {
      throw new Error('Facility not found');
    }
    if (isTenantExists === 0) {
      throw new Error('Tenant not found');
    }

    const report = await this.prismaService.report.create({
      data: ReportCreateRequest,
    });

    return {
      id_report: report.id_report,
      id_tenant: report.id_tenant,
      id_facility: report.id_facility,
      report_desc: report.report_desc,
      report_date: report.report_date,
      status: report.status,
      created_at: report.created_at,
      updated_at: report.updated_at,
    };
  }

  async findAll(): Promise<ReportResponse[]> {
    this.logger.info('Finding all reports');
    const reports = await this.prismaService.report.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return reports.map((report) => ({
      id_report: report.id_report,
      id_tenant: report.id_tenant,
      id_facility: report.id_facility,
      report_desc: report.report_desc,
      report_date: report.report_date,
      status: report.status,
      created_at: report.created_at,
      updated_at: report.updated_at,
    }));
  }

  async findOne(id: string): Promise<ReportResponse> {
    this.logger.info(`Finding report with id ${id}`);
    const report = await this.prismaService.report.findUnique({
      where: {
        id_report: id
      },
    });

    if (!report) {
      throw new Error('Report not found');
    }

    return {
      id_report: report.id_report,
      id_tenant: report.id_tenant,
      id_facility: report.id_facility,
      report_desc: report.report_desc,
      report_date: report.report_date,
      status: report.status,
      created_at: report.created_at,
      updated_at: report.updated_at,
    };
  }

  async update(id: string, request: ReportUpdateRequest) :Promise<ReportResponse> {
    this.logger.info(`Updating report with id ${id}`);
    const ReportUpdateRequest: ReportUpdateRequest =
      this.validationService.validate(ReportValidation.UPDATE, request);
    const report = await this.prismaService.report.findUnique({
      where: {
        id_report: id,
        AND: {
          deleted: false,
        },
      },
    });

    if (!report) {
      throw new Error('Report not found');
    }

    const updatedReport = await this.prismaService.report.update({
      where: {
        id_report: id,
      },
      data: ReportUpdateRequest,
    });

    return {
      id_report: updatedReport.id_report,
      id_tenant: updatedReport.id_tenant,
      id_facility: updatedReport.id_facility,
      report_desc: updatedReport.report_desc,
      report_date: updatedReport.report_date,
      status: updatedReport.status,
      created_at: updatedReport.created_at,
      updated_at: updatedReport.updated_at,
    };
  };

  async delete(id: string): Promise<DeleteResponse> {
    this.logger.info(`Deleting report with id ${id}`);
    const report = await this.prismaService.report.findUnique({
      where: {
        id_report: id,
      },
    });

    if (!report) {
      throw new Error('Report not found');
    }

    await this.prismaService.report.update({
      where: {
        id_report: id,
      },
      data: {
        deleted: true,
      },
    });

    return { message: 'delete success' };
  }
}
