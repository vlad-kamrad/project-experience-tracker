import { z } from "zod";

export const ProjectFormSchema = z.object({
  name: z.string(),
  companyName: z.string(),

  shortDescription: z.string(),
  fullDescription: z.string(),

  startDate: z.date(),
  endDate: z.date().nullable(),

  technologyIds: z.array(z.string()).default([]),
});

export type ProjectFormFields = z.infer<typeof ProjectFormSchema>;
