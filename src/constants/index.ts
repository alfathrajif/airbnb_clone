import {
  AmenityType,
  BookingOptionType,
  CategoryType,
  DestinationType,
  PropertyTypeType,
} from "@/types";

export const staysDestinations: DestinationType[] = [
  {
    location: "Bandung, Indonesia",
    description: "Great for a weekend getaway",
    icon: "TreeDeciduous",
    textColor: "#475569",
    bgColor: "#f8fafc",
  },
  {
    location: "Bali, Indonesia",
    description: "Perfect for beach lovers",
    icon: "TreePalm",
    textColor: "#dc2626",
    bgColor: "#fef2f2",
  },
  {
    location: "Tokyo, Japan",
    description: "A blend of tradition and technology",
    icon: "Building",
    textColor: "#d97706",
    bgColor: "#fffbeb",
  },
  {
    location: "New York, USA",
    description: "The city that never sleeps",
    icon: "Hotel",
    textColor: "#16a34a",
    bgColor: "#f0fdf4",
  },
  {
    location: "Paris, France",
    description: "The romantic capital of the world",
    icon: "Heart",
    textColor: "#65a30d",
    bgColor: "#f7fee7",
  },
  {
    location: "Sydney, Australia",
    description: "Iconic beaches and the Opera House",
    icon: "Waves",
    textColor: "#0891b2",
    bgColor: "#ecfeff",
  },
  {
    location: "Cairo, Egypt",
    description: "Home of the ancient pyramids",
    icon: "Mountain",
    textColor: "#2563eb",
    bgColor: "#eff6ff",
  },
  {
    location: "Amsterdam, Netherlands",
    description: "Famous for canals and museums",
    icon: "WavesLadder",
    textColor: "#9333ea",
    bgColor: "#faf5ff",
  },
  {
    location: "Dubai, UAE",
    description: "City of skyscrapers and luxury",
    icon: "Castle",
    textColor: "#f59e0b",
    bgColor: "#fffbeb",
  },
  {
    location: "Reykjavik, Iceland",
    description: "Best place to see the Northern Lights",
    icon: "Snowflake",
    textColor: "#0ea5e9",
    bgColor: "#f0f9ff",
  },
  {
    location: "Rio de Janeiro, Brazil",
    description: "Home of the famous Christ the Redeemer",
    icon: "Palmtree",
    textColor: "#10b981",
    bgColor: "#ecfdf5",
  },
  {
    location: "Rome, Italy",
    description: "The Eternal City with ancient ruins",
    icon: "LandPlot",
    textColor: "#e11d48",
    bgColor: "#fef2f2",
  },
  {
    location: "Seoul, South Korea",
    description: "A city of K-pop and vibrant nightlife",
    icon: "SquareActivity",
    textColor: "#3b82f6",
    bgColor: "#eff6ff",
  },
  {
    location: "Cape Town, South Africa",
    description: "A city with breathtaking landscapes",
    icon: "Earth",
    textColor: "#a3e635",
    bgColor: "#f7fee7",
  },
  {
    location: "Machu Picchu, Peru",
    description: "A mystical Incan citadel",
    icon: "Mountain",
    textColor: "#dc2626",
    bgColor: "#fee2e2",
  },
  {
    location: "Santorini, Greece",
    description: "Famous for white-washed buildings and sunsets",
    icon: "House",
    textColor: "#2563eb",
    bgColor: "#eff6ff",
  },
  {
    location: "Vancouver, Canada",
    description: "A mix of nature and modern city life",
    icon: "Briefcase",
    textColor: "#f97316",
    bgColor: "#ffedd5",
  },
  {
    location: "Kyoto, Japan",
    description: "Known for its classical Buddhist temples",
    icon: "View",
    textColor: "#f59e0b",
    bgColor: "#fffbeb",
  },
  {
    location: "Havana, Cuba",
    description: "Famous for colorful architecture and classic cars",
    icon: "HouseIcon",
    textColor: "#db2777",
    bgColor: "#fdf2f8",
  },
  {
    location: "Zurich, Switzerland",
    description: "A city known for its lakes and banking center",
    icon: "Banknote",
    textColor: "#2563eb",
    bgColor: "#eff6ff",
  },
];

