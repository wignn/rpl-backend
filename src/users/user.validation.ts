import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly create: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(3),
    role: z.enum(['TENANT', 'ADMIN']),
    confirmPassword: z.string().min(6),
  });

  static readonly update: ZodType = z.object({
    password: z.string().min(6).optional(),
    username: z.string().min(3).optional(),
  });

}
