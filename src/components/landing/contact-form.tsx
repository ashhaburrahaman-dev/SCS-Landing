"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { contactSchema } from "@/app/actions";

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={isLoading} size="lg">
      {isLoading ? "জমা দেওয়া হচ্ছে..." : "খুললে আমাকে জানান"}
    </Button>
  );
}

export function ContactForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});
  const { toast } = useToast();
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get("name"),
        mobile: formData.get("mobile"),
        service: formData.get("service"),
      };

      // Validate on client side
      const validatedFields = contactSchema.safeParse(data);

      if (!validatedFields.success) {
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        setErrors(fieldErrors as Record<string, string[]>);
        toast({
          title: "ত্রুটি",
          description: "আপনার ইনপুট চেক করে আবার চেষ্টা করুন।",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Submit to API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedFields.data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors(result.errors || {});
        toast({
          title: "ত্রুটি",
          description: result.message || "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "সাফল্য!",
        description: result.message || "ধন্যবাদ! আমরা খুললে আপনাকে জানাব।",
        variant: "default",
        className: "bg-accent border-green-300 dark:bg-green-900 dark:border-green-700",
      });

      formRef.current?.reset();
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "ত্রুটি",
        description: "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">নাম</Label>
        <Input id="name" name="name" placeholder="আপনার নাম" required aria-describedby="name-error"/>
        {errors?.name && <p id="name-error" className="text-sm text-destructive">{errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="mobile">মোবাইল নম্বর</Label>
        <Input id="mobile" name="mobile" type="tel" placeholder="১০-সংখ্যার মোবাইল নম্বর" required aria-describedby="mobile-error"/>
        {errors?.mobile && <p id="mobile-error" className="text-sm text-destructive">{errors.mobile[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="service">আপনি কোন পরিষেবার জন্য অপেক্ষা করছেন? (ঐচ্ছিক)</Label>
        <Textarea id="service" name="service" placeholder="যেমন, দ্রুত ইন্টারনেট, রঙিন প্রিন্টিং..." />
        {errors?.service && <p className="text-sm text-destructive">{errors.service[0]}</p>}
      </div>
      <SubmitButton isLoading={isLoading} />
    </form>
  );
}
