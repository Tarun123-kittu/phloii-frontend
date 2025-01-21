import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const delete_hotel_image = createAsyncThunk("delete_hotel_image", async ({ index, id }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/delete_Hotel_image?hotelId=${id}&deleteImageIndex=${index}`, requestOptions)

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

const deleteHotelImage = createSlice({
    name: "deleteHotelImage",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_delete_hotel_image: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_hotel_image.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(delete_hotel_image.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(delete_hotel_image.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_delete_hotel_image } = deleteHotelImage.actions
export default deleteHotelImage.reducer