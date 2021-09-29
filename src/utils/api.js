import axios from 'axios';
import store from 'store';
import { toggleLoading } from 'store/slices/apiSlice';
import { showDialog } from 'store/slices/dialogSlice';

export const sendAsync = async (url, data, options = {}) => {
   try {
      store.dispatch(toggleLoading({ loading: true }));
      const defaultOptions = { method: 'post', url, data };
      const response = await axios({ ...defaultOptions, ...options });
      store.dispatch(toggleLoading({ loading: false }));

      return response.data || null;
   } catch (error) {
      store.dispatch(toggleLoading({ loading: false }));
      store.dispatch(showDialog({ title: 'Feil', body: getMessage(error) }));
      
      return null;
   }
}

function getMessage(error) {
   if (!error.response) {
      return error.message;
   }

   switch (error.response.status) {
      case 400:
         return error.response.data;
      default:
         return error.message;
   }
}

