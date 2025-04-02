import { REPORTSTATUS } from "@prisma/client";

export class ReportCreateRequest {
    id_tenant: string;
    id_facility: string;
    report_desc: string;
    report_date: Date;
    status: REPORTSTATUS;
}


export class ReportResponse extends ReportCreateRequest {
    id_report: string;
    created_at: Date;
    updated_at: Date;
}

export class ReportUpdateRequest {
    id_tenant?: string;
    id_facility?: string;
    report_desc?: string;
    report_date?: Date;
    status?: REPORTSTATUS;
}

export class ReportDeleteRequest {
    id_report: string;
}