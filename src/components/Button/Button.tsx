import React, { FC } from 'react';
import './Button.scss';

type ButtonProps = {
  title: string;
  bgColor: string;
  onClick: () => void;
  disabled?: boolean | undefined;
}

const Button:FC<ButtonProps> = ({
  title, bgColor, onClick, disabled,
}) => (
  <button
    className="button"
    style={{ backgroundColor: bgColor }}
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
);

export default Button;
