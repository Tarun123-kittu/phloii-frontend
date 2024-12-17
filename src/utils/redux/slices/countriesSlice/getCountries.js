import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const get_countries = createAsyncThunk("get_countries", async (thunkAPI) => {
    try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/states")
        if (!response.ok) {
            const errorMessage = await response.json();
            console.log("Error response:", errorMessage);
            throw new Error(errorMessage.message || "Unknown error occurred");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.message,
        });
    }
})

const getCountries = createSlice({
    name: "getCountries",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_countries.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(get_countries.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(get_countries.rejected, (state, action) => {
                state.error = action.payload
                state.status = "Error"
            })
    }
})

export default getCountries.reducer