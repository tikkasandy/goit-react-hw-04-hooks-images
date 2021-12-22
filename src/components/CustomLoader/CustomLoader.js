import { Component } from 'react';
import Loader from 'react-loader-spinner';
import s from './CustomLoader.module.scss';

function CustomLoader() {
  return (
    <div className={s.CustomLoader}>
      <Loader type="ThreeDots" color="#3f51b5" height={200} width={200} />
    </div>
  );
}

export default CustomLoader;
