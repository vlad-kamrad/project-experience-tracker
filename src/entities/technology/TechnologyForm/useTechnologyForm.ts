import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TechnologyFormFields, TechnologyFormSchema } from "./schema";
import { Technology } from "~/shared/store";

interface UseTechnologyFormParams {
  defaultTechnology?: Technology;
}

const DEFAULT_TECHNOLOGY: Partial<Technology> = {
  name: "",
  category: "",
};

export function useTechnologyForm(params: UseTechnologyFormParams = {}) {
  const { defaultTechnology = DEFAULT_TECHNOLOGY } = params;

  return useForm<TechnologyFormFields>({
    resolver: zodResolver(TechnologyFormSchema),
    defaultValues: {
      name: defaultTechnology.name,
      category: defaultTechnology.category,
    },
  });
}
