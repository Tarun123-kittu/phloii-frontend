const { createSlice } = require("@reduxjs/toolkit");

const manageSidebar = createSlice({
    name : "manageSidebar",
    initialState : {
        isSidebarOpen : false,
    },
    reducers : {
        toggle_sidebar : (state,action) => {
            state.isSidebarOpen = action.payload;
        }
    }
})
export const { toggle_sidebar } = manageSidebar.actions;
export default manageSidebar.reducer;