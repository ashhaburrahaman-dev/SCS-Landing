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
      {pending ? "Submitting..." : "Notify Me When Open"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: state.message,
          className: "bg-accent border-green-300 dark:bg-green-900 dark:border-green-700",
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your Name" required aria-describedby="name-error"/>
        {state?.errors?.name && <p id="name-error" className="text-sm text-destructive">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number</Label>
        <Input id="mobile" name="mobile" type="tel" placeholder="10-digit mobile number" required aria-describedby="mobile-error"/>
        {state?.errors?.mobile && <p id="mobile-error" className="text-sm text-destructive">{state.errors.mobile[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="service">What service are you waiting for? (Optional)</Label>
        <Textarea id="service" name="service" placeholder="e.g., Fast internet, color printing..." />
         {state?.errors?.service && <p className="text-sm text-destructive">{state.errors.service[0]}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}
