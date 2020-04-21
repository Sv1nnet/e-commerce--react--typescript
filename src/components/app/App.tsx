import React from 'react';

import Navigation from '@components/navigation/Navigation';
import MainSection from '@components/mainSection/MainSection';
import SideBar from '@components/sidebar/SideBar';

import './style.scss';


interface IProps {
  children?: React.ReactNode;
}

const App: React.FC<IProps> = () => (
  <div className="App">
    <Navigation />

    <div className="App__inner">
      <SideBar />
      <MainSection />
    </div>
  </div>
);

export default App;
