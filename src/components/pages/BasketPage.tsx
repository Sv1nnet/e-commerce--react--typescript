import React from 'react';

const BasketPage: React.FC = (props) => {
  return (
    <>
      <h2>Basket Page</h2>
      {props.children}
    </>
  );
}

export default BasketPage;
