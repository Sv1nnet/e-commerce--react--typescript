import { IFilterResult } from '@components/contexts/filter/FilterContext';
import { allItems, mainItems } from './stringifiedItems';


type TRoute = '/' | '/catalog' | '/pay';

interface IItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'touchscreen' | 'buttons';
  img: string;
  discount: number;
  available: boolean;
}

interface IFiltered {
  [key: string]: IItem[] | undefined;
}

interface IPaymentData {
  address: string;
  phone: string;
  itemIds: string[];
}

export interface IData {
  [key: string]: any;
}

interface IRes {
  status: number;
  text: string;
  data: {} | IData;
}


const routes = {
  main: '/',
  catalog: '/catalog',
  pay: '/pay',
};

const handleCatalogReq: (filter: any) => IRes = (filter = {
  discount: false,
  price: ['', ''],
  brands: [],
  type: {
    touchscreen: false,
    buttons: false,
  },
}) => {
  const items: IData = JSON.parse(allItems);
  let filteredData: IFiltered = {};

  const priceFrom: number = filter.price[0] ? +filter.price[0] : 0;
  const priceUpto: number = filter.price[1] ? +filter.price[1] : 0;

  if (filter.brands.length > 0) {
    // Filter by brand
    filter.brands.forEach((brand: any) => {
      filteredData[brand] = items[brand];
    });
  } else {
    filteredData = { ...items };
  }

  for (const brand in filteredData) {
    // Filter by discount
    if (filter.discount) {
      filteredData[brand] = filteredData[brand]?.filter((item: IItem) => item.discount > 0);
    }

    // Filter by price
    if (!!filter.price[0] || !!filter.price[1]) {
      filteredData[brand] = filteredData[brand]?.filter((item: IItem) => {
        const shouldCheckPriceUpto = !!priceUpto;
        const priceHeigherThanFrom = item.price >= priceFrom;
        const priceLowerThanUpto = item.price <= priceUpto;

        return shouldCheckPriceUpto ? priceLowerThanUpto && priceHeigherThanFrom : priceHeigherThanFrom;
      });

      if (filteredData[brand] && filteredData[brand]!.length < 1) delete filteredData[brand];
    }

    // Filter by type
    if (filter.type.touchscreen || filter.type.buttons) {
      filteredData[brand] = filteredData[brand]?.filter((item: IItem) => {
        for (const type in filter.type) {
          return item.type === type;
        }
        return true;
      });
    }
  }

  return {
    status: 200,
    text: 'OK',
    data: filteredData,
  };
};

const handleMainReq: () => IRes = () => ({
  status: 200,
  text: 'OK',
  data: JSON.parse(mainItems),
});

const handlePayReq: () => IRes = () => ({
  status: 200,
  text: 'OK',
  data: {},
});

/**
 * Send simulated requested to a server and get result as Promise<IRes>.
 * @param route '/' or '/catalog' or '/pay'
 * @returns IRes is { status: number, text: 'OK', data: items | {}}
 */
const fakeFetch: (route: TRoute, data?: IFilterResult | IPaymentData) => Promise<IRes> = (route, data) => {
  if (route === routes.pay && !data) {
    throw new Error('Data has to be provided to make a payment');
  }

  if (route !== routes.catalog && route !== routes.pay && route !== routes.main) {
    return new Promise<IRes>((res) => {
      res({
        status: 400,
        text: 'Request error',
        data: {},
      });
    });
  }

  return new Promise<IRes>((res, rej) => {
    if (route === routes.main) {
      res(handleMainReq());
    } else if (route === routes.catalog) {
      res(handleCatalogReq(data));
    } if (route === routes.pay) {
      res(handlePayReq());
    } else {
      rej(new Error('Wrong route in a query'));
    }
  });
};

export default fakeFetch;
