"use server";

import { revalidatePath } from "next/cache";
import { Vonage } from "@vonage/server-sdk";
import { db } from "./db";

const VONAGE_API_KEY = process.env.VONAGE_API_KEY!;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET!;
const VONAGE_VIRTUAL_NUMBER = process.env.VONAGE_VIRTUAL_NUMBER!;

const credentials: any = {
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
};

const vonage = new Vonage(credentials);

export async function sendSMS() {
  const recep = await db.recipients.findMany();
  const staticMessage =
    "Hello world! How are you doing, sang e hal chal? Chai Pela do lala jee.";

  const results = [];

  for (const recipient of recep) {
    try {
      const from = VONAGE_VIRTUAL_NUMBER;
      const to = recipient.number;
      const text = staticMessage;

      const vonageResponse = await vonage.sms.send({ to, from, text });

      if (vonageResponse.messages[0].status === "0") {
        results.push(`Message sent successfully to ${to}`);
      } else {
        results.push(
          `Error sending SMS to ${to}: ${vonageResponse.messages[0]["errorText"]}`
        );
      }
    } catch (e: any) {
      results.push(`Error sending SMS to ${recipient.number}: ${e.message}`);
    }
  }

  console.log("SMS send results:", results);

  revalidatePath("/");

  return { response: results };
}
