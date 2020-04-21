import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

const BasketPage: React.FC<IProps> = (IProps) => {
  const { children } = IProps;

  return (
    <>
      <h2>Basket Page</h2>
      {children}
    </>
  );
};

export default BasketPage;
