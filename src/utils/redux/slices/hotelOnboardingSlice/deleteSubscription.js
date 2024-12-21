import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const delete_subscription = createAsyncThunk("delete_subscription", async ({ subscriptionId }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('phloii_token_auth'));

        const raw = JSON.stringify({
            "customerId": subscriptionId
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://dev.phloii.com/api/v1/hotel/delete_subscription", requestOptions)
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

const deleteSubscription = createSlice({
    name: "deleteSubscription",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_delete_subscription_state: (state) => {
            state.status = null;
            state.data = null;
            state.error = null;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_subscription.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(delete_subscription.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(delete_subscription.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})

export const { clear_delete_subscription_state } = deleteSubscription.actions;
export default deleteSubscription.reducer;
