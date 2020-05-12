export type TState = {
  cart: ICart;
};

export type TAction = {
  type: string;
  data: any;
};

export interface ICart {
  products: IProduct[];
  total: number;
}

export interface IProduct {
  title: string;
  id: string;
  price: number;
  discount: number;
  available: boolean;
  img?: string;
  description?: string;
}
