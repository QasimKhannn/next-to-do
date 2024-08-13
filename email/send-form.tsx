"use client";

import { sendSMS } from "@/lib/send-sms";
interface SendFormProps {
  data: any;
}
export function SendForm({ data }: SendFormProps) {
  const handleSubmit = async () => {
    await sendSMS();
  };

  return (
    <>
      {data.map((dat: any, index: number) => {
        return <p key={index}>{dat.number}</p>;
      })}
      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <label htmlFor="number">Phone number:</label>
        <input
          name="number"
          id="number"
          type="number"
          placeholder="909009009099"
          autoComplete="off"
          className="border rounded p-2"
          required
        />
        <label htmlFor="text">Message:</label>
        <textarea
          name="text"
          id="text"
          rows={4}
          cols={40}
          placeholder="Hello from Next.js App!"
          className="border rounded p-2"
          required
          />
          </form> */}
      <button
        // type="submit"
        onClick={() => {
          handleSubmit();
        }}
        className="border rounded-md hover:bg-slate-50 p-2 flex justify-center items-center"
      >
        Send
      </button>
    </>
  );
}
