import React from 'react';

import './style.scss';


interface IProps {
  onClick: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>;
  text?: string | null;
  className?: string;
  textClassName?: string;
  children?: React.ReactNode;
}


const SimpleButton: React.FC<IProps> = (props) => {
  const {
    onClick,
    text = '',
    className,
    textClassName,
    children,
  } = props;

  return (
    <button type="button" onClick={onClick} className={`SimpleButton ${className || ''}`}>
      <span className={`SimpleButton__text ${textClassName || ''}`}>{text}</span>
      {children}
    </button>
  );
};

export default SimpleButton;
