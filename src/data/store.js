import { configureStore, createSlice } from "@reduxjs/toolkit";

let locationSelect = createSlice({
    name: 'locationSelect',
    initialState: [Array.from({ length: 5 })],
    reducers: {
        setLocationSelect(x) {
            return x
        }
    }
});

export let { setLocationSelect } = locationSelect.actions

export default configureStore({
    reducer: {
        locationSelect: locationSelect.reducer,
    }
})