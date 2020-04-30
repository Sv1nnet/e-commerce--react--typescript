import React, { useState } from 'react';

import Navigation from '@components/navigation/Navigation';
import MainSection from '@components/mainSection/MainSection';
import SideBar from '@components/sidebar/SideBar';
import SimpleButton from '@components/ui/buttons/simpleButton/SimpleButton';

import './style.scss';
import FilterContextProvider from '../contexts/filter/FilterContext';


interface IProps {

}


const App: React.FC<IProps> = () => {
  const [isSideBarActiveOnMediumScreen, setSideBarActiveOnMediumScreen] = useState<boolean>(false);

  return (
    <div className="App">
      <Navigation />

      <div className="App__inner">
        <FilterContextProvider>
          <SimpleButton
            text="Filter"
            className="App__filter-button"
            onClick={() => { setSideBarActiveOnMediumScreen((prevState) => !prevState); }}
          />

          <SideBar
            showSideBar={setSideBarActiveOnMediumScreen}
            isSideBarActiveOnMediumScreen={isSideBarActiveOnMediumScreen}
            className={`${isSideBarActiveOnMediumScreen ? 'SideBar_md_active' : 'SideBar_md_inactive'}`}
          />

          <MainSection />
        </FilterContextProvider>
      </div>
    </div>
  );
};

export default App;
