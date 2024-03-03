import { z } from "zod";

export const EnterpriseSchema = z.object({
  id: z.number(),
  creator: z.number(),
  description: z.string(),
  name: z.string(),
});

export type EnterpriseSchemaType = z.infer<typeof EnterpriseSchema>;

export const ListEnterpriseSchemaSchema = z.array(EnterpriseSchema).min(0);
export type ListTalentType = z.infer<typeof ListEnterpriseSchemaSchema>;
