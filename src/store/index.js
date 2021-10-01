import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './slices/apiSlice';
import idbReducer from './slices/idbSlice';

export default configureStore({
   reducer: {
      api: apiReducer,
      idb: idbReducer
   }
});