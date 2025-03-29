import { Edit2 } from "lucide-react";
import { ProjectForm, useProjectForm } from "~/entities/project";
import { useStore } from "~/shared/store";
import { Button } from "~/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/shared/ui/dialog";

interface UpdateProjectButtonProps {
  projectId: string;
}

export function UpdateProjectButton(props: UpdateProjectButtonProps) {
  const { projectId } = props;

  const project = useStore(store => store.getProject(projectId));
  const updateProject = useStore(store => store.updateProject);
  const technologies = useStore(store => store.technologies);

  const form = useProjectForm({ defaultProject: project });

  const onUpdateProjectClick = form.handleSubmit(formFields => {
    updateProject(projectId, formFields);
    form.reset(formFields);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[625px] max-h-9/12 overflow-x-auto">
        <DialogHeader>
          <DialogTitle>Update project details</DialogTitle>
          <DialogDescription>
            Make changes to this project here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <ProjectForm form={form} technologies={technologies} />

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={() => onUpdateProjectClick()}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
