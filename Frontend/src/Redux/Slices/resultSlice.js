import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: '',
  results:{},
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    addResults(state, action) {
      const { key, value } = action.payload;
      state.results[key] = value;
      state.results.okay = true;
    },
    addQuery(state,action){
      state.query = action.payload;
    }
  }
});

export const {addResults,addQuery} = resultSlice.actions;
export default resultSlice.reducer;