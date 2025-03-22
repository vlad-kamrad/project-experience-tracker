import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/shared/ui/tabs";
import {
  TechStackPreviewTab,
  EnterDataTab,
  ExperiencePreviewTab,
  ImportExportTab,
} from "~/widgets";
import { Toaster } from "~/shared/ui/sonner";

export function Application() {
  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Experience Tracker</h1>

      <Tabs defaultValue="enter-data" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="enter-data">Enter Data</TabsTrigger>

          <TabsTrigger value="experience-preview">
            Experience Preview
          </TabsTrigger>

          <TabsTrigger value="tech-stack-preview">
            Tech Stack Preview
          </TabsTrigger>

          <TabsTrigger value="import-export">Import/Export</TabsTrigger>
        </TabsList>

        <TabsContent value="enter-data">
          <EnterDataTab />
        </TabsContent>

        <TabsContent value="experience-preview">
          <ExperiencePreviewTab />
        </TabsContent>

        <TabsContent value="tech-stack-preview">
          <TechStackPreviewTab />
        </TabsContent>

        <TabsContent value="import-export">
          <ImportExportTab />
        </TabsContent>
      </Tabs>

      <Toaster />
    </main>
  );
}