export const experiencesDestinations: DestinationType[] = [
  {
    location: "London, England",
    description: "A city of history and modern culture",
    icon: "Building",
    textColor: "#d97706",
    bgColor: "#fffbeb",
  },
  {
    location: "Maldives",
    description: "Perfect for a tropical getaway",
    icon: "WavesIcon",
    textColor: "#16a34a",
    bgColor: "#f0fdf4",
  },
  {
    location: "Los Angeles, USA",
    description: "A mix of entertainment and beaches",
    icon: "Hotel",
    textColor: "#dc2626",
    bgColor: "#fef2f2",
  },
  {
    location: "Venice, Italy",
    description: "Famous for its canals and gondolas",
    icon: "House",
    textColor: "#065f46",
    bgColor: "#eff6ff",
  },
  {
    location: "Amsterdam, Netherlands",
    description: "Known for its vibrant culture and canals",
    icon: "TreePalm",
    textColor: "#9333ea",
    bgColor: "#faf5ff",
  },
  {
    location: "Madrid, Spain",
    description: "A city full of history and culture",
    icon: "Castle",
    textColor: "#2563eb",
    bgColor: "#eff6ff",
  },
  {
    location: "Singapore",
    description: "A futuristic city with tropical gardens",
    icon: "TreeDeciduous",
    textColor: "#3b82f6",
    bgColor: "#ecfeff",
  },
  {
    location: "Kyoto, Japan",
    description: "Known for its classical Buddhist temples",
    icon: "View",
    textColor: "#f59e0b",
    bgColor: "#fffbeb",
  },
  {
    location: "Prague, Czech Republic",
    description: "A city of stunning medieval architecture",
    icon: "Castle",
    textColor: "#059669",
    bgColor: "#f0fdf4",
  },
  {
    location: "Cape Town, South Africa",
    description: "A city with breathtaking landscapes",
    icon: "Earth",
    textColor: "#a3e635",
    bgColor: "#f7fee7",
  },
  {
    location: "New Delhi, India",
    description: "The capital of India with rich history",
    icon: "Mountain",
    textColor: "#2563eb",
    bgColor: "#eff6ff",
  },
  {
    location: "Rio de Janeiro, Brazil",
    description: "Famous for Carnival and Copacabana Beach",
    icon: "Palmtree",
    textColor: "#10b981",
    bgColor: "#ecfdf5",
  },
  {
    location: "Helsinki, Finland",
    description: "Known for its modern design and architecture",
    icon: "SquareActivity",
    textColor: "#0ea5e9",
    bgColor: "#eff6ff",
  },
  {
    location: "Barcelona, Spain",
    description: "Famous for its architecture and beaches",
    icon: "HouseIcon",
    textColor: "#e11d48",
    bgColor: "#fef2f2",
  },
  {
    location: "Istanbul, Turkey",
    description: "A city where East meets West",
    icon: "Waves",
    textColor: "#3b82f6",
    bgColor: "#f7fee7",
  },
  {
    location: "Queenstown, New Zealand",
    description: "Adventure capital with stunning landscapes",
    icon: "WavesLadder",
    textColor: "#0891b2",
    bgColor: "#ecfeff",
  },
  {
    location: "Seoul, South Korea",
    description: "A city of K-pop and vibrant nightlife",
    icon: "SquareActivity",
    textColor: "#3b82f6",
    bgColor: "#eff6ff",
  },
];

export const categories: CategoryType[] = [
  { name: "Tropical", icon: "TreeDeciduous", path: "tropical" },
  { name: "Icons", icon: "Sparkles", path: "icons" },
  { name: "Beachfront", icon: "Waves", path: "beachfront" },
  { name: "Castles", icon: "Castle", path: "castles" },
  { name: "Islands", icon: "TreePalm", path: "islands" },
  { name: "New", icon: "ListPlus", path: "new" },
  { name: "Tiny homes", icon: "House", path: "tiny-homes" },
  { name: "Amazing views", icon: "View", path: "amazing-views" },
  { name: "Amazing pools", icon: "WavesLadder", path: "amazing-pools" },
  { name: "OMG!", icon: "Siren", path: "omg" },
  { name: "Mansions", icon: "Warehouse", path: "mansions" },
  { name: "Treehouses", icon: "HousePlug", path: "treehouses" },
  { name: "Ski-in/out", icon: "CableCar", path: "ski-in-out" },
  { name: "Off-the-grid", icon: "TableCellsMerge", path: "off-the-grid" },
  { name: "Cabins", icon: "Dog", path: "cabins" },
  { name: "Lakefront", icon: "Snowflake", path: "lakefront" },
  { name: "Luxe", icon: "HandPlatter", path: "luxe" },
  { name: "Rooms", icon: "SquareActivity", path: "rooms" },
  { name: "Top of the world", icon: "Earth", path: "top-of-the-world" },
  { name: "Golfing", icon: "LandPlot", path: "golfing" },
];

