"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { httpClient } from "@/lib/http";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface DateProps {
  taskId: string | null;
  data: any;
}
const formSchema = z.object({
  date: z.coerce.date({
    required_error: "A date is required.",
  }),
});

const DateForm = ({ taskId, data }: DateProps) => {
  console.log(data.date);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: data,
    resolver: zodResolver(formSchema),
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await httpClient.patch(`/list/${taskId}`, values);
      toast.success("Task updated!");
      setIsEditing((prevState) => !prevState);
      router.refresh();
    } catch (error: any) {
      if (error.response?.data) {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message.map((msg: string) => toast.error(msg));
        } else toast.error(error.response.data.message);
      } else toast.error("Something went wrong!");
    }
  };
  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4 dark:bg-transparent">
      <div className="flex items-center justify-between font-medium">
        Date
        <Button
          onClick={() => setIsEditing((prevState) => !prevState)}
          variant={"ghost"}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="mt-2 text-sm">dayjs</p>}
      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DateForm;
