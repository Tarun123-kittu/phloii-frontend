import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const get_single_event = createAsyncThunk("get_single_event", async ({ eventId }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/getEvent?eventId=${eventId}`, requestOptions)
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

const GetSingleEvent = createSlice({
    name: "GetSingleEvent",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_get_single_event_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_single_event.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(get_single_event.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(get_single_event.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_get_single_event_state } = GetSingleEvent.actions
export default GetSingleEvent.reducer