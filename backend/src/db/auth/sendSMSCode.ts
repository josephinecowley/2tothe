import { client } from "./twilioClient";

export const sendSMSCode = async (phoneNumber: string) => {
  try {
    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({ to: phoneNumber, channel: "sms" });
    return true;
  } catch (error) {
    console.error("Error sending SMS code:", error);
    throw error;
  }
};
