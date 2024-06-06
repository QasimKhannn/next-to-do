import { z } from "zod";

export const toDoListSchema = z.object({
  name: z.string().min(1, {
    message: "Enter task name.",
  }),
  description: z.string().min(1, {
    message: "Enter task description.",
  }),
  date: z.coerce.date({
    required_error: "A date is required.",
  }),
});
