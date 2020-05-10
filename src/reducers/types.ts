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

type title = string;
type id = string | number;
type price = number;
type discount = number;
type available = boolean;

export interface IProduct {
  [key: string]: title | id | price | discount | available;
  title: string;
  id: string;
  price: number;
  discount: number;
  available: boolean;
}
