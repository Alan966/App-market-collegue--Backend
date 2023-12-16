export enum ProductType {
  COMESTIBLE = "comestible",
  VESTIMENTA = "vestimenta",
  ELECTRONICA = "electronica",
}

export interface IProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: { data: Buffer; contentType: string };
  quantity?: number;
  package_type?: string;
  create_date?: string;
  expired_date?: string;
  ingredients?: string;
  preparation_instructions?: string;
  type?: string;
  size?: string;
  color?: string;
  brand?: string;
}

export enum ProductDiscount {
  COMESTIBLE = 0.1,
  VESTIMENTA = 0.25,
  ELECTRONICA = 0.2,
}
