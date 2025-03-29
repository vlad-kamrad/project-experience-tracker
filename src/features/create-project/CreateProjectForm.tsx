import { Plus } from "lucide-react";
import { ProjectForm, useProjectForm } from "~/entities/project";
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

export function CreateProjectForm() {
  const technologies = useStore(store => store.technologies);
  const createProject = useStore(store => store.createProject);

  const form = useProjectForm();

  const onCreateProjectClick = form.handleSubmit(formFields => {
    createProject(formFields);
    form.reset();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Project</CardTitle>
        <CardDescription>
          Enter details about your project experience
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <ProjectForm form={form} technologies={technologies} />
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          onClick={onCreateProjectClick}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </CardFooter>
    </Card>
  );
}
