import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API } from "../api";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null
}

export const logInUser = createAsyncThunk('auth/logInUser', async (user, thunkAPI) => {
    try {
        const response = await axios.post(`${USER_API}/login`, user);

        return response.data;
    } catch(err) {
        if(!err.response) {
            throw thunkAPI.rejectWithValue(err.message);
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        },
        resetStatus(state) {
            state.status = 'idle';
        }
    },
    extraReducers(builder) {
        builder
            .addCase(logInUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer;
export const {resetError, resetStatus} = authSlice.actions;
export const selectUser = state => state.auth.user;
export const getStatusAuth = state => state.auth.status;
export const getErrorAuth = state => state.auth.error;