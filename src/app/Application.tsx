import { ThemeProvider, ThemeToggle } from "~/entities/theme";
import { Toaster } from "~/shared/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/shared/ui/tabs";
import {
  EnterDataTab,
  ExperiencePreviewTab,
  ImportExportTab,
  TechStackPreviewTab,
} from "~/widgets";

export function Application() {
  return (
    <ThemeProvider defaultTheme="system">
      <main className="container mx-auto py-6 px-4">
        <div className="flex w-full items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Experience Tracker</h1>
          <ThemeToggle />
        </div>

        <Tabs defaultValue="enter-data" className="w-full">
          <TabsList className="flex flex-wrap w-full mb-4 h-auto">
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
    </ThemeProvider>
  );
}
