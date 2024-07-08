import Heading from "@/components/ui/page-heading";
// import AddTask from "./_components/add-task";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
// import { DataTable } from "./data-table";
import { SendForm } from "./_components/send-form";

const ToDoList = async () => {
  // const tasks = await db.list.findMany();
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          description="Managing your day to day tasks."
          title="Sending Sms with Vonage Api"
          // title="To Do List"
        />
        <div className="flex items-center justify-center gap-4">
          {/* <AddTask /> */}
        </div>
      </div>
      <Separator />
      <SendForm />
      {/* <DataTable data={tasks} /> */}
    </div>
  );
};

export default ToDoList;
