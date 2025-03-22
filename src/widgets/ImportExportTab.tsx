import { saveAs } from "file-saver";
import { DownloadIcon, UploadIcon } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "~/shared/store";
import { Button } from "~/shared/ui/button";

export function ImportExportTab() {
  const projects = useStore(store => store.projects);
  const technologies = useStore(store => store.technologies);
  const loadState = useStore(store => store.load);

  const onExportClick = () => {
    const data = JSON.stringify({ projects, technologies });

    const blob = new Blob([data], { type: "application/json" });

    saveAs(blob, "export.json");
  };

  const onAcceptFile = (file: File | undefined) => {
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      const json = event.target?.result as string;
      const data = JSON.parse(json);

      loadState(data);

      toast.success("Data updated successfully");
    };

    reader.readAsText(file);
    reader.onerror = () => toast.error("Something went wrong");
  };

  return (
    <div className="grid w-full grid-cols-2 gap-2">
      <Button onClick={onExportClick}>
        <DownloadIcon />
        Export
      </Button>

      <Button asChild variant="outline">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 cursor-pointer"
        >
          <UploadIcon /> Import
          <input
            id="file-upload"
            type="file"
            accept="application/json"
            onChange={event => onAcceptFile(event.target.files?.[0])}
            className="hidden"
          />
        </label>
      </Button>
    </div>
  );
}
