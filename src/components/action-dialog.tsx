"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Info,
  MapPin,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import type { Rescue } from "@/data/rescues";
import { useSite } from "@/components/site-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Badge } from "@/components/ui/badge";

export type ActionRequest =
  | { type: "list" }
  | { type: "join" }
  | { type: "claim"; rescue: Rescue }
  | { type: "info"; topic: "privacy" | "terms" | "accessibility" };
type Values = Record<string, string>;

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  wide?: boolean;
  multiline?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
};
const fieldsFor = (type: ActionRequest["type"]): Field[] => {
  if (type === "list")
    return [
      {
        name: "restaurant",
        label: "Restaurant name",
        placeholder: "Your restaurant or café",
        required: true,
        wide: true,
        autoComplete: "organization",
      },
      {
        name: "email",
        label: "Contact email",
        type: "email",
        placeholder: "you@restaurant.com",
        required: true,
        wide: true,
        autoComplete: "email",
      },
      {
        name: "food",
        label: "What would you like to donate?",
        placeholder: "e.g. 20 vegetarian pasta plates",
        required: true,
        wide: true,
        multiline: true,
      },
      {
        name: "quantity",
        label: "Number of items",
        type: "number",
        placeholder: "20",
        required: true,
        min: 1,
        max: 10000,
      },
      { name: "pickup", label: "Pickup window", placeholder: "Today, 8–10 PM", required: true },
      {
        name: "address",
        label: "Pickup address",
        placeholder: "Street address, city",
        required: true,
        wide: true,
        autoComplete: "street-address",
      },
    ];
  if (type === "claim")
    return [
      {
        name: "name",
        label: "Your name",
        placeholder: "First and last name",
        required: true,
        wide: true,
        autoComplete: "name",
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        placeholder: "you@example.com",
        required: true,
        wide: true,
        autoComplete: "email",
      },
      {
        name: "organization",
        label: "Organization (optional)",
        placeholder: "Shelter, NGO, or just your name",
        wide: true,
        autoComplete: "organization",
      },
    ];
  return [
    {
      name: "name",
      label: "Your name",
      placeholder: "First and last name",
      required: true,
      wide: true,
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "you@example.com",
      required: true,
      wide: true,
      autoComplete: "email",
    },
    {
      name: "area",
      label: "Your neighborhood or city",
      placeholder: "e.g. Mission District, San Francisco",
      required: true,
      wide: true,
      autoComplete: "address-level2",
    },
  ];
};

function RescueSummary({ rescue }: { rescue: Rescue }) {
  return (
    <div className="mb-5 rounded-xl border border-primary/10 bg-secondary/70 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-display font-semibold">{rescue.restaurant}</p>
        <Badge>{rescue.quantity} items</Badge>
      </div>
      <p className="mb-3 text-sm text-muted-foreground">{rescue.items.join(" · ")}</p>
      <p className="flex items-center gap-2 text-xs">
        <Clock3 className="size-3.5 text-primary" />
        {rescue.pickupWindow}
      </p>
      <p className="mt-2 flex items-start gap-2 text-xs leading-relaxed">
        <MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" />
        {rescue.address}
      </p>
      <p className="mt-3 border-t border-primary/10 pt-3 text-[11px] leading-relaxed text-muted-foreground">
        Allergen information: {rescue.dietary}. Confirm ingredients and safe handling with the
        restaurant before pickup.
      </p>
    </div>
  );
}

