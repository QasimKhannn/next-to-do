import { db } from "@/lib/db";
import React from "react";
import { Banner } from "@/components/ui/banner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { appRoutes } from "@/lib/config";
import { Date, Description, Name } from "./_components";

const TaskId = async ({ params }: { params: { taskId: string } }) => {
  const task = await db.list.findUnique({
    where: {
      id: params.taskId,
    },
  });
  if (!task) {
    return <Banner label="No task found" variant={"error"} />;
  }
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            className="tex-sm mb-4 flex items-center transition hover:opacity-75"
            href={appRoutes.TODOLIST}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to course
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">course setup</h1>
              <span className="text-sm text-slate-700  dark:text-white">
                Complete all fields
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-x-2">
        <h2 className="text-xl">Customize your course</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Name taskId={task.id} data={task} />
          <Date taskId={task.id} data={task} />
        </div>
        <div className="space-y-6">
          <Description taskId={task.id} data={task} />
        </div>
      </div>
    </div>
  );
};

export default TaskId;
