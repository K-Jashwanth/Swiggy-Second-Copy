import { createSlice } from "@reduxjs/toolkit";


const toggleSlice = createSlice({
    name : "toggleSlice",
    initialState : {
        searchBarToggle : false,
        loginToggle : false ,
        similarResDish : {
            isSimilarResDishes : false,
            city : "",
            resLocation : "",
            resId : "",
            itemId : "",
        }
    },
    reducers : {
        toggleSearchBar : (state, action) => {
            state.searchBarToggle = !state.searchBarToggle
        },
        toggleLogin : (state, action) => {
            state.loginToggle = !state.loginToggle
        },
        setSimilarResDish : (state,action) => {
            state.similarResDish = action.payload;
        },
        ressetSimilarResDish : (state) => {
            state.similarResDish = {
            isSimilarResDishes : false,
            city : "",
            resLocation : "",
            resId : "",
            itemId : "",
        }
        }
    }
})

export const {toggleSearchBar, toggleLogin, ressetSimilarResDish,setSimilarResDish} = toggleSlice.actions
export default toggleSlice.reducer