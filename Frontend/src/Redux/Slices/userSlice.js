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
    },
    deleteUserData(state,action){
      state.isLogged = false;
      state.values = {};
    }
  }
});

export const {addUserData,deleteUserData} = userSlice.actions;
export default userSlice.reducer;