import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const changePassword = createAsyncThunk("changePassword", async ({ password, newPassword, confirmPassword }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const raw = JSON.stringify({
            "password": password,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/changePassword`, requestOptions)

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

const ChangePassword = createSlice({
    name: "ChangePassword",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_change_password_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(changePassword.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_change_password_state } = ChangePassword.actions
export default ChangePassword.reducer