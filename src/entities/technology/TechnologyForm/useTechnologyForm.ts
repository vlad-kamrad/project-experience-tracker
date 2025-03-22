import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TechnologyFormFields, TechnologyFormSchema } from "./schema";

export function useTechnologyForm() {
  return useForm<TechnologyFormFields>({
    resolver: zodResolver(TechnologyFormSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });
}
