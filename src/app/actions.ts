
"use server";

import { z } from "zod";

type SheetsConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName: string;
};

type SubscriberRecord = {
  name: string;
  mobile: string;
  service?: string;
};

function getSheetsConfig(): SheetsConfig {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_WORKSHEET_NAME || "Subscribers";

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Google Sheets credentials are missing");
  }

  return {
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, "\n"),
    spreadsheetId,
    sheetName,
  };
}

async function appendSubscriberToSheet(record: SubscriberRecord) {
  const { google } = await import("googleapis");
  const { clientEmail, privateKey, spreadsheetId, sheetName } = getSheetsConfig();

  const auth = new google.auth.JWT(clientEmail, undefined, privateKey, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:D`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[new Date().toISOString(), record.name, record.mobile, record.service || ""]],
    },
  });
}

const contactSchema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২টি অক্ষরের হতে হবে।"),
  mobile: z
    .string()
    .min(10, "মোবাইল নম্বর কমপক্ষে ১০ সংখ্যার হতে হবে।")
    .regex(/^[6-9]\d{9}$/, "অনুগ্রহ করে একটি বৈধ ভারতীয় মোবাইল নম্বর লিখুন।"),
  service: z.string().optional(),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    mobile: formData.get("mobile"),
    service: formData.get("service"),
  });

  if (!validatedFields.success) {
    return {
      message: "অনুগ্রহ করে আপনার ইনপুট চেক করে আবার চেষ্টা করুন।",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, mobile, service } = validatedFields.data;

  try {
    await appendSubscriberToSheet({ name, mobile, service });

    return { message: "ধন্যবাদ! আমরা খুললে আপনাকে सूचित করব।" };
  } catch (e) {
    console.error("Failed to record subscriber", e);
    return { message: "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।", errors: { form: ["Google Sheets sync failed"] } };
  }
}
