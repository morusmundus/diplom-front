import React from 'react';
import s from './PageContainer.module.css'

const PageContainer = ({children}) => {
  return (
    <div className={s.PageContainer}>
      <div className={s.body}>
      {children}
      </div>
    </div>
  );
};

export default PageContainer;