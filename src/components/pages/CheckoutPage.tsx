import React from 'react';

const CheckoutPage: React.FC = (props) => {
  return (
    <>
      <h2>Checkout Page</h2>
      {props.children}
    </>
  );
}

export default CheckoutPage;
