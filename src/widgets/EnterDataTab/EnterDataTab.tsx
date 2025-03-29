import { Trash2 } from "lucide-react";
import { useState } from "react";
import { TechnologyForm, useTechnologyForm } from "~/entities/technology";
import { CreateProjectForm } from "~/features/create-project";
import { DeleteProjectButton } from "~/features/delete-project";
import { UpdateProjectButton } from "~/features/update-project";
import { useStore } from "~/shared/store";
import { Badge } from "~/shared/ui/badge";
import { Button } from "~/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/shared/ui/tabs";

type TabValue = "project" | "technology";

export function EnterDataTab() {
  const projects = useStore(store => store.projects);
  const technologies = useStore(store => store.technologies);

  const addTechnology = useStore(store => store.addTechnology);
  const deleteTechnology = useStore(store => store.deleteTechnology);

  const [currentTab, setCurrentTab] = useState<TabValue>("project");
  const technologyForm = useTechnologyForm();

  return (
    <div className="space-y-8">
      <Tabs
        className="w-full"
        value={currentTab}
        onValueChange={value => setCurrentTab(value as TabValue)}
      >
        <TabsList className="flex flex-wrap h-auto space-y-1">
          <TabsTrigger value="project">Add Project</TabsTrigger>
          <TabsTrigger value="technology">Add Technology</TabsTrigger>
        </TabsList>

        <TabsContent value="project" className="mt-6">
          <CreateProjectForm />
        </TabsContent>

        <TabsContent value="technology" className="mt-6">
          <TechnologyForm form={technologyForm} onSubmit={addTechnology} />
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Projects ({projects.length})</CardTitle>
            <CardDescription>List of all entered projects</CardDescription>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No projects added yet
              </p>
            ) : (
              <ul className="space-y-2">
                {projects.map(project => (
                  <li
                    key={project.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.companyName}
                      </p>
                    </div>

                    <div className="flex gap-1">
                      <UpdateProjectButton projectId={project.id} />
                      <DeleteProjectButton projectId={project.id} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies ({technologies.length})</CardTitle>
            <CardDescription>List of all entered technologies</CardDescription>
          </CardHeader>
          <CardContent>
            {technologies.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No technologies added yet
              </p>
            ) : (
              <ul className="space-y-2">
                {technologies.map(tech => (
                  <li
                    key={tech.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{tech.name}</p>
                      <Badge variant="outline">{tech.category}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTechnology(tech.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
