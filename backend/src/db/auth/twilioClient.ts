import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;

export const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
