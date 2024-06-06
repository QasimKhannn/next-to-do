"use client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { toDoListSchema } from "@/schemas";
import { httpClient } from "@/lib/http";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ITaskForm {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TaskForm = ({ setOpen }: ITaskForm) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof toDoListSchema>>({
    resolver: zodResolver(toDoListSchema),
    defaultValues: {
      name: "",
      description: "",
      date: undefined,
    },
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof toDoListSchema>) => {
    try {
      const { data } = await httpClient.post(`/list`, values);
      setOpen(false);
      router.refresh();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 py-4 w-full"
      >
        <div className="grid grid-cols-4 items-center gap-4 w-full">
          <FormLabel className="text-right">Task</FormLabel>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    placeholder="Buy Dunhill..."
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 w-full">
          <FormLabel className="text-right">Description</FormLabel>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <Input
                    placeholder="Buy two packs..."
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4 w-full">
          <FormLabel className="text-right">Task Date</FormLabel>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isSubmitting}
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Task
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TaskForm;
