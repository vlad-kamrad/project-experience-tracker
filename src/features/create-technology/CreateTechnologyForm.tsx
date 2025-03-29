import { Plus } from "lucide-react";
import { TechnologyForm, useTechnologyForm } from "~/entities/technology";
import { useStore } from "~/shared/store";
import { Button } from "~/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";

export function CreateTechnologyForm() {
  const createTechnology = useStore(store => store.createTechnology);

  const form = useTechnologyForm();

  const onCreateTechnologyClick = form.handleSubmit(formFields => {
    createTechnology(formFields);
    form.reset();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Technology</CardTitle>
        <CardDescription>
          Enter details about technologies you've worked with
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <TechnologyForm form={form} />
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          onClick={onCreateTechnologyClick}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Technology
        </Button>
      </CardFooter>
    </Card>
  );
}
