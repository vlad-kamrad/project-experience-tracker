import { Edit2 } from "lucide-react";
import { TechnologyForm, useTechnologyForm } from "~/entities/technology";
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

interface UpdateTechnologyButtonProps {
  techonogyId: string;
}

export function UpdateTechnologyButton(props: UpdateTechnologyButtonProps) {
  const { techonogyId } = props;

  const techonogy = useStore(store => store.getTechnology(techonogyId));
  const updateTechnology = useStore(store => store.updateTechnology);

  const form = useTechnologyForm({ defaultTechnology: techonogy });

  const onUpdateClick = form.handleSubmit(formFields => {
    updateTechnology(techonogyId, formFields);
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
          <DialogTitle>Update technology details</DialogTitle>
          <DialogDescription>
            Make changes to this technology here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <TechnologyForm form={form} />

        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button onClick={() => onUpdateClick()}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
