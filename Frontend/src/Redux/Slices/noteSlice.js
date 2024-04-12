import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collection : [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
   addNotes(state,action){
        state.collection = action.payload
   }
  }
});

export const {addNotes} = noteSlice.actions;
export default noteSlice.reducer;
