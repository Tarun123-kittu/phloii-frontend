import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const reset_password = createAsyncThunk("reset_password", async ({ password, confirmPassword, token }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "hashed_token": token,
            "password": password,
            "confirmPassword": confirmPassword
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("https://dev.phloii.com/api/v1/hotel/resetPassword", requestOptions)
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

const resetPasswordAPI = createSlice({
    name: "resetPasswordAPI",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_reset_password_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(reset_password.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(reset_password.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(reset_password.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_reset_password_state } = resetPasswordAPI.actions
export default resetPasswordAPI.reducer