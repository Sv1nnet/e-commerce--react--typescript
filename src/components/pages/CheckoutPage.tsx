import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

const CheckoutPage: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <>
      <h2>Checkout Page</h2>
      {children}
    </>
  );
};

export default CheckoutPage;
