import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MY_KEY } from "../credentials";


const initialState = {
    details: {},
    isLoading: false,
    error: false
};


export const fetchWeather = createAsyncThunk('weather/fetch', async (query, thunkAPI) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${MY_KEY}`)
        const data = await response.json();
        if (response.ok) {
            return data
        }
        return thunkAPI.rejectWithValue({ error: data.message });
    } catch (error) {
        throw thunkAPI.rejectWithValue({ error: error.message })

    }
});

const appSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.isLoading = false;
                state.details = action.payload;
                state.error = false;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.error = action.payload
            })
    }

});

export const weatherData = (state) => state.weather.details;
export const returnedError = (state) => state.weather.error;
export default appSlice.reducer;