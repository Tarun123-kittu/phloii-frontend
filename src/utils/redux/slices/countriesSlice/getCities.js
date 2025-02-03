import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCities = createAsyncThunk("getCities", async ({ country, state }, thunkAPI) => {
    console.log("inside the redux api")
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "country": country,
            "state": state
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", requestOptions)
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

const GetCities = createSlice({
    name: "GetCities",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_cities_data: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCities.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getCities.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(getCities.rejected, (state, action) => {
                state.error = action.payload
                state.status = "Error"
            })
    }
})

export const {clear_cities_data} = GetCities.actions
export default GetCities.reducer