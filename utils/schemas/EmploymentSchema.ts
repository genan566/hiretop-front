import { z } from "zod";

export const EmploymentSchema = z.object({
  id: z.number(),
  creator: z.number(),
  description: z.string(),
  name: z.string(),
});

export type EmploymentsType = z.infer<typeof EmploymentSchema>;

export const ListEmploymentsSchema = z.array(EmploymentSchema).min(0);
export type ListEmploymentType = z.infer<typeof ListEmploymentsSchema>;
