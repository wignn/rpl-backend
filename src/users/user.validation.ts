import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly LOGIN:ZodType = z.object({
    phone: z.string().min(10),
    password: z.string().min(6),
  })

  static readonly UPDATE:ZodType = z.object({
    name: z.string().optional(),
    password: z.string().optional().optional(),
    role: z.enum(['TENANT', 'ADMIN']).optional(),
    phone: z.string().optional(),
  })
}
