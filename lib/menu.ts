export type MenuItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  available: boolean;
  category: "Wazwan" | "Plates" | "Vegetarian";
};

// Local restaurant images
const ristaRed = "/images/rista-red.png";
const ristaWhite = "/images/rista-white.webp";
const rogan = "/images/rogan-josh.jpg";
const dhaniwalKorma = "/images/dhaniwal-korma.webp";
const chicken = "/images/chicken.jpg";
const kabab = "/images/kabab.jpg";
const goshtabBig = "/images/goshtab-big.webp";
const goshtabSmall = "/images/goshtab-small.jpg";
const mirchiKorma = "/images/mirchi-korma.webp";
const paneer = "/images/paneer.webp";
const meatRoti = "/images/meat-roti.jpg";
const shamiKebab = "/images/shami-kebab.webp";

const ristaRice = "/images/rista-rice.png";
const dhaniwalRice = "/images/dhaniwal-rice.webp";
const roganRice = "/images/rogan-rice.jpg";
const sabziRice = "/images/sabzi-rice.jpg";
const ricePlate = "/images/rice-plate.jpg";
const wangonbig = "/images/wangon-big.jpg";
const wangonsmall = "/images/wangon-small.jpg";
const tonglarge = "/images/tong-large.jpg";
const tongsmall = "/images/tong-small.jpg";

export const menuItems: MenuItem[] = [
  {
    id: "rista-red",
    name: "RISTA RED",
    price: 70,
    image: ristaRed,
    category: "Wazwan",
    available: true,
  },
  {
    id: "rista-white",
    name: "RISTA WHITE",
    price: 70,
    image: ristaWhite,
    category: "Wazwan",
    available: true,
  },
  {
    id: "rogan-josh",
    name: "ROGAN JOSH",
    price: 80,
    image: rogan,
    category: "Wazwan",
    available: true,
  },
  {
    id: "tong-small",
    name: "TONG SMALL 🍐",
    price: 150,
    image: tongsmall,
    category: "Wazwan",
    available: true,
  },
  {
    id: "tong-large",
    name: "TONG LARGE 🍐",
    price: 200,
    image: tonglarge,
    category: "Wazwan",
    available: true,
  },
  {
    id: "dhaniwal-korma",
    name: "DHANIWAL KORMA",
    price: 80,
    image: dhaniwalKorma,
    category: "Wazwan",
    available: true,
  },
  {
    id: "chicken-quarter",
    name: "CHICKEN 1/4",
    price: 120,
    image: chicken,
    category: "Wazwan",
    available: true,
  },
  {
    id: "kabab",
    name: "KABAB 3/4",
    price: 80,
    image: kabab,
    category: "Wazwan",
    available: true,
  },
  {
    id: "goshtab-big",
    name: "GOSHTAB BIG",
    price: 250,
    image: goshtabBig,
    category: "Wazwan",
    available: true,
  },
  {
    id: "goshtab-small",
    name: "GOSHTAB SMALL",
    price: 150,
    image: goshtabSmall,
    category: "Wazwan",
    available: true,
  },
  {
    id: "mirchi-korma",
    name: "MIRCHI KORMA",
    price: 100,
    image: mirchiKorma,
    category: "Wazwan",
    available: true,
  },
  {
    id: "paneer",
    name: "PANEER",
    price: 100,
    image: paneer,
    category: "Vegetarian",
    available: true,
  },
  {
    id: "wangon",
    name: "WANGON",
    price: 100,
    image: wangonsmall,
    category: "Wazwan",
    available: true,
  },
  {
    id: "wangon-big",
    name: "WANGON BIG",
    price: 250,
    image: wangonbig,
    category: "Wazwan",
    available: true,
  },
  {
    id: "meat-roti-small",
    name: "MEAT ROTI SMALL",
    price: 150,
    image: meatRoti,
    category: "Plates",
    available: true,
  },
  {
    id: "meat-roti-big",
    name: "MEAT ROTI BIG",
    price: 250,
    image: meatRoti,
    category: "Plates",
    available: true,
  },
  {
    id: "shami-small",
    name: "SHAMI KABAB SMALL",
    price: 200,
    image: shamiKebab,
    category: "Wazwan",
    available: true,
  },
  {
    id: "shami-large",
    name: "SHAMI KABAB LARGE",
    price: 300,
    image: shamiKebab,
    category: "Wazwan",
    available: true,
  },
  {
    id: "rista-rice",
    name: "RISTA + RICE",
    price: 120,
    image: ristaRice,
    category: "Plates",
    available: true,
  },
  {
    id: "dhaniwal-rice",
    name: "DHANIWAL KORMA + RICE",
    price: 120,
    image: dhaniwalRice,
    category: "Plates",
    available: true,
  },
  {
    id: "rogan-rice",
    name: "ROGAN JOSH + RICE",
    price: 120,
    image: roganRice,
    category: "Plates",
    available: true,
  },
  {
    id: "sabzi-rice",
    name: "SABZI + RICE",
    price: 70,
    image: sabziRice,
    category: "Vegetarian",
    available: true,
  },
  {
    id: "rice",
    name: "RICE PLATE",
    price: 60,
    image: ricePlate,
    category: "Plates",
    available: true,
  },
];