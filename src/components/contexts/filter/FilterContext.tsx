import React, { createContext, useState } from 'react';


export type TFilterPrice = number | '' | undefined;
export type TFilterPrices = [TFilterPrice, TFilterPrice];
export interface IFilterResult {
  discount: boolean;
  price: TFilterPrices;
  brands: string[];
  type: {
    touchscreen: boolean,
    buttons: boolean,
  };
}

export type TUpdateFilter = (newFilter: IFilterResult) => void;
export interface IContextValue {
  filterData: IFilterResult,
  updateFilter: TUpdateFilter,
}

interface IProps {
  children?: React.ReactNode;
}


export const FilterContext = createContext<IContextValue>({
  filterData: {
    discount: false,
    price: ['', ''],
    brands: [],
    type: {
      touchscreen: false,
      buttons: false,
    },
  },
  updateFilter: () => {},
});

const FilterContextProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  const [filterResult, setFilterResult] = useState<IFilterResult>({
    discount: false,
    price: ['', ''],
    brands: [],
    type: {
      touchscreen: false,
      buttons: false,
    },
  });

  return (
    <FilterContext.Provider
      value={{
        filterData: filterResult,
        updateFilter: setFilterResult,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
