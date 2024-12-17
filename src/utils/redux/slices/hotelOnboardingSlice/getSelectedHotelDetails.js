import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch hotel details
export const get_selected_hotel_details = createAsyncThunk(
    "get_selected_hotel_details",
    async ({ id }, thunkAPI) => {
        try {
            const token = localStorage.getItem("phloii_token_auth");

            // Check if the token exists
            if (!token) {
                throw new Error("Authorization token is missing.");
            }

            const myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            const response = await fetch(
                `https://dev.phloii.com/api/v1/hotel/get_hotel_data?hotelId=${id}`,
                requestOptions
            );

            if (!response.ok) {
                // Attempt to extract error message
                let errorMessage = "Something went wrong!";
                try {
                    const errorResponse = await response.json();
                    errorMessage = errorResponse?.message || errorMessage;
                } catch {
                    // Fallback if response is not JSON
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            // Pass error message to rejected state
            return thunkAPI.rejectWithValue({
                message: error.message || "An unknown error occurred.",
            });
        }
    }
);

// Redux slice
const getSelectedHotelDetails = createSlice({
    name: "getSelectedHotelDetails",
    initialState: {
        status: null,
        data: null,
        error: null,
    },
    reducers: {
        clear_selected_hotel_details: (state) => {
            state.status = null;
            state.data = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_selected_hotel_details.pending, (state) => {
                state.status = "Loading";
            })
            .addCase(get_selected_hotel_details.fulfilled, (state, action) => {
                state.status = "Success";
                state.data = action.payload;
                state.error = null;
            })
            .addCase(get_selected_hotel_details.rejected, (state, action) => {
                state.status = "Error";
                state.error = action.payload?.message || "Failed to fetch data.";
            });
    },
});

export const { clear_selected_hotel_details } = getSelectedHotelDetails.actions;
export default getSelectedHotelDetails.reducer;
