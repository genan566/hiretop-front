import { z } from "zod";

export const TalentSchema = z.object({
  id: z.number(),
  member: z.number(),
  profile_description: z.string(),
  name: z.string(),
});

export type TalentSchemaType = z.infer<typeof TalentSchema>;

export const ListTalentSchemaSchema = z.array(TalentSchema).min(0);
export type ListTalentType = z.infer<typeof ListTalentSchemaSchema>;
