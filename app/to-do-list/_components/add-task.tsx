"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import TaskForm from "./task-form";

const AddTask = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-end w-full mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="text-xs md:text-sm">
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>
              Fill all the required fields. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <TaskForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTask;
