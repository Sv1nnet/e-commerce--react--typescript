import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

const MainPage: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <>
      <h2>Catalog Main</h2>
      {children}
    </>
  );
};

export default MainPage;
