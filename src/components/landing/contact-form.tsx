"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  message: "",
  errors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending} size="lg">
      {pending ? "জমা দেওয়া হচ্ছে..." : "খুললে আমাকে জানান"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      const isError = !!state.errors;
      const title = isError ? "ত্রুটি" : "সাফল্য!";
      const description = isError ? "আপনার ইনপুট চেক করে আবার চেষ্টা করুন।" : "ধন্যবাদ! আমরা খুললে আপনাকে জানাব।";

      toast({
        title: title,
        description: description,
        variant: isError ? "destructive" : "default",
        className: !isError ? "bg-accent border-green-300 dark:bg-green-900 dark:border-green-700" : "",
      });

      if (!isError) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">নাম</Label>
        <Input id="name" name="name" placeholder="আপনার নাম" required aria-describedby="name-error"/>
        {state?.errors?.name && <p id="name-error" className="text-sm text-destructive">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="mobile">মোবাইল নম্বর</Label>
        <Input id="mobile" name="mobile" type="tel" placeholder="১০-সংখ্যার মোবাইল নম্বর" required aria-describedby="mobile-error"/>
        {state?.errors?.mobile && <p id="mobile-error" className="text-sm text-destructive">{state.errors.mobile[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="service">আপনি কোন পরিষেবার জন্য অপেক্ষা করছেন? (ঐচ্ছিক)</Label>
        <Textarea id="service" name="service" placeholder="যেমন, দ্রুত ইন্টারনেট, রঙিন প্রিন্টিং..." />
         {state?.errors?.service && <p className="text-sm text-destructive">{state.errors.service[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
