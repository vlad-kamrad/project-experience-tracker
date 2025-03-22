import { z } from "zod";

export const TechnologyFormSchema = z.object({
  name: z.string().nonempty(),
  category: z.string().nonempty(),
});

export type TechnologyFormFields = z.infer<typeof TechnologyFormSchema>;
