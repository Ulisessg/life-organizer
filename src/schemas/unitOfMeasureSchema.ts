import z from 'zod'
import { id } from './common'

export const unitOfMeasureSchema = z.object({
  id,
  name: z.string().min(1).max(50)
})

export type UnitOfMeasureSchema = z.infer<typeof unitOfMeasureSchema>