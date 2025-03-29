import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly LOGIN:ZodType = z.object({
    phone: z.string().min(10),
    password: z.string().min(6),
  })
}
