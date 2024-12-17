import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_hotel_info = createAsyncThunk("get_hotel_info", async ({ id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token_auth'));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`https://dev.phloii.com/api/v1/hotel/get_hotel_data?hotelId=${id}`, requestOptions)
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

const getHotelInfoAPI = createSlice({
    name: "getHotelInfoAPI",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_get_hotel_info_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_hotel_info.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(get_hotel_info.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(get_hotel_info.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_get_hotel_info_state } = getHotelInfoAPI.actions
export default getHotelInfoAPI.reducer