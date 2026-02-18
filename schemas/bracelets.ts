import { z } from 'zod'

export const braceletScanSchema = z.object({
  braceletId: z.string().length(10, 'Bracelet ID must be exactly 10 characters'),
  gameId: z.string().uuid('Invalid game ID'),
})

export type BraceletScanInput = z.infer<typeof braceletScanSchema>