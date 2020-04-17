import React from 'react';

const CatalogPage: React.FC = (props) => {
  return (
    <>
      <h2>Catalog Page</h2>
      {props.children}
    </>
  );
}

export default CatalogPage;
