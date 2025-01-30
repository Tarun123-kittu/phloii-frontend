import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const updateProfile = createAsyncThunk("updateProfile", async ({ username, email, image, phone }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("phoneNumber", phone);
        if(image){
            formdata.append("image", image);
        }

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/updateAccount`, requestOptions)
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

const UpdateProfile = createSlice({
    name: "UpdateProfile",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_profile_update_slice: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})
export const { clear_profile_update_slice } = UpdateProfile.actions
export default UpdateProfile.reducer