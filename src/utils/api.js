import axios from 'axios';
import store from 'store';
import { showDialog } from 'store/slices/dialogSlice';

export const sendAsync = async (url, data, options = {}) => {
   try {
      const defaultOptions = {
         method: 'post',
         url,
         data
      };

      const response = await axios(Object.assign(defaultOptions, options));

      return response.data || null;
   } catch (error) {
      const message = (error.response && error.response.data) ? error.response.data : error.message;
      store.dispatch(showDialog({ title: 'En feil har oppstått', body: message }));

      return null;
   }
}

