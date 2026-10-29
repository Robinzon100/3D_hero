export const rescueCategories = ["Food", "Drinks", "Bakery"] as const;
export type RescueCategory = (typeof rescueCategories)[number];
export type RescueFilter = "All" | RescueCategory;

export interface Rescue {
  id: string;
  restaurant: string;
  cuisine: string;
  category: RescueCategory;
  items: string[];
  quantity: number;
  pickupWindow: string;
  distance: string;
  neighborhood: string;
  address: string;
  dietary: string;
  urgent?: boolean;
  posted: string;
}

/** Demo fixtures only. Replace this array with an API response when a backend is available. */
export const rescues: Rescue[] = [
  {
    id: "bella-roma-01",
    restaurant: "Bella Roma",
    cuisine: "Italian",
    category: "Food",
    items: ["15× Pasta Plates", "8× Garlic Bread"],
    quantity: 23,
    pickupWindow: "Today, 8–10 PM",
    distance: "1.2 km away",
    neighborhood: "Mission District",
    address: "248 Valencia Street, San Francisco",
    dietary: "Vegetarian · Contains gluten and dairy",
    urgent: true,
    posted: "5 min ago",
  },
  {
    id: "daily-crust-02",
    restaurant: "The Daily Crust",
    cuisine: "Artisan bakery",
    category: "Bakery",
    items: ["12× Sourdough Loaves", "12× Butter Croissants"],
    quantity: 24,
    pickupWindow: "Today, 7–9 PM",
    distance: "0.8 km away",
    neighborhood: "Hayes Valley",
    address: "412 Hayes Street, San Francisco",
    dietary: "Contains gluten and dairy · Baked today",
    urgent: true,
    posted: "8 min ago",
  },
  {
    id: "green-bowl-03",
    restaurant: "GreenBowl Café",
    cuisine: "Healthy & wholesome",
    category: "Food",
    items: ["10× Rainbow Grain Bowls", "8× Garden Salads"],
    quantity: 18,
    pickupWindow: "Today, 6–8 PM",
    distance: "1.5 km away",
    neighborhood: "SoMa",
    address: "86 Folsom Street, San Francisco",
    dietary: "Plant-based · Ask about individual allergens",
    posted: "12 min ago",
  },
  {
    id: "sip-soul-04",
    restaurant: "Sip & Soul",
    cuisine: "Juice bar",
    category: "Drinks",
    items: ["10× Fresh Orange Juices", "6× Berry Smoothies"],
    quantity: 16,
    pickupWindow: "Today, 7–8:30 PM",
    distance: "0.6 km away",
    neighborhood: "Castro District",
    address: "175 Market Street, San Francisco",
    dietary: "Freshly made · Smoothies contain dairy",
    posted: "15 min ago",
  },
  {
    id: "urban-harvest-05",
    restaurant: "Urban Harvest",
    cuisine: "Farm-to-table",
    category: "Food",
    items: ["18× Roasted Veggie Plates", "12× Seasonal Soups"],
    quantity: 30,
    pickupWindow: "Today, 8–9:30 PM",
    distance: "2.1 km away",
    neighborhood: "North Beach",
    address: "520 Columbus Avenue, San Francisco",
    dietary: "Vegetarian options · Ask about individual allergens",
    posted: "18 min ago",
  },
  {
    id: "flour-friends-06",
    restaurant: "Flour & Friends",
    cuisine: "Neighborhood bakery",
    category: "Bakery",
    items: ["8× Blueberry Muffins", "4× Cinnamon Rolls"],
    quantity: 12,
    pickupWindow: "Today, 6:30–8 PM",
    distance: "1.8 km away",
    neighborhood: "Noe Valley",
    address: "3901 24th Street, San Francisco",
    dietary: "Contains gluten, dairy, and eggs · Baked today",
    posted: "22 min ago",
  },
];
