import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PixApi } from "../../common/apis/PixApi";
import { pixApiKey } from "../../common/apis/pixApiKey";


export const fetchingPhotos = createAsyncThunk("fetchingPhotosAsync", async(search)=>{
        const allData = await PixApi(`?key=${pixApiKey}&q=${search}`);
        return allData.data.hits;
});


const initialState = {
    photos: [],
    favorites: [],
    status: ""
}

const photoSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
    addFavorites: (state, {payload}) =>{
        const data = state.favorites.findIndex(favorite => favorite.id === payload.id);

        if(data === -1){
            state.favorites.push(payload);
        }
        else{
            const filter = state.favorites.filter(favorite => favorite.id !== payload.id);
            state.favorites = filter;
        }
    },

    removePhotos: (state)=>{
        state.photos = [];
    }
    },
    extraReducers: {
        [fetchingPhotos.pending]: (state)=>{
            return {...state, status: "pending"}
        },
        [fetchingPhotos.fulfilled]: (state, {payload})=>{
            return {...state, status: "fullfilled", photos: payload};
        },
        [fetchingPhotos.rejected]: (state)=>{
            return {...state, status: "error"}
        }
    }
});

export const {removePhotos, addFavorites} = photoSlice.actions;
export const photoSelector = (state) => state.photos.photos;
export const statusSelector = (state) => state.photos.status;
export const favoriteSelector = (state) => state.photos.favorites;
export default photoSlice.reducer;


