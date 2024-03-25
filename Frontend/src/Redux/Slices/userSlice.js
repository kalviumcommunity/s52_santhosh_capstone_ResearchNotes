import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  values: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData(state, action) {
      state.isLogged = true;
      state.values = action.payload;
    }
  }
});

export const {addUserData} = userSlice.actions;
export default userSlice.reducer;