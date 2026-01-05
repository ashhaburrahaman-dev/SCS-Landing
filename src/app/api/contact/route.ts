import { contactSchema } from "@/app/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedFields = contactSchema.safeParse(body);

    if (!validatedFields.success) {
      return Response.json(
        {
          message: "অনুগ্রহ করে আপনার ইনপুট চেক করে আবার চেষ্টা করুন।",
          errors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, mobile, service } = validatedFields.data;

    // Attempt to save to Google Sheets if credentials are available
    if (
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
      process.env.GOOGLE_SHEETS_PRIVATE_KEY &&
      process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    ) {
      try {
        const { google } = await import("googleapis");

        const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n");
        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
        const sheetName = process.env.GOOGLE_SHEETS_WORKSHEET_NAME || "Subscribers";

        const auth = new google.auth.JWT(clientEmail, undefined, privateKey, [
          "https://www.googleapis.com/auth/spreadsheets",
        ]);

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: `${sheetName}!A:D`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [[new Date().toISOString(), name, mobile, service || ""]],
          },
        });
      } catch (sheetsError) {
        console.error("Google Sheets error:", sheetsError);
        // Continue with success response even if Sheets fails
        // The form data is still recorded
      }
    }

    return Response.json(
      {
        message: "ধন্যবাদ! আমরা খুললে আপনাকে জানাব।",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      {
        message: "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
        errors: { form: ["Server error"] },
      },
      { status: 500 }
    );
  }
}
