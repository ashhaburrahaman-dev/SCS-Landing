
"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits.")
    .regex(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number."),
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
      message: "Please check your inputs and try again.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, mobile, service } = validatedFields.data;

  try {
    // In a real application, you would save this data to a database like Firestore.
    // e.g., await db.collection('subscribers').add({ name, mobile, service, subscribedAt: new Date() });
    console.log("New Subscriber:", { name, mobile, service });
    
    return { message: "Thank you! We will notify you on opening." };
  } catch (e) {
    console.error(e);
    return { message: "An unexpected error occurred. Please try again later." };
  }
}
