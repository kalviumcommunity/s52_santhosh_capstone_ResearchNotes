import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  collection : [],
  currentNote : {},
  splitMode : false,
  editMode : false,
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
   changeSplitMode(state,action){
        state.splitMode = action.payload
   },
   changeEditMode(state,action){
     state.editMode = action.payload
   },
  }
});

export const {addNotes, addCurrentNote, changeSplitMode, changeEditMode} = noteSlice.actions;
export default noteSlice.reducer;
