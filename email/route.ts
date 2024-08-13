import { revalidatePath } from "next/cache";
import { Vonage } from "@vonage/server-sdk";

const VONAGE_API_KEY = process.env.VONAGE_API_KEY!;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET!;
const VONAGE_VIRTUAL_NUMBER = process.env.VONAGE_VIRTUAL_NUMBER!;

const credentials: any = {
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET,
};

const vonage = new Vonage(credentials);

type FormData = {
  get: (name: string) => string;
};

export async function sendSMS(prevState: any, formData: FormData) {
  try {
    const from = VONAGE_VIRTUAL_NUMBER;
    const vonage_response = await vonage.sms.send({
      to: formData.get("number"),
      from,
      text: formData.get("text"),
    });
    revalidatePath("/");
    return {
      response:
        vonage_response.messages[0].status === "0"
          ? `🎉 Message sent successfully.`
          : `There was an error sending the SMS. ${vonage_response.messages[0]["errorText"]}`,
    };
  } catch (e: any) {
    return {
      response: `There was an error sending the SMS. The error message: ${e.message}`,
    };
  }
}
