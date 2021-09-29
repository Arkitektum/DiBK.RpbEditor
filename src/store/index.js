import { configureStore } from '@reduxjs/toolkit';
import dialogReducer from './slices/dialogSlice';
import apiReducer from './slices/apiSlice';
import idbReducer from './slices/idbSlice';

export default configureStore({
   reducer: {
      dialog: dialogReducer,
      api: apiReducer,
      idb: idbReducer
   }
});