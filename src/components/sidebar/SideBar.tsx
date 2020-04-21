import React from 'react';
/*
discount - checkbox
price - two fields: from/to
brand - roll-up list with checkboxes
type - sensor/button checkbox

aside placed fron the right "show" button
*/
import './style.scss';
import Checkbox from '@components/ui/checkbox/Checkbox';
import Rollup from '../ui/rollup/Rollup';

const SideBar: React.FC = () => {
  return (
    <aside className="SideBar App__sidebar">
      <div className="SideBar__inner">
        <div className="SideBar__section">
          <div className="SideBar__price-wrapper">

          </div>
        </div>
        <div className="SideBar__checkbox-wrapper">
          <Checkbox className="SideBar__checkbox" text="Discount" id="test" onChange={() => { }} />
        </div>
        <Rollup className="SideBar__rollup" header="test rollup">
          <Checkbox className="Rollup__item" text="Discount" id="1" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="2" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="3" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="4" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="5" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="6" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="7" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="8" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="9" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="10" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="11" onChange={() => { }} />
          <Checkbox className="Rollup__item" text="Discount" id="12" onChange={() => { }} />
        </Rollup>
      </div>
    </aside>
  );
};

export default SideBar;
