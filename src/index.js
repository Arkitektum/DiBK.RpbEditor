import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import nb from 'date-fns/locale/nb';
import store from 'store';
import './utils/tinymce-bootstrapper';
import './utils/mutation-observer';
import './index.scss';
import { Provider } from 'react-redux';

registerLocale('nb', nb);
setDefaultLocale('nb');

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

