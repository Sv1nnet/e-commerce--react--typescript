import React from 'react';

import './style.scss';


interface IProps {
  onClick: React.EventHandler<React.SyntheticEvent<HTMLButtonElement>>;
  text?: string | null;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}


const SimpleButton: React.FC<IProps> = (props) => {
  const {
    onClick,
    text = '',
    className,
    textClassName,
    disabled = false,
    children,
  } = props;

  return (
    <button type="button" onClick={onClick} className={`SimpleButton ${className || ''}`} disabled={disabled}>
      <span className={`SimpleButton__text ${textClassName || ''}`}>
        {text}
        {children}
      </span>
    </button>
  );
};

export default SimpleButton;
