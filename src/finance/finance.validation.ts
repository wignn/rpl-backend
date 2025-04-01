import { z, ZodType } from "zod";


export class FinanceValidation {
  static readonly CREATE: ZodType = z.object({
    id_finance: z.string().optional(),
    id_tenant: z.string().optional(),
    type: z.enum(["INCOME", "OUTCOME "]),
    category: z.string(),
    amaut: z.number().positive(),
    payment_date: z.coerce.date(),
  })
}