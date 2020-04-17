import React from 'react';

const MainPage: React.FC = (props) => {
  return (
    <>
      <h2>Catalog Main</h2>
      {props.children}
    </>
  );
}

export default MainPage;
