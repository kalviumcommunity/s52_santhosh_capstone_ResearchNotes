import {configureStore} from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import resultReducer from './Slices/resultSlice';


export const store = configureStore({
    // devTools:true,
    reducer:{
        userData:userReducer,
        resultData:resultReducer,
    }
})