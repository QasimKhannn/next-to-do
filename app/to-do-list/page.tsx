import Heading from "@/components/ui/page-heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";

import { SendForm } from "./_components/send-form";
import Languages from "./_components/languages";
import CsvDownloadButton from "./_components/download-csv";
import urduData from "@/public/imp/urd/beautician-ur.json";

const ToDoList = async () => {
  const engData = await db.question.findMany({
    where: { lang: "ENGLISH" },
  });
  const urdData = await db.question.findMany({
    where: { lang: "URDU" },
  });
  const recepients = await db.recipients.findMany();
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <Heading
          description="Managing your day to day tasks."
          title="Sending Sms with Vonage Api"
        />
        <div className="flex items-center justify-center gap-4"></div>
      </div>
      <Separator />
      <SendForm data={recepients} />
      {/* <Languages engData={engData} urdData={urdData} /> */}
      <CsvDownloadButton
        data={urduData}
        filename="beautician-ur.csv"
        delimiter=","
        headers={Object.keys(urduData[0])} // Replace with your actual headers
      />
    </div>
  );
};

export default ToDoList;
