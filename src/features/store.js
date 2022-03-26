import {configureStore} from "@reduxjs/toolkit";
import PhotoReducer from "./photos/PhotoSlice";

const store = configureStore({
    reducer: {
        photos: PhotoReducer
    }
})

export default store;