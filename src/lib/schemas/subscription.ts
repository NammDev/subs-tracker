import { z } from 'zod'

export const SubscriptionsInsertSchema = z.object({
  active: z.boolean().optional(),
  billingDate: z.string(),
  billingEndDate: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  cost: z.string(),
  name: z.string(),
  notes: z.string().nullable().optional(),
  notify: z.boolean().optional(),
  paymentCycle: z.string(),
  url: z.string().nullable().optional(),
})

export type SubscriptionsInsertSchemaType = z.infer<typeof SubscriptionsInsertSchema>

export const SubscriptionsCreateSchema = SubscriptionsInsertSchema.extend({
  renewalDate: z.string(),
  userId: z.string(),
})
export type SubscriptionsCreateSchemaType = z.infer<typeof SubscriptionsCreateSchema>

export const SubscriptionsUpdateSchema = z.object({
  active: z.boolean().optional(),
  billingDate: z.string().optional(),
  billingEndDate: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  cost: z.string().optional(),
  name: z.string().optional(),
  notes: z.string().nullable().optional(),
  notify: z.boolean().optional(),
  paymentCycle: z.string().optional(),
  url: z.string().nullable().optional(),
  renewalDate: z.string().optional(),
  userId: z.string().optional(),
})

export type SubscriptionsUpdateSchemaType = z.infer<typeof SubscriptionsUpdateSchema>
