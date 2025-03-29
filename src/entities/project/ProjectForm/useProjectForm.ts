import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Project } from "~/shared/store";
import { ProjectFormFields, ProjectFormSchema } from "./schema";

interface UseProjectFormParams {
  defaultProject?: Project;
}

const DEFAULT_PROJECT: Partial<Project> = {
  name: "",
  shortDescription: "",
  fullDescription: "",
  companyName: "",
  technologyIds: [],
  startDate: undefined,
  endDate: undefined,
};

export function useProjectForm(params: UseProjectFormParams = {}) {
  const { defaultProject = DEFAULT_PROJECT } = params;

  return useForm<ProjectFormFields>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      name: defaultProject.name,
      shortDescription: defaultProject.shortDescription,
      fullDescription: defaultProject.fullDescription,
      companyName: defaultProject.companyName,
      technologyIds: defaultProject.technologyIds,
      startDate: defaultDateFormatter(defaultProject.startDate)!,
      endDate: defaultDateFormatter(defaultProject.endDate),
    },
  });
}

function defaultDateFormatter(date: Date | string | null | undefined) {
  if (typeof date === "string") {
    return new Date(date);
  }

  return date;
}
