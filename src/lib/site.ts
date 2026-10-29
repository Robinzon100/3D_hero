const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const defaultUrl = vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000";

function safeUrl(value: string) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url : new URL(defaultUrl);
  } catch {
    return new URL(defaultUrl);
  }
}

export const siteUrl = safeUrl(configuredUrl || defaultUrl);
export const siteConfig = {
  name: "FoodBridge",
  title: "FoodBridge — Rescue Food. Feed People. Zero Waste.",
  description:
    "Good food belongs on plates, not in landfills. FoodBridge connects restaurants with surplus meals to nearby shelters, NGOs, volunteers, and families.",
  city: "San Francisco",
  email: "hello@foodbridge.example",
};
