import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { categories } from "~/shared/consts";
import { Technology } from "~/shared/store";
import { Button } from "~/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/ui/form";
import { Input } from "~/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/select";
import { TechnologyFormFields } from "./schema";

interface TechnologyFormProps {
  form: UseFormReturn<TechnologyFormFields, null>;

  onSubmit: (fieldValues: Omit<Technology, "id">) => void;
}

export function TechnologyForm(props: TechnologyFormProps) {
  const { form } = props;
  const {
    reset,
    handleSubmit,
    formState: { isValid },
  } = form;

  const onFormSubmit = handleSubmit(fieldValues => {
    props.onSubmit(fieldValues);
    reset();
  });

  return (
    <Form {...props.form}>
      <form onSubmit={onFormSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Technology</CardTitle>
            <CardDescription>
              Enter details about technologies you've worked with
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technology Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="React, Node.js, Docker, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem value={category} key={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button type="submit" disabled={!isValid}>
              <Plus className="mr-2 h-4 w-4" /> Add Technology
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
