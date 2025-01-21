import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const hotel_notifications = createAsyncThunk("hotel_notifications", async (thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/get_hotel_notifications`, requestOptions)

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

const hotelNotifications = createSlice({
    name: "hotelNotifications",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_hotel_notifications: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(hotel_notifications.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(hotel_notifications.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(hotel_notifications.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})

export const { clear_hotel_notifications } = hotelNotifications.actions
export default hotelNotifications.reducer