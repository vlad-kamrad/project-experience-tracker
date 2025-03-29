import { Trash2 } from "lucide-react";
import { useStore } from "~/shared/store";
import { Button } from "~/shared/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/shared/ui/alert-dialog";

interface DeleteProjectButtonProps {
  projectId: string;
}

export function DeleteProjectButton(props: DeleteProjectButtonProps) {
  const { projectId } = props;

  const project = useStore(store => store.getProject(projectId));
  const deleteProject = useStore(store => store.deleteProject);

  const onDeleteProjectClick = () => {
    deleteProject(projectId);
    toast.success("Project has been deleted successfully");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            <b> {project?.name || "this"} </b> project and remove all related
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteProjectClick}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
