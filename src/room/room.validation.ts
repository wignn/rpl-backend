import { z, ZodType } from 'zod';

export class RoomValidation {
  static readonly CREATE: ZodType = z.object({
    id_roomtype: z.string().min(4),
    status: z.enum(['AVAILABLE', 'NOTAVAILABLE']),
  });

  static readonly UPDATE: ZodType = z.object({
    id_roomtype: z.string().optional(),
    status: z.enum(['Available', 'Not Available']).optional(),
  });
}

export class RoomtypeValidation {
  static readonly CREATE: ZodType = z.object({
    room_type: z.string().min(4),
    price: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    room_type: z.string().optional(),
    price: z.number().positive().optional(),
  })
}
