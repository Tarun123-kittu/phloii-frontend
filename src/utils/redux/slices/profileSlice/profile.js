import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const getProfile = createAsyncThunk("getProfile", async (_, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/getHotelAccoutDetails`, requestOptions)
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

const GetProfile = createSlice({
    name: "GetProfile",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_profile_details: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_profile_details } = GetProfile.actions
export default GetProfile.reducer