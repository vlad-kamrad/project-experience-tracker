import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "~/shared/store";
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
import { Button } from "~/shared/ui/button";

interface DeleteTechnologyButtonProps {
  techonogyId: string;
}

export function DeleteTechnologyButton(props: DeleteTechnologyButtonProps) {
  const { techonogyId } = props;

  const techonogy = useStore(store => store.getTechnology(techonogyId));
  const deleteTechonogy = useStore(store => store.deleteTechnology);

  const onDeleteClick = () => {
    deleteTechonogy(techonogyId);
    toast.success("Techonogy has been deleted successfully");
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
            <b> {techonogy?.name || "this"} </b> techonogy and remove all
            related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteClick}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
