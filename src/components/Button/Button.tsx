import React, { FC } from 'react';
import './Button.scss';

type ButtonProps = {
  title: string;
  bgColor: string;
  onClick: () => void;
}

const Button:FC<ButtonProps> = ({ title, bgColor, onClick }) => (
  <button
    className="button"
    style={{ backgroundColor: bgColor }}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
