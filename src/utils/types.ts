export type Item = {
  itemId: string;
  itemName: string;
  categoryName: string;
  rate: number;
  stock: number;
  tags: string[];
  halfPrice: number;
  image: string;
  veg: boolean;
  active: boolean;
}

export type category = {
  id: string;
  name: string;
  image: string;
  active?: boolean;
}

export type Hotel = {
  id: string;
  name: string;
  address: string;
  categoriesData: category[];
  image: string;
  type: "Cafe" | "Bar" | "Restaurant" | "Hotel" | "Chinese" | "Ice cream center";
  link: string;
  userName: string;
  password: string;
  phone: string;
  managerName: string;
}
