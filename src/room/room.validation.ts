import { z, ZodType } from "zod";

export class RoomValidation {
    static readonly CREATE: ZodType = z.object({
        id_roomtype: z.string().min(4),
        status: z.enum(['Available', 'Not Available'])
    })

    static readonly UPDATE: ZodType = z.object({
        id_roomtype: z.string().optional(),
        status: z.enum(['Available', 'Not Available']).optional()
    })
}