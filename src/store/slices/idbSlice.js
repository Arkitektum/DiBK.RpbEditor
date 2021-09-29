import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   lastSaved: null
};

export const idbSlice = createSlice({
   name: 'idb',
   initialState,
   reducers: {
      updateLastSaved: (state, action) => {   
         Object.assign(state, action.payload);
      }
   }
});

export const { updateLastSaved } = idbSlice.actions;

export default idbSlice.reducer;