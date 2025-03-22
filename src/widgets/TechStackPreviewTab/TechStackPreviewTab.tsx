import { useState, useMemo } from "react";
import { differenceInMonths, differenceInDays } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";
import { Badge } from "~/shared/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/select";
import { Label } from "~/shared/ui/label";
import { Slider } from "~/shared/ui/slider";
import { useStore } from "~/shared/store";
import { formatExperienceInMonths } from "~/lib/formatters";

export function TechStackPreviewTab() {
  const projects = useStore(store => store.projects);
  const technologies = useStore(store => store.technologies);

  const [selectedFilterCategory, setSelectedFilterCategory] =
    useState<string>("all");

  const [experienceFilter, setExperienceFilter] = useState<number[]>([0]);

  const filterCategories = useMemo(() => {
    const uniqueCategories = new Set(technologies.map(item => item.category));

    return ["all", ...Array.from(uniqueCategories)];
  }, [technologies]);

  // Calculate experience for each technology
  const techExperience = useMemo(() => {
    const result: Record<
      string,
      {
        totalMonths: number;
        projects: Array<{ id: string; name: string }>;
      }
    > = {};

    technologies.forEach(tech => {
      result[tech.id] = { totalMonths: 0, projects: [] };
    });

    projects.forEach(project => {
      const startDate = new Date(project.startDate);
      const endDate = project.endDate ? new Date(project.endDate) : new Date();

      let duration = differenceInMonths(endDate, startDate);
      if (duration === 0 && differenceInDays(endDate, startDate) > 0) {
        duration = 1; // Count as at least 1 month if there's some experience
      }

      project.technologyIds.forEach(techId => {
        if (result[techId]) {
          result[techId].totalMonths += duration;
          result[techId].projects.push({
            id: project.id,
            name: project.name,
          });
        }
      });
    });

    return result;
  }, [projects, technologies]);

  // Filter technologies based on category and experience
  const filteredTechnologies = useMemo(() => {
    return technologies
      .filter(
        tech =>
          selectedFilterCategory === "all" ||
          tech.category === selectedFilterCategory
      )
      .filter(tech => {
        const years = (techExperience[tech.id]?.totalMonths || 0) / 12;
        return years >= experienceFilter[0];
      })
      .sort((a, b) => {
        // Sort by experience (descending)
        const expA = techExperience[a.id]?.totalMonths || 0;
        const expB = techExperience[b.id]?.totalMonths || 0;
        return expB - expA;
      });
  }, [technologies, selectedFilterCategory, experienceFilter, techExperience]);

  // Find max years of experience for slider
  const maxYearsOfExperience = useMemo(() => {
    const maxMonths = Object.values(techExperience).reduce(
      (max, tech) => Math.max(max, tech.totalMonths),
      0
    );

    return Math.ceil(maxMonths / 12) || 5; // Default to 5 if no data
  }, [techExperience]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tech Stack Overview</CardTitle>
          <CardDescription>
            Your technical skills and experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          {technologies.length === 0 ? (
            <p className="text-muted-foreground">
              No technologies added yet. Add some in the Enter Data tab.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label>Filter by Category</Label>
                  <Select
                    value={selectedFilterCategory}
                    onValueChange={setSelectedFilterCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterCategories.map(cat => (
                        <SelectItem key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Minimum Experience (Years)</Label>
                    <span className="text-sm">
                      {experienceFilter[0]} year
                      {experienceFilter[0] !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <Slider
                    value={experienceFilter}
                    onValueChange={setExperienceFilter}
                    max={maxYearsOfExperience}
                    step={0.5}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredTechnologies.length === 0 ? (
                  <p className="text-muted-foreground">
                    No technologies match your filters.
                  </p>
                ) : (
                  filteredTechnologies.map(tech => {
                    const experience = techExperience[tech.id] || {
                      totalMonths: 0,
                      projects: [],
                    };

                    return (
                      <div key={tech.id} className="border rounded-lg p-4">
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                          <div>
                            <h3 className="font-medium">{tech.name}</h3>
                            <Badge variant="outline">{tech.category}</Badge>
                          </div>
                          <Badge variant="secondary">
                            {formatExperienceInMonths(experience.totalMonths)}
                          </Badge>
                        </div>

                        {experience.projects.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">
                              Used in projects:
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {experience.projects.map(project => (
                                <Badge key={project.id} variant="outline">
                                  {project.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
