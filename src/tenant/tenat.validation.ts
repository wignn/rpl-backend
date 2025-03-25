import { z, ZodType } from 'zod';

export class TenantValidation {
  static readonly create: ZodType = z.object({
    ktp_image: z.string().min(4),
    addres: z.string().min(4),
    no_ktp: z.string().min(4),
    status: z.enum(['MERRIED', 'SINGLE']),
    no_telp: z.string().min(4),
})
}