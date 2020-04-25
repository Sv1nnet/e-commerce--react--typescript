import React, { useState, useContext, useRef } from 'react';
import Checkbox from '@components/ui/inputs/checkbox/Checkbox';
import Rollup from '@components/ui/rollup/Rollup';
import TextInput from '@components/ui/inputs/text/TextInput';

import { FilterContext, IFilterResult, IContextValue } from '@components/contexts/filter/FilterContext';
import { IRelatedElement } from '@components/ui/buttons/showButton/ShowButton';
import ShowButton from '../ui/buttons/showButton/ShowButton';

import filterChangeHandler from './utils/filterChangeHandler';

import './style.scss';


interface IProps {
}


const SideBar: React.FC<IProps> = () => {
  const { filterData, updateFilter } = useContext<IContextValue>(FilterContext);

  const [filterChanged, setFilterChanged] = useState<boolean>(false);
  const [filter, setFilter] = useState<IFilterResult>(filterData);
  const [showButtonRelatedElementData, setShowButtonRelatedElementData] = useState<IRelatedElement>({ top: 0, height: 0 });

  const asideRef = useRef<HTMLElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const inputContainer = document.querySelector<HTMLElement>(`label[for=${target.id}]`) || target;

    setFilterChanged(true);
    setShowButtonRelatedElementData(() => {
      const inputBoundingClientRect = inputContainer.getBoundingClientRect();
      const inputTop = inputBoundingClientRect.top;
      const inputHeight = inputContainer.offsetHeight;
      const asideTop = asideRef?.current?.offsetTop || 0;

      const buttonTop = inputTop - asideTop;

      return {
        top: buttonTop,
        height: inputHeight,
      };
    });

    setFilter((prevFilter) => {
      const { filterType } = target.dataset;
      const handler = filterType && filterChangeHandler[filterType];
      const newFilter = handler ? handler(target, prevFilter) : { ...prevFilter };

      return newFilter;
    });
  };

  const submitFilterChange: () => void = () => {
    updateFilter(filter);
    setFilterChanged(false);
  };

  return (
    <aside ref={asideRef} className="SideBar App__sidebar">
      <div className="SideBar__inner">

        <div className="SideBar__checkbox-wrapper">
          <Checkbox
            data={{ 'data-filter-type': 'discount' }}
            className="SideBar__checkbox"
            text="Discount"
            name="discount"
            id="discount"
            onChange={onChange}
          />
        </div>

        <Rollup className="SideBar__rollup" header="Price">
          <div className="SideBar__price-rollup">
            <div className="SideBar__price-wrapper">
              <TextInput
                className="App__text-input"
                data={{ 'data-filter-type': 'price', 'data-price-type': 'from' }}
                id="price-from"
                placeholder="from"
                value={filter.price[0]}
                onChange={onChange}
              />
            </div>
            <div className="SideBar__price-wrapper">
              <TextInput
                className="App__text-input"
                data={{ 'data-filter-type': 'price', 'data-price-type': 'upto' }}
                id="price-upto"
                placeholder="upto"
                value={filter.price[1]}
                onChange={onChange}
              />
            </div>
          </div>
        </Rollup>

        <Rollup className="SideBar__rollup" header="Brand">
          <Checkbox
            data={{ 'data-filter-type': 'brands' }}
            className="Rollup__item"
            text="Apple"
            name="Apple"
            id="apple"
            onChange={onChange}
          />
          <Checkbox
            data={{ 'data-filter-type': 'brands' }}
            className="Rollup__item"
            text="FinePower"
            name="FinePower"
            id="finepower"
            onChange={onChange}
          />
          <Checkbox
            data={{ 'data-filter-type': 'brands' }}
            className="Rollup__item"
            text="Samsung"
            name="Samsung"
            id="samsung"
            onChange={onChange}
          />
          <Checkbox
            data={{ 'data-filter-type': 'brands' }}
            className="Rollup__item"
            text="Xiaomi"
            name="Xiaomi"
            id="xiaomi"
            onChange={onChange}
          />
        </Rollup>

        <Rollup className="SideBar__rollup" header="Type">
          <Checkbox
            data={{ 'data-filter-type': 'type' }}
            className="Rollup__item"
            text="Buttons"
            name="buttons"
            id="buttons"
            onChange={onChange}
          />
          <Checkbox
            data={{ 'data-filter-type': 'type' }}
            className="Rollup__item"
            text="Touch screen"
            name="touchscreen"
            id="touchscreen"
            onChange={onChange}
          />
        </Rollup>

      </div>

      {filterChanged && (
        <ShowButton
          className="SideBar__show-button"
          onClick={submitFilterChange}
          shouldCenter
          related={showButtonRelatedElementData}
        />
      )}
    </aside>
  );
};

export default SideBar;
