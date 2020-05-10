import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { TState, IProduct } from '@/reducers/types';

import Navigation from '@components/navigation/Navigation';
import MainSection from '@components/mainSection/MainSection';
import SideBar from '@components/sidebar/SideBar';
import SimpleButton from '@components/ui/buttons/simpleButton/SimpleButton';

import { addToCart as addToCartAction, removeFromCart as removeFromCartAction, IAddToCartAction, IRemoveFromCartAction } from '@/actions/cartActions';
import FilterContextProvider from '../contexts/filter/FilterContext';
import './style.scss';


const mapDispatchToProps: TMapDispatchToProps = (dispatch) => ({
  addToCart: (id) => dispatch(addToCartAction(id)),
  removeFromCart: (id) => dispatch(removeFromCartAction(id)),
});


export type TMappedDispatch = {
  addToCart: TAddToCart;
  removeFromCart: TRemoveFromCart;
};

type TMapDispatchToProps = (dispatch: ThunkDispatch<TState, undefined, IAddToCartAction | IRemoveFromCartAction>) => TMappedDispatch;
type TAddToCart = (product: IProduct) => void;
type TRemoveFromCart = (id: string) => void;

type IProps = ReturnType<typeof mapDispatchToProps> & {};


const App: React.FC<IProps> = ({ addToCart, removeFromCart }) => {
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

          <MainSection addToCart={addToCart} removeFromCart={removeFromCart} />
        </FilterContextProvider>
      </div>
    </div>
  );
};


export default connect(null, mapDispatchToProps)(App);
