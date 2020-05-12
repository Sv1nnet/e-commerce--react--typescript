import React, { useState, useEffect } from 'react';
import { TMappedDispatch } from '@components/app/App';
import Card from '@components/card/Card';
import fakeFetch, { IRes, IProductsRes } from '@/fakeApi/fakeFetch';
import { IProduct } from '@/reducers/types';

import './style.scss';


interface IProps extends TMappedDispatch {
  children?: React.ReactNode;
}

const Main: React.FC<IProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<IProductsRes>({});
  const productsToRender: IProduct[] = [];

  for (const name in products) {
    products[name].forEach((prod) => productsToRender.push(prod));
  }

  useEffect(() => {
    fakeFetch<IProductsRes>('/').then((res) => {
      const { data } = res;
      console.log('res', res);
      setProducts(data);
    });
  }, []);
  return (
    <div className="Main">
      {productsToRender.map((prod) => (
        <Card
          key={prod.id}
          id={prod.id}
          price={prod.price}
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
