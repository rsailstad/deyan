"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackOutbound } from "@/lib/analytics";

const schema = z.object({
  name: z.string().min(2, "Tell us who to reply to"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Give us a few details"),
});

type ContactValues = z.infer<typeof schema>;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    console.table(values);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    toast.success("Message queued", {
      description: "We'll reply via management within 24 hours.",
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ada Lovelace" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="ada@agency.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can we help?</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Booking, press, sync..." {...field} />
              </FormControl>
              <FormDescription>
                We&apos;ll route to the right contact instantly.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-full bg-[var(--accent-green)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send message"}
        </Button>
      </form>
      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b0b12]/70 p-4 text-sm text-fg-muted">
        Prefer email? {" "}
        <a
          href="mailto:booking@deyan.world"
          className="font-semibold text-[var(--accent-green)] hover:text-white"
          onClick={() =>
            trackOutbound("email_click", "mailto:booking@deyan.world", {
              platform: "other",
              context: "contact-mailto",
            })
          }
        >
          booking@deyan.world
        </a>
      </div>
    </Form>
  );
}
