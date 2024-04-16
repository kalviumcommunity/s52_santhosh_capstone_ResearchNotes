import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  collection : [],
  currentNote : {},
  splitMode : false
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
   addNotes(state,action){
        state.collection = action.payload
   },
   addCurrentNote(state,action){
        state.currentNote = action.payload
   },
   changeMode(state,action){
        state.splitMode = action.payload
   }
  }
});

export const {addNotes, addCurrentNote, changeMode} = noteSlice.actions;
export default noteSlice.reducer;
