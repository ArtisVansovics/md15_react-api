import React, { FC } from 'react';
import './PageTitle.scss';

type PageTitleProps = {
  title?: string;
}

const PageTitle:FC<PageTitleProps> = ({ title }) => (
  <h1 className="page__title">{title}</h1>
);

export default PageTitle;
