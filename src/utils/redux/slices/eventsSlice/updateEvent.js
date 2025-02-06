import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const update_event = createAsyncThunk("update_event", async ({ title, startDate, endDate, startTime, endTime, image, hotelId, description, eventId }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const formdata = new FormData();
        formdata.append("eventId", eventId);
        formdata.append("hotelId", hotelId);
        formdata.append("eventTitle", title);
        if(image){
            formdata.append("image", image);
        }
        formdata.append("eventStartDate", startDate);
        formdata.append("eventStartTime", startTime);
        formdata.append("eventEndDate", endDate);
        formdata.append("eventEndTime", endTime);
        formdata.append("eventDescription", description);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/updateEvent`, requestOptions)
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

const UpdateEvent = createSlice({
    name: "UpdateEvent",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_update_event_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(update_event.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(update_event.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(update_event.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_update_event_state } = UpdateEvent.actions
export default UpdateEvent.reducer