import React, { FC } from 'react';
import styles from './PageTitle.module.scss';

type PageTitleProps = {
  title: string;
}

const PageTitle:FC<PageTitleProps> = ({ title }) => (
  <h1 className={styles.title}>{title}</h1>
);

export default PageTitle;
