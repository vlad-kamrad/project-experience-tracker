import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProjectFormFields, ProjectFormSchema } from "./schema";

export function useProjectForm() {
  return useForm<ProjectFormFields>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      fullDescription: "",
      companyName: "",
      technologyIds: [],
    },
  });
}
