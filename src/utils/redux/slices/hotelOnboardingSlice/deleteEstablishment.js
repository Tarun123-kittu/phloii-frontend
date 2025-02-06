import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_CONFIG } from "@/config/app_config";

export const delete_establishment = createAsyncThunk("delete_establishment", async ({ establishmentId }, thunkAPI) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("phloii_token_auth"));

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}/hotel/delete_my_establishment?establishmentId=${establishmentId}`, requestOptions)
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

const DeleteEstablishment = createSlice({
    name: "DeleteEstablishment",
    initialState: {
        status: null,
        data: null,
        error: null
    },
    reducers: {
        clear_delete_establishment_state: (state) => {
            state.status = null
            state.data = null
            state.error = null
            return state
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(delete_establishment.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(delete_establishment.fulfilled, (state, action) => {
                state.status = "Success"
                state.data = action.payload
            })
            .addCase(delete_establishment.rejected, (state, action) => {
                state.status = "Error"
                state.error = action.payload
            })
    }
})

export const { clear_delete_establishment_state } = DeleteEstablishment.actions
export default DeleteEstablishment.reducer