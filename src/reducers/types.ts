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
  name: string;
  id: string;
  price: number;
  discount: number;
  available: boolean;
  type?: string;
  img?: string;
  description?: string;
}
