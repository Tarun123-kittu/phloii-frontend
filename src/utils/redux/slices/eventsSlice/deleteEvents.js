import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const delete_event = createAsyncThunk("delete_event", async ({ eventId }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/delete_my_establishment?establishmentId=${eventId}`, requestOptions)
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

const DeleteEvent = createSlice({
    name: "DeleteEvent",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_delete_event_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_event.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(delete_event.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(delete_event.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})

export const { clear_delete_event_state } = DeleteEvent.actions
export default DeleteEvent.reducer