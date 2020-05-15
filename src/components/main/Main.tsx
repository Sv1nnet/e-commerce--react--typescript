import React, { useState, useEffect, useContext } from 'react';
import { TMappedDispatch } from '@components/app/App';
import Card from '@components/card/Card';
import fakeFetch, { IProductsRes } from '@/fakeApi/fakeFetch';
import { IProduct } from '@/reducers/types';

import './style.scss';
import { FilterContext } from '../contexts/filter/FilterContext';


interface IProps extends TMappedDispatch {
  children?: React.ReactNode;
}

const Main: React.FC<IProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<IProductsRes>({});
  const productsToRender: IProduct[] = [];
  const { filterData } = useContext(FilterContext);

  for (const name in products) {
    if (products[name]) products[name].forEach((prod) => productsToRender.push(prod));
  }

  useEffect(() => {
    fakeFetch<IProductsRes>('/').then((res) => {
      const { data } = res;
      console.log('res', res);
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    fakeFetch<IProductsRes>('/catalog', filterData).then((res) => {
      const { data } = res;
      console.log('res', res);
      setProducts(data);
    });
  }, [filterData]);

  return (
    <div className="Main">
      {productsToRender.map((prod) => (
        <Card
          className="Main__card"
          key={prod.id}
          id={prod.id}
          name={prod.name}
          price={prod.price}
          type={prod.type}
          discount={prod.discount}
          description={prod.description}
          imgSrc={prod.img}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default Main;
