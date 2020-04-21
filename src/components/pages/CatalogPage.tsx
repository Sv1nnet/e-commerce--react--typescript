import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

const CatalogPage: React.FC<IProps> = (IProps) => {
  const { children } = IProps;

  return (
    <>
      <h2>Catalog Page</h2>
      {children}
    </>
  );
};

export default CatalogPage;
