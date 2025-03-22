import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { cn } from "~/lib/utils";
import { Project, Technology } from "~/shared/store";
import { Button } from "~/shared/ui/button";
import { Calendar } from "~/shared/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";
import { Checkbox } from "~/shared/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import { Label } from "~/shared/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";
import { Textarea } from "~/shared/ui/textarea";
import { ProjectFormFields } from "./schema";

interface ProjectFormProps {
  form: UseFormReturn<ProjectFormFields, null>;

  technologies: Technology[];
  onSubmit: (fieldValues: Omit<Project, "id">) => void;
}

export function ProjectForm(props: ProjectFormProps) {
  const { form, technologies } = props;

  const onFormSubmit = form.handleSubmit(fieldValues => {
    props.onSubmit(fieldValues);
    form.reset();
  });

  const onSelectTechId = (techId: string) => {
    const technologyIds = form.getValues("technologyIds");

    const newTechnologyIds = technologyIds.includes(techId)
      ? technologyIds.filter(id => id !== techId)
      : [...technologyIds, techId];

    form.setValue("technologyIds", newTechnologyIds);
  };

  const selectedTechnologyIds = form.watch("technologyIds");

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>
              Enter details about your project experience
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Customer Portal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Brief description of the project"
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Full description of the project"
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus={true}
                          pagedNavigation={true}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center justify-between">
                      End date
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="currentlyWorking"
                          checked={field.value === null}
                          onCheckedChange={checked =>
                            field.onChange(checked ? null : undefined)
                          }
                        />
                        <label
                          htmlFor="currentlyWorking"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Currently working
                        </label>
                      </div>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />

                            {field.value
                              ? format(field.value, "PPP")
                              : field.value === null
                              ? "Currently working"
                              : "Select date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus={true}
                          pagedNavigation={true}
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          disabled={date =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Technologies Used</Label>
              {technologies.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No technologies added yet. Add some in the Technology tab.
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {technologies.map(tech => (
                    <div key={tech.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tech-${tech.id}`}
                        checked={selectedTechnologyIds.includes(tech.id)}
                        onCheckedChange={() => onSelectTechId(tech.id)}
                      />
                      <label
                        htmlFor={`tech-${tech.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tech.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={!form.formState.isValid}>
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
