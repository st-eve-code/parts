export type BrandId =
  | "hero"
  | "bajaj"
  | "honda"
  | "tvs"
  | "yamaha"
  | "royal-enfield"
  | "ktm"
  | "suzuki"
  | "mahindra";

export type CategoryId =
  | "piston"
  | "brake-pads"
  | "disc-rotor"
  | "mirror"
  | "clutch-plates"
  | "chain-sprocket"
  | "cdi"
  | "speedometer"
  | "roller"
  | "oil-seal"
  | "air-filter"
  | "indicator"
  | "lever"
  | "footrest"
  | "headlight"
  | "side-stand"
  | "engine-oil"
  | "spark-plug"
  | "battery"
  | "camshaft"
  | "chain"
  | "brake-shoe"
  | "cable"
  | "seat"
  | "engine-guard"
  | "pannier-rail"
  | "sealant"
  | "sump-guard"
  | "exhaust"
  | "fender"
  | "fuel-pump";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export interface Applicability {
  make: string;
  model: string;
  year: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: BrandId;
  category: CategoryId;
  image: string;
  price: number;
  mrp?: number;
  rating?: number;
  ratingCount?: number;
  stock: StockStatus;
  badge?: string;
  oem?: string;
  specification: string[];
  description: string;
  applicability: Applicability[];
  featured?: boolean;
}

export interface Brand {
  id: BrandId;
  name: string;
  shortName: string;
  color: string;
  image: string;
  tagline: string;
  description: string;
  models: string[];
}
