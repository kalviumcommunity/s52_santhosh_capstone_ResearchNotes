import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  collection: [],
  currentNote: {},
  splitMode: false,
  editMode: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNotes(state, action) {
      state.collection = [...action.payload];
    },
    addCurrentNote(state, action) {
      state.currentNote = { ...action.payload };
    },
    updateSingleNote(state, action) {
      const index = state.collection.findIndex(
        (note) => note._id === action.payload._id
      );
      if (index !== -1) {
        state.collection[index] = action.payload;
      } else {
        state.collection = [{ ...action.payload }, ...state.collection];
      }
    },
    deleteSingleNote(state, action) {
      const filteredData = state.collection.filter((note) => note._id !== action.payload.id);
      state.collection = filteredData;
    },  
    changeSplitMode(state, action) {
      state.splitMode = action.payload;
    },
    changeEditMode(state, action) {
      state.editMode = action.payload;
    },
    updateCurrentNoteTitle(state, action) {
      state.currentNote = {
        ...state.currentNote,
        title: action.payload,
      };
    },
    updateCurrentNoteContent(state, action) {
      state.currentNote = {
        ...state.currentNote,
        content: action.payload,
      };
    },
    saveLoading(state, action) {
      state.currentNote.loading = action.payload;
    },
    resetNotes(state,action){
      state.collection = [],
      state.currentNote = {},
      state.splitMode = false,
      state.editMode = false
    },
  },
});

export const {
  addNotes,
  addCurrentNote,
  changeSplitMode,
  changeEditMode,
  updateCurrentNoteTitle,
  updateCurrentNoteContent,
  updateSingleNote,
  saveLoading,
  deleteSingleNote,
  resetNotes
} = noteSlice.actions;
export default noteSlice.reducer;
