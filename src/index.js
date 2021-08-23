import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import nb from 'date-fns/locale/nb';
import './utils/tinymce-bootstrapper';
import './utils/mutation-observer';
import './index.scss';

registerLocale('nb', nb);
setDefaultLocale('nb');

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('root')
);

