export const heroStats = [
  { value: 12400, suffix: "+", label: "meals rescued", icon: "meals" },
  { value: 340, suffix: "", label: "restaurants", icon: "restaurants" },
  { value: 85, suffix: "", label: "shelters", icon: "shelters" },
  { value: 12, suffix: "", label: "cities", icon: "cities" },
] as const;

export const impactStats = [
  { value: 12400, suffix: "+", label: "meals rescued", icon: "meals" },
  { value: 8.2, suffix: "", label: "tons of food saved", decimals: 1, icon: "leaf" },
  { value: 340, suffix: "+", label: "partner restaurants", icon: "restaurants" },
  { value: 85, suffix: "", label: "shelters supported", icon: "shelters" },
] as const;

// The six monthly totals add up to the illustrative 12,400 rescued meals.
export const monthlyRescues = [
  { month: "May", fullMonth: "May 2026", meals: 1200 },
  { month: "Jun", fullMonth: "June 2026", meals: 1550 },
  { month: "Jul", fullMonth: "July 2026", meals: 1750 },
  { month: "Aug", fullMonth: "August 2026", meals: 2100 },
  { month: "Sep", fullMonth: "September 2026", meals: 2600 },
  { month: "Oct", fullMonth: "October 2026", meals: 3200 },
];

export const testimonials = [
  {
    quote:
      "We used to end the night throwing away good food. Now we end it knowing someone’s getting a great meal. That changes everything.",
    name: "Marco Rossi",
    role: "Owner, Bella Roma",
    initials: "MR",
    color: "bg-[#e5ecd8] text-[#405638]",
    label: "RESTAURANT PARTNER",
  },
  {
    quote:
      "Twenty minutes on my bike, a few boxes of fresh food, and a whole lot of smiles. This is what community looks like.",
    name: "Alex Chen",
    role: "FoodBridge volunteer",
    initials: "AC",
    color: "bg-[#fce5d9] text-[#92523b]",
    label: "EVERYDAY RESCUER",
  },
  {
    quote:
      "It’s more than food. It’s dignity, consistency, and knowing our neighborhood cares. FoodBridge makes that possible every day.",
    name: "Maya Thompson",
    role: "Director, Shelter Hope",
    initials: "MT",
    color: "bg-[#eee5f2] text-[#755382]",
    label: "SHELTER PARTNER",
  },
];

export const navigation = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#live-rescues", label: "Live Rescues" },
  { href: "#impact", label: "Impact" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

// Platform homepages are deliberate, working demo destinations, not invented brand profiles.
// Replace these with your organization's accounts before a public brand launch.
export const socialLinks = [
  { name: "X", href: "https://x.com/", icon: "x" },
  { name: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { name: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { name: "GitHub", href: "https://github.com/", icon: "github" },
] as const;
