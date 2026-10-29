"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, HeartHandshake, Mail, Send, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion";
import { useSite } from "@/components/site-provider";

type ContactValues = { name: string; email: string; role: string; message: string };
const initialValues: ContactValues = { name: "", email: "", role: "", message: "" };

export function Contact() {
  const { openAction, notify } = useSite();
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<Partial<ContactValues>>({});
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  function update(field: keyof ContactValues, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<ContactValues> = {};
    if (values.name.trim().length < 2)
      next.name = "Please enter your name (at least 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!["restaurant", "shelter", "volunteer"].includes(values.role))
      next.role = "Please select your role.";
    if (values.message.trim().length < 10)
      next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`contact-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setSubmitted(true);
    notify({
      title: "Thanks for reaching out!",
      description: "Your demo message passed validation. No data was sent or stored.",
    });
    requestAnimationFrame(() => successRef.current?.focus());
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-space relative overflow-hidden bg-cream"
    >
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">THERE’S A PLACE FOR YOU HERE</p>
          <h2 id="contact-heading" className="section-title">
            Ready to Make an Impact?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            You don’t need to change the whole world.
            <br className="hidden sm:block" /> Just start with your neighborhood.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-[#d7e1ca] bg-[#eaf0df] p-7 sm:p-8">
              <Store
                className="absolute -bottom-5 -right-4 size-36 -rotate-12 text-[#dce6ce]"
                strokeWidth={1}
                aria-hidden="true"
              />
              <div className="relative">
                <span className="mb-5 flex size-10 items-center justify-center rounded-xl bg-white/75 text-primary">
                  <Store className="size-5" />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-[-0.6px]">
                  For Restaurants
                </h3>
                <p className="mb-6 mt-3 max-w-sm text-sm leading-relaxed text-[#5c6a52]">
                  Your surplus can be someone’s next great meal. Share what’s left, set a pickup
                  time, and let your community do the rest.
                </p>
                <Button onClick={() => openAction({ type: "list" })}>
                  List Your Food
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-[#ecdcc8] bg-[#f7ecdd] p-7 sm:p-8">
              <HeartHandshake
                className="absolute -bottom-5 -right-4 size-36 rotate-12 text-[#eedeca]"
                strokeWidth={1}
                aria-hidden="true"
              />
              <div className="relative">
                <span className="mb-5 flex size-10 items-center justify-center rounded-xl bg-white/75 text-[#98683f]">
                  <HeartHandshake className="size-5" />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-[-0.6px]">
                  For Shelters & Volunteers
                </h3>
                <p className="mb-6 mt-3 max-w-sm text-sm leading-relaxed text-[#756550]">
                  A little time. A few extra hands. Help fresh, good food find its way to the people
                  who need it — and make a real connection.
                </p>
                <Button
                  variant="outline"
                  className="border-[#b99c78]/60 bg-white/25 text-[#654e33] hover:border-[#987650] hover:bg-white/60"
                  onClick={() => openAction({ type: "join" })}
                >
                  Join as a Rescuer
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border border-[#e1e5d5] bg-card p-6 shadow-soft sm:p-9">
            <div className="mb-7 flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <Mail className="size-4" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.5px]">
                  Let’s start a conversation.
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Questions, ideas, or a little hello — we’re all ears.
                </p>
              </div>
            </div>
            {submitted ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="rounded-xl bg-secondary/60 px-5 py-9 text-center outline-none"
              >
                <CheckCircle2 className="mx-auto size-9 text-primary" />
                <h4 className="mt-4 font-display text-xl font-semibold">
                  A little hello. A lot of possibility.
                </h4>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Thanks, {values.name.trim().split(/\s+/)[0]}! Your demo message is complete. In
                  the connected platform, our team would get back to you soon.
                </p>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  Demo only — no message was sent or stored.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false);
                    setValues(initialValues);
                    setErrors({});
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="contact-name" className="mb-2 block">
                      Name{" "}
                      <span className="text-primary" aria-hidden="true">
                        *
                      </span>
                    </Label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      value={values.name}
                      onChange={(event) => update("name", event.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-1.5 text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="contact-email" className="mb-2 block">
                      Email{" "}
                      <span className="text-primary" aria-hidden="true">
                        *
                      </span>
                    </Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      maxLength={200}
                      value={values.email}
                      onChange={(event) => update("email", event.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="contact-role" className="mb-2 block">
                      I am a{" "}
                      <span className="text-primary" aria-hidden="true">
                        *
                      </span>
                    </Label>
                    <Select value={values.role} onValueChange={(value) => update("role", value)}>
                      <SelectTrigger
                        id="contact-role"
                        aria-required="true"
                        aria-invalid={!!errors.role}
                        aria-describedby={errors.role ? "contact-role-error" : undefined}
                      >
                        <SelectValue placeholder="Tell us how you’re part of the community" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="shelter">Shelter / NGO</SelectItem>
                        <SelectItem value="volunteer">Volunteer</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p id="contact-role-error" className="mt-1.5 text-xs text-destructive">
                        {errors.role}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="contact-message" className="mb-2 block">
                      Message{" "}
                      <span className="text-primary" aria-hidden="true">
                        *
                      </span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="How would you like to make a difference?"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={4}
                      value={values.message}
                      onChange={(event) => update("message", event.target.value)}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "contact-message-error" : "message-hint"}
                    />
                    {errors.message ? (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-destructive">
                        {errors.message}
                      </p>
                    ) : (
                      <p
                        id="message-hint"
                        className="mt-1.5 text-right text-[10px] text-muted-foreground"
                      >
                        {values.message.length}/2,000
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <p className="max-w-[310px] text-[10px] leading-relaxed text-muted-foreground">
                    This is a demo form. Your details stay in this page and are never sent or
                    stored.
                  </p>
                  <Button type="submit" className="w-full sm:w-auto">
                    Send Message
                    <Send className="size-3.5" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
