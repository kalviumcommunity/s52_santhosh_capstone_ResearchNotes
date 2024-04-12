import {configureStore} from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import resultReducer from './Slices/resultSlice';
import noteReducer from './Slices/noteSlice';


export const store = configureStore({
    // devTools:true,
    reducer:{
        userData:userReducer,
        resultData:resultReducer,
        NoteData:noteReducer,
    }
})