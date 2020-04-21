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
  id: string | number;
  price: number;
  available: number | boolean;
}
