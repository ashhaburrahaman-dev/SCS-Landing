import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২টি অক্ষরের হতে হবে।"),
  mobile: z
    .string()
    .min(10, "মোবাইল নম্বর কমপক্ষে ১০ সংখ্যার হতে হবে।")
    .regex(/^[6-9]\d{9}$/, "অনুগ্রহ করে একটি বৈধ ভারতীয় মোবাইল নম্বর লিখুন।"),
  service: z.string().optional(),
});
