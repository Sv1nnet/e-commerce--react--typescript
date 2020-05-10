import 'module-alias/register';
import { expect } from 'chai';

import {
  createStore,
  applyMiddleware,
  compose,
  AnyAction,
} from 'redux';
import thunk from 'redux-thunk';
import { allItems as allItemsStr } from '../../fakeApi/stringifiedItems';
import { cartTypes } from '../../actions/actionTypes';
import { TState, IProduct } from '../types';
import rootReducer, { getDiscountMultiplier } from '../rootReducer';

type TItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  img: string;
  discount: number;
  available: boolean;
};

interface IItems {
  [key: string]: IProduct[];
}

const allItems: IItems = JSON.parse(allItemsStr);


interface IAddToCartAction extends AnyAction {
  data: IProduct;
}
interface IRemoveFromCartAction extends AnyAction {
  data: string;
}


describe('Test ADD_TO_CART action dispatching', () => {
  it('Should add product to the cart and update "total" prop', () => {
    const composeEnhancers = compose(applyMiddleware(thunk));
    const store = createStore(rootReducer, composeEnhancers);
    const samsungGalaxyS20: IProduct = allItems.Samsung[0];

    const action: IAddToCartAction = {
      type: cartTypes.ADD_TO_CART,
      data: samsungGalaxyS20,
    };

    const stateToCompare: TState = {
      cart: {
        products: [samsungGalaxyS20],
        total: samsungGalaxyS20.price,
      },
    };

    store.subscribe(() => {
      const updatedState = store.getState();
      updatedState.cart.products.forEach((el: IProduct, i: number) => {
        for (const prop in el) {
          expect(el[prop]).equals(stateToCompare.cart.products[i][prop]);
        }
      });
      expect(updatedState.cart.total).equals(stateToCompare.cart.total);
    });
    store.dispatch(action);
  });

  it('Should add 2 products (1 with discount) to the cart and update "total" prop', () => {
    const composeEnhancers = compose(applyMiddleware(thunk));
    const store = createStore(rootReducer, composeEnhancers);
    const samsungGalaxyS20: IProduct = allItems.Samsung[0];
    const xiaomiMiMix2S: IProduct = allItems.Xiaomi[3];

    const action: IAddToCartAction = {
      type: cartTypes.ADD_TO_CART,
      data: samsungGalaxyS20,
    };
    const total: number = samsungGalaxyS20.price + (xiaomiMiMix2S.price * getDiscountMultiplier(xiaomiMiMix2S.discount));

    const stateToCompare: TState = {
      cart: {
        products: [samsungGalaxyS20, xiaomiMiMix2S],
        total,
      },
    };

    store.dispatch(action);

    store.subscribe(() => {
      const updatedState = store.getState();
      updatedState.cart.products.forEach((el: IProduct, i: number) => {
        for (const prop in el) {
          expect(el[prop]).equals(stateToCompare.cart.products[i][prop]);
        }
      });
      expect(updatedState.cart.total).equals(stateToCompare.cart.total);
    });

    const actionWithDiscountedProduct: IAddToCartAction = {
      type: cartTypes.ADD_TO_CART,
      data: allItems.Xiaomi[3],
    };
    store.dispatch(actionWithDiscountedProduct);
  });
});

describe('Test REMOVE_FROM_CART action dispatching', () => {
  it('Should remove product from the cart and update "total" prop. A cart has to be empty', () => {
    const composeEnhancers = compose(applyMiddleware(thunk));
    const store = createStore(rootReducer, composeEnhancers);
    const samsungGalaxyS20: IProduct = allItems.Samsung[0];

    const action: IRemoveFromCartAction = {
      type: cartTypes.REMOVE_FROM_CART,
      data: samsungGalaxyS20.id,
    };

    store.subscribe(() => {
      const updatedState = store.getState();

      expect(updatedState.cart.products.length).equals(0);
      expect(updatedState.cart.total).equals(0);
    });
    store.dispatch(action);
  });

  it('Should remove product with discount from the cart and update "total" prop', () => {
    const composeEnhancers = compose(applyMiddleware(thunk));
    const store = createStore(rootReducer, composeEnhancers);
    const samsungGalaxyS20: IProduct = allItems.Samsung[0];
    const xiaomiMiMix2S: IProduct = allItems.Xiaomi[3];

    const actionOne: IAddToCartAction = {
      type: cartTypes.ADD_TO_CART,
      data: samsungGalaxyS20,
    };
    const actionTwo: IAddToCartAction = {
      type: cartTypes.ADD_TO_CART,
      data: xiaomiMiMix2S,
    };

    const stateToCompare: TState = {
      cart: {
        products: [samsungGalaxyS20],
        total: samsungGalaxyS20.price,
      },
    };

    store.dispatch(actionOne);
    store.dispatch(actionTwo);

    store.subscribe(() => {
      const updatedState = store.getState();

      expect(updatedState.cart.products.length).equals(1);
      expect(updatedState.cart.products[0].id).equals(samsungGalaxyS20.id);
      expect(updatedState.cart.total).equals(stateToCompare.cart.total);
    });

    const actionWithDiscountedProduct: IRemoveFromCartAction = {
      type: cartTypes.REMOVE_FROM_CART,
      data: xiaomiMiMix2S.id,
    };
    store.dispatch(actionWithDiscountedProduct);
  });
});
