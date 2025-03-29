import { format } from "date-fns";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { formatDuration } from "~/lib/formatters";
import { groupBy } from "~/lib/utils";
import { useStore } from "~/shared/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";
import { ColorBadge } from "~/shared/ui/color-badge";

export function ExperiencePreviewTab() {
  const projects = useStore(store => store.projects);
  const technologies = useStore(store => store.technologies);

  const [expandedProjectIds, setExpandedProjectIds] = useState<string[]>([]);

  const onChangeProjectExpand = (projectId: string) => {
    setExpandedProjectIds(prev =>
      expandedProjectIds.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getTechnologyName = (technologyId: string) => {
    const technology = technologies.find(item => item.id === technologyId);

    return technology?.name || "Unknown";
  };

  // Group projects by company
  const projectsByCompany = groupBy(projects, project => project.companyName);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Experience Overview</CardTitle>
          <CardDescription>
            Your professional experience organized by company
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(projectsByCompany).length === 0 ? (
            <p className="text-muted-foreground">
              No projects added yet. Add some in the Enter Data tab.
            </p>
          ) : (
            <div className="space-y-6">
              {Object.entries(projectsByCompany).map(
                ([company, companyProjects]) => (
                  <div key={company} className="space-y-2">
                    <h3 className="text-lg font-semibold">{company}</h3>
                    <ul className="space-y-2 pl-4">
                      {companyProjects.map(project => (
                        <li key={project.id} className="border-l-2 pl-4 pb-2">
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => onChangeProjectExpand(project.id)}
                          >
                            {expandedProjectIds.includes(project.id) ? (
                              <ChevronDown className="h-4 w-4 mr-2" />
                            ) : (
                              <ChevronRight className="h-4 w-4 mr-2" />
                            )}
                            <div /* className="flex items-center gap-4" */>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {format(project.startDate, "MMM yyyy")} -{" "}
                                {project.endDate
                                  ? format(project.endDate, "MMM yyyy")
                                  : "Present"}
                                <span className="mx-2">•</span>
                                {formatDuration(
                                  project.startDate,
                                  project.endDate
                                )}
                              </div>
                            </div>
                          </div>

                          {expandedProjectIds.includes(project.id) && (
                            <div className="mt-2 pl-6 space-y-2">
                              <p className="text-sm">
                                {project.shortDescription}
                              </p>

                              {project.technologyIds.length > 0 && (
                                <div>
                                  <p className="text-sm font-medium mt-2">
                                    Technologies:
                                  </p>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {project.technologyIds.map(techId => (
                                      <ColorBadge
                                        key={techId}
                                        name={getTechnologyName(techId)}
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
