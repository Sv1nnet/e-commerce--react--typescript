import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

const CheckoutPage: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <>
      {children}
    </>
  );
};

export default CheckoutPage;