function ActionForm({
  request,
  onDone,
}: {
  request: Exclude<ActionRequest, { type: "info" }>;
  onDone: () => void;
}) {
  const { notify, claim } = useSite();
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [role, setRole] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fields = fieldsFor(request.type);
  const prefix = `action-${request.type}`;
  const isClaim = request.type === "claim";

  function update(name: string, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    fields.forEach((field) => {
      const value = values[field.name]?.trim() || "";
      if (field.required && !value) next[field.name] = `${field.label} is required.`;
      else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        next[field.name] = "Enter a valid email address.";
      else if (
        field.type === "number" &&
        (!Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 10000)
      )
        next[field.name] = "Enter a whole number from 1 to 10,000.";
      else if (value.length > 500) next[field.name] = "Please keep this under 500 characters.";
    });
    if (request.type === "join" && !role) next.role = "Choose how you would like to help.";
    if (isClaim && !agreed)
      next.agreed = "Please confirm the pickup and food-safety responsibilities.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`${prefix}-${first}`)?.focus();
      return;
    }
    if (request.type === "claim") claim(request.rescue);
    setSubmitted(true);
    notify({
      title: isClaim
        ? "Your demo rescue is claimed!"
        : request.type === "list"
          ? "Your demo listing is ready!"
          : "Welcome to the FoodBridge demo!",
      description: "This is a preview. No data was sent and no real pickup is scheduled.",
    });
  }

  if (submitted)
    return (
      <div className="py-5 text-center" role="status">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight">
          {isClaim
            ? "Good food. Great choice."
            : request.type === "list"
              ? "That’s food worth sharing."
              : "You’re in good company."}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {isClaim
            ? `You’ve tried claiming ${request.rescue.quantity} items from ${request.rescue.restaurant}. The listing is now marked as claimed for this visit.`
            : request.type === "list"
              ? "You’ve completed the food-listing demo. In the live platform, nearby rescuers would be notified right away."
              : "You’ve completed the rescuer registration demo. In the live platform, we’d help you find your first neighborhood rescue."}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Demo only — no personal information is stored or sent.
        </p>
        <Button onClick={onDone} className="mt-6 w-full">
          Back to FoodBridge
          <ArrowRight />
        </Button>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate>
      {isClaim && <RescueSummary rescue={request.rescue} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className={field.wide ? "sm:col-span-2" : ""}>
            <Label htmlFor={`${prefix}-${field.name}`} className="mb-2 block">
              {field.label}
              {field.required && (
                <span className="ml-1 text-primary" aria-hidden="true">
                  *
                </span>
              )}
            </Label>
            {field.multiline ? (
              <Textarea
                id={`${prefix}-${field.name}`}
                name={field.name}
                placeholder={field.placeholder}
                required
                maxLength={500}
                value={values[field.name] || ""}
                onChange={(event) => update(field.name, event.target.value)}
                aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `${prefix}-${field.name}-error` : undefined}
              />
            ) : (
              <Input
                id={`${prefix}-${field.name}`}
                name={field.name}
                type={field.type || "text"}
                min={field.min}
                max={field.max}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                required={field.required}
                maxLength={200}
                value={values[field.name] || ""}
                onChange={(event) => update(field.name, event.target.value)}
                aria-invalid={!!errors[field.name]}
                aria-describedby={errors[field.name] ? `${prefix}-${field.name}-error` : undefined}
              />
            )}
            {errors[field.name] && (
              <p id={`${prefix}-${field.name}-error`} className="mt-1.5 text-xs text-destructive">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        {request.type === "join" && (
          <div className="sm:col-span-2">
            <Label htmlFor={`${prefix}-role`} className="mb-2 block">
              I am a… <span aria-hidden="true">*</span>
            </Label>
            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value);
                setErrors((previous) => ({ ...previous, role: "" }));
              }}
            >
              <SelectTrigger
                id={`${prefix}-role`}
                aria-required="true"
                aria-invalid={!!errors.role}
                aria-describedby={errors.role ? `${prefix}-role-error` : undefined}
              >
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shelter">Shelter / NGO</SelectItem>
                <SelectItem value="volunteer">Volunteer</SelectItem>
                <SelectItem value="family">Family / Community member</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p id={`${prefix}-role-error`} className="mt-1.5 text-xs text-destructive">
                {errors.role}
              </p>
            )}
          </div>
        )}
      </div>
      {isClaim && (
        <div className="mt-5">
          <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-muted-foreground">
            <input
              id={`${prefix}-agreed`}
              type="checkbox"
              checked={agreed}
              onChange={(event) => {
                setAgreed(event.target.checked);
                setErrors((previous) => ({ ...previous, agreed: "" }));
              }}
              className="mt-0.5 size-4 shrink-0 accent-primary"
              aria-required="true"
              aria-invalid={!!errors.agreed}
              aria-describedby={errors.agreed ? `${prefix}-agreed-error` : undefined}
            />
            <span>
              I can collect within the pickup window and will follow safe food-handling guidance. I
              understand this is a demo, not a real reservation.
            </span>
          </label>
          {errors.agreed && (
            <p id={`${prefix}-agreed-error`} className="mt-1.5 text-xs text-destructive">
              {errors.agreed}
            </p>
          )}
        </div>
      )}
      {request.type === "list" && (
        <p className="mt-4 flex items-start gap-2 rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
          Only list food that has been stored safely. Include allergens and a realistic pickup
          window.
        </p>
      )}
      <Button
        type="submit"
        variant={isClaim ? "coral" : "default"}
        className="mt-6 w-full"
        size="lg"
      >
        {isClaim
          ? "Confirm Demo Claim"
          : request.type === "list"
            ? "Create Demo Listing"
            : "Join the Demo"}
        <ArrowRight />
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
        <Info className="size-3 shrink-0" />
        Preview only. No data is sent or stored.
      </p>
    </form>
  );
}

