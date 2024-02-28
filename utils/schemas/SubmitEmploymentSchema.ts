import { z } from "zod";

export const SubmitEmployment = z.object({
  id: z.number(),
  employment: z.number(),
  submiter: z.number(),
  motivation_on_employment: z.string(),
  cv_file: z.string(),
});

export type SubmitEmploymentsType = z.infer<typeof SubmitEmployment>;

export const ListSubmitEmploymentsSchema = z.array(SubmitEmployment).min(0);
export type ListSubmitEmploymentType = z.infer<
  typeof ListSubmitEmploymentsSchema
>;
