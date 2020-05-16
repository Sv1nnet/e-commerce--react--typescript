import 'module-alias/register';
import { expect } from 'chai';

import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import { allItems as allItemsStr } from '../../fakeApi/stringifiedItems';
import { cartTypes } from '../../actions/actionTypes';
import rootReducer, { getDiscountMultiplier } from '../rootReducer';


const allItems = JSON.parse(allItemsStr);

describe('Test ADD_TO_CART action dispatching', () => {
  it('Should add product to the cart and update "total" prop', () => {
    const composeEnhancers = compose(applyMiddleware(thunk));
    const store = createStore(rootReducer, composeEnhancers);
    const samsungGalaxyS20 = allItems.Samsung[0];

    const action = {
      type: cartTypes.ADD_TO_CART,
      data: samsungGalaxyS20,
    };

    const stateToCompare = {
      cart: {
        products: [samsungGalaxyS20],
        total: samsungGalaxyS20.price,
      },
    };

    store.subscribe(() => {
      const updatedState = store.getState();
      updatedState.cart.products.forEach((el, i) => {
        let prop = Object.keys(el)[0];

        for (prop in el) {
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
    const samsungGalaxyS20 = allItems.Samsung[0];
    const xiaomiMiMix2S = allItems.Xiaomi[3];

    const action = {
      type: cartTypes.ADD_TO_CART,
      data: samsungGalaxyS20,
    };
    const total = samsungGalaxyS20.price + (xiaomiMiMix2S.price * getDiscountMultiplier(xiaomiMiMix2S.discount));

    const stateToCompare = {
      cart: {
        products: [samsungGalaxyS20, xiaomiMiMix2S],
        total,
      },
    };

    store.dispatch(action);

    store.subscribe(() => {
      const updatedState = store.getState();
      updatedState.cart.products.forEach((el, i) => {
        let prop = Object.keys(el)[0];
        for (prop in el) {
          expect(el[prop]).equals(stateToCompare.cart.products[i][prop]);
        }
      });
      expect(updatedState.cart.total).equals(stateToCompare.cart.total);
    });

    const actionWithDiscountedProduct = {
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
    const samsungGalaxyS20 = allItems.Samsung[0];

    const action = {
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
    const samsungGalaxyS20 = allItems.Samsung[0];
    const xiaomiMiMix2S = allItems.Xiaomi[3];

    const actionOne = {
      type: cartTypes.ADD_TO_CART,
      data: samsungGalaxyS20,
    };
    const actionTwo = {
      type: cartTypes.ADD_TO_CART,
      data: xiaomiMiMix2S,
    };

    const stateToCompare = {
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

    const actionWithDiscountedProduct = {
      type: cartTypes.REMOVE_FROM_CART,
      data: xiaomiMiMix2S.id,
    };
    store.dispatch(actionWithDiscountedProduct);
  });
});