const infoContent = {
  privacy: {
    title: "Your privacy matters",
    paragraphs: [
      "FoodBridge is an interactive product demo. Form entries exist only in your browser’s memory for the current page visit. They are not submitted to a server, saved in cookies, or stored in local storage.",
      "We do not use analytics, advertising trackers, or geolocation. Fonts and illustrations are served with the site; we do not request them from third-party services.",
      "External social links lead to the social platforms’ homepages and are subject to those platforms’ privacy policies. Before a live launch, the operator must publish a privacy policy covering its actual data processing, retention, and contact details.",
    ],
  },
  terms: {
    title: "A little shared understanding",
    paragraphs: [
      "This website demonstrates how a community food-rescue platform could work. Restaurants, rescue listings, partner names, impact figures, and testimonials are illustrative. No real food donation, reservation, delivery, or notification is created here.",
      "A live food-rescue service must independently verify partners, communicate allergens, enforce pickup windows, and follow applicable food-safety and donation laws. Never rely on this demo to arrange a meal or assess food safety.",
      "If you need food assistance, contact a verified local organization. In the United States, you can call 211 or visit 211.org to find local services. This demo is not an emergency assistance service.",
    ],
  },
  accessibility: {
    title: "A bridge for everyone",
    paragraphs: [
      "FoodBridge is designed for keyboard, screen-reader, and touch access. It includes semantic landmarks, a skip-to-content link, visible focus indicators, labeled forms, accessible dialogs, and reduced-motion support.",
      "Use Tab to move between controls, Enter or Space to activate buttons, and Escape to close dialogs and the mobile navigation. Rescue filters announce the number of available listings.",
      "Animations respect your device’s reduced-motion setting. The layout adapts to small screens and browser zoom. If you encounter a barrier, use the contact form to try the feedback flow; a live operator’s support channel would be provided at launch.",
    ],
  },
};

export function ActionDialog({
  request,
  open,
  onOpenChange,
}: {
  request: ActionRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!request) return null;
  const title =
    request.type === "list"
      ? "Give good food a second chance."
      : request.type === "join"
        ? "Your neighborhood needs you."
        : request.type === "claim"
          ? "A good meal is one step away."
          : infoContent[request.topic].title;
  const description =
    request.type === "list"
      ? "A few details are all it takes to turn today’s surplus into tomorrow’s good."
      : request.type === "join"
        ? "Join the people making sure good food reaches people, not landfills."
        : request.type === "claim"
          ? "Review the pickup details and try the rescue flow."
          : "Transparent, simple, and community-minded.";
  const Icon =
    request.type === "list"
      ? Utensils
      : request.type === "join"
        ? HeartHandshake
        : request.type === "claim"
          ? Check
          : ShieldCheck;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
            <Icon className="size-5" />
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {request.type === "info" ? (
          <div className="space-y-4">
            {infoContent[request.topic].paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <Button onClick={() => onOpenChange(false)} className="mt-2 w-full">
              Got it
            </Button>
          </div>
        ) : (
          <ActionForm
            key={request.type === "claim" ? request.rescue.id : request.type}
            request={request}
            onDone={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
