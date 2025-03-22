import { z } from "zod";

export const ProjectFormSchema = z.object({
  name: z.string().nonempty(),
  companyName: z.string().nonempty(),

  shortDescription: z.string().nonempty(),
  fullDescription: z.string(),

  startDate: z.date(),
  endDate: z.date().nullable(),

  technologyIds: z.array(z.string()).default([]),
});

export type ProjectFormFields = z.infer<typeof ProjectFormSchema>;