export const amenities: AmenityType[] = [
  { name: "Wifi", icon: "Wifi", type: "essentials", isMain: true },
  { name: "Kitchen", icon: "CookingPot", type: "essentials", isMain: true },
  {
    name: "Washer",
    icon: "WashingMachine",
    type: "essentials",
    isMain: true,
  },
  { name: "Dryer", icon: "Wind", type: "essentials", isMain: true },
  {
    name: "Air conditioning",
    icon: "AirVent",
    type: "essentials",
    isMain: true,
  },
  { name: "Heating", icon: "Heater", type: "essentials", isMain: true },
  {
    name: "Dedicated workspace",
    icon: "Briefcase",
    type: "essentials",
    isMain: false,
  },
  { name: "TV", icon: "Tv", type: "essentials", isMain: false },
  { name: "Hair dryer", icon: "Fan", type: "essentials", isMain: false },
  { name: "Iron", icon: "Container", type: "essentials", isMain: false },
  { name: "Pool", icon: "WavesLadder", type: "features", isMain: false },
  { name: "Hot tub", icon: "Bath", type: "features", isMain: false },
  {
    name: "Free parking",
    icon: "CircleParking",
    type: "features",
    isMain: false,
  },
  {
    name: "Ev charger",
    icon: "BatteryCharging",
    type: "features",
    isMain: false,
  },
  { name: "Crib", icon: "Fence", type: "features", isMain: false },
  { name: "King bed", icon: "BedDouble", type: "features", isMain: false },
  { name: "Gym", icon: "Dumbbell", type: "features", isMain: false },
  { name: "BBQ gril", icon: "Beef", type: "features", isMain: false },
  { name: "Breakfast", icon: "Utensils", type: "features", isMain: false },
  {
    name: "Indoor fireplace",
    icon: "FlameKindling",
    type: "features",
    isMain: false,
  },
  {
    name: "Smoking allowed",
    icon: "Cigarette",
    type: "features",
    isMain: false,
  },
  {
    name: "Beachfront",
    icon: "Palmtree",
    type: "location",
    isMain: false,
  },
  { name: "Waterfront", icon: "Waves", type: "location", isMain: false },
  { name: "Smoke alarm", icon: "SirenIcon", type: "safety", isMain: false },
  {
    name: "Carbon monoxide alarm",
    icon: "AlarmSmoke",
    type: "safety",
    isMain: false,
  },
];

export const bookingOptions: BookingOptionType[] = [
  { name: "Instant Book", icon: "Zap" },
  { name: "Self check-in", icon: "KeyRound" },
  { name: "Allow pets", icon: "PawPrint" },
];

export const products_example = [
  { name: "Product 1", price: "Rp300.000", typeofPlace: "room" },
  { name: "Product 2", price: "Rp450.000", typeofPlace: "entire home" },
  { name: "Product 3", price: "Rp750.000", typeofPlace: "room" },
];

// Generate 1000 random products
export const products = Array.from({ length: 1000 }, (_, index) => {
  const name = `Product ${index + 1}`;
  // Generate price with bias to average around 300,000 to 2,000,000
  const price = Math.floor(Math.random() * (3000000 - 160000 + 1) + 160000);

  const weightedPrice = Math.floor(price * 0.6 + Math.random() * 2000000 * 0.4);

  const typeofPlace = Math.random() > 0.5 ? "room" : "entire home";

  return {
    name,
    price: `Rp${weightedPrice.toLocaleString("id-ID")}`,
    typeofPlace,
  };
});

export const property_types: PropertyTypeType[] = [
  {
    name: "House",
    icon: "House",
  },
  {
    name: "Apartment",
    icon: "Building",
  },
  {
    name: "Guesthouse",
    icon: "Warehouse",
  },
  {
    name: "Hotel",
    icon: "Hotel",
  },
];

export const accessibilityFeatures = {
  guestEntranceAndParking: [
    {
      id: "step-free-access",
      label: "Step-free access",
    },
    {
      id: "disable-parking-spot",
      label: "Disable parking spot",
    },
    {
      id: "guest-entrance-wider-than-32-inches",
      label: "Guest entrance wider than 32 inches",
    },
  ],
  bedroom: [
    {
      id: "step-free-bedroom-access",
      label: "Step-free bedroom access",
    },
    {
      id: "bedroom-entrance-wider-than-32-inches",
      label: "Bedroom entrance wider than 32 inches",
    },
  ],
  bathroom: [
    {
      id: "step-free-bathroom-access",
      label: "Step-free bathroom access",
    },
    {
      id: "bathroom-entrance-wider-than-32-inches",
      label: "Bathroom entrance wider than 32 inches",
    },
    {
      id: "toilet-grab-bar",
      label: "Toilet grab bar",
    },
    {
      id: "shower-grab-bar",
      label: "Shower grab bar",
    },
    {
      id: "step-free-shower",
      label: "Step-free shower",
    },
    {
      id: "shower-or-bath-chair",
      label: "Shower or bath chair",
    },
  ],
  adaptiveEquipment: [
    {
      id: "ceiling-or-mobile-hoist",
      label: "Ceiling or mobile hoist",
    },
  ],
};

export const hostLanguages = [
  { id: "chinese", label: "Chinese" },
  { id: "french", label: "French" },
  { id: "italian", label: "Italian" },
  { id: "korean", label: "Korean" },
  { id: "russian", label: "Russian" },
  { id: "arabic", label: "Arabic" },
  { id: "dutch", label: "Dutch" },
  { id: "hindi", label: "Hindi" },
  { id: "malay", label: "Malay" },
  { id: "thai", label: "Thai" },
  { id: "gujarati", label: "Gujarati" },
  { id: "urdu", label: "Urdu" },
  { id: "english", label: "English" },
  { id: "german", label: "German" },
  { id: "japanese", label: "Japanese" },
  { id: "portuguese", label: "Portuguese" },
  { id: "spanish", label: "Spanish" },
  { id: "czech", label: "Czech" },
  { id: "greek", label: "Greek" },
  { id: "indonesian", label: "Indonesian" },
  { id: "swedish", label: "Swedish" },
  { id: "bengali", label: "Bengali" },
  { id: "tagalog", label: "Tagalog" },
  { id: "sign-language", label: "Sign Language" },
];
