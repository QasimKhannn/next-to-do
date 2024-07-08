"use client";

import { sendSMS } from "@/lib/send-sms";

export function SendForm() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: any = new FormData(event.currentTarget);
    await sendSMS(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
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
      <button
        type="submit"
        className="border rounded-md hover:bg-slate-50 p-2 flex justify-center items-center"
      >
        Send
      </button>
    </form>
  );
}
