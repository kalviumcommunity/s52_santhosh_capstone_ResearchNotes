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
    resetUser(state,action){
      state.isLogged = false;
      state.values = {};
    }
  }
});

export const {addUserData,resetUser} = userSlice.actions;
export default userSlice.reducer;