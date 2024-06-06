"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { httpClient } from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DescForm {
  taskId: string | undefined;
  data: any;
}
const formSchema = z.object({
  description: z.string().min(1, {
    message: "Enter task description.",
  }),
});
const DescriptionForm = ({ taskId, data }: DescForm) => {
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
        Task Details
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
      {!isEditing && <p className="mt-2 text-sm">{data.description}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            className="mt-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="task description"
                      {...field}
                    />
                  </FormControl>
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

export default DescriptionForm;
