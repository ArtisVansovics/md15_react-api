import React, { FC } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
  title: string;
  bgColor: string;
  onClick?: () => void;
  disabled?: boolean | undefined;
}

const Button:FC<ButtonProps> = ({
  title, bgColor, onClick, disabled,
}) => (
  <button
    className={styles.button}
    style={{ backgroundColor: bgColor }}
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
);

export default Button;
