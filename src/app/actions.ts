
"use server";

import { z } from "zod";

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
    // In a real application, you would save this data to a database like Firestore.
    // e.g., await db.collection('subscribers').add({ name, mobile, service, subscribedAt: new Date() });
    console.log("New Subscriber (Bengali):", { name, mobile, service });
    
    return { message: "ধন্যবাদ! আমরা খুললে আপনাকে सूचित করব।" };
  } catch (e) {
    console.error(e);
    return { message: "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।" };
  }
}
