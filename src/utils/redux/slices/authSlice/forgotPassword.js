import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const forgot_password = createAsyncThunk("forgot_password", async ({ email }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "email": email
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,  
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/forgetPassword`, requestOptions)
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

const forgotPasswordAPI = createSlice({
    name: "forgotPasswordAPI",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_forgot_password_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(forgot_password.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(forgot_password.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(forgot_password.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_forgot_password_state } = forgotPasswordAPI.actions
export default forgotPasswordAPI.reducer