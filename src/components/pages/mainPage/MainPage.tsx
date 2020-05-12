import React from 'react';

import './style.scss';

interface IProps {
  children?: React.ReactNode;
}

const MainPage: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <div className="MainPage">
      <div className="MainPage__inner">
        {children}
      </div>
    </div>
  );
};

export default MainPage;
