import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const create_new_event = createAsyncThunk("create_new_event", async ({ title, startDate, endDate, startTime, endTime, image, hotelId, description }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const formdata = new FormData();
        formdata.append("eventTitle", title);
        formdata.append("eventStartDate", startDate);
        formdata.append("eventStartTime", startTime);
        formdata.append("eventEndDate", endDate);
        formdata.append("eventEndTime", endTime);
        formdata.append("eventDescription", description);
        formdata.append("hotelId", hotelId);
        formdata.append("image", image);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/createEvent`, requestOptions)

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

const CreateEvent = createSlice({
    name: "CreateEvent",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_create_event_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(create_new_event.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(create_new_event.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(create_new_event.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_create_event_state } = CreateEvent.actions
export default CreateEvent.reducer