import {
  AmenityType,
  BookingOptionType,
  CategoryType,
  PropertyTypeType,
} from "@/types";

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
