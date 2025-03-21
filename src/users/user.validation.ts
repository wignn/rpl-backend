import {z} from 'zod';

export class UserValidation {
    static create = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(3),
        role: z.enum(['GUEST', 'ADMIN']),
        confirmPassword: z.string().min(6),
    });

    static update = z.object({
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
        name: z.string().min(3).optional(),
    });
}