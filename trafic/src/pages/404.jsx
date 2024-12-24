import React from 'react';
import style from '../modules/404.module.css'

const PageNotFound = () => {
  return (
    <div className={style.container}>
      <h1 className={style.header}>404</h1>
      <h2 className={style.subHeader}>Page not found</h2>
      <p className={style.paragraph}>
      Oops! The page you are looking for does not exist. It may have been moved or deleted.
      </p>
      <a href="/" className={style.link}>Back to home</a>
    </div>
  );
};

export default PageNotFound;