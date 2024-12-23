'use client'

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const get_hotels_details = createAsyncThunk("get_hotels_details", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token_auth'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/get_hotel_details`, requestOptions)

        if (!response.ok) {
            const errorMessage = await response.json();
            if (errorMessage) {
                throw new Error(errorMessage.message);
            }
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
        });
    }
})

const getHotelsDetails = createSlice({
    name: "getHotelsDetails",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_hotels_details.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(get_hotels_details.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(get_hotels_details.rejected, (state) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})

export default getHotelsDetails.reducer