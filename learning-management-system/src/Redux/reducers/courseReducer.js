import { createReducer } from "@reduxjs/toolkit";


export const courseReducer = createReducer({courses:[],lectures:[]}, builder => {
    builder
        .addCase('allCourseRequest', state => {
            state.loading = true;
        })
        .addCase('allCourseSuccess', (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        })
        .addCase('allCourseFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('getCourseRequest', state => {
            state.loading = true;
        })
        .addCase('getCourseSuccess', (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        })
        .addCase('getCourseFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('addToPlaylistRequest', state => {
            state.loading = true;
        })
        .addCase('addToPlaylistSuccess', (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase('addToPlaylistFail', (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase('clearError', (state) => {
            state.error = null;
          })
          .addCase('clearMessage', (state) => {
            state.message = null;
          });
});