// src/coinsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  coins: [],
  status: "idle",
  error: null,
};

// export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/coins/");
//     console.log("Response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching coins:", error);
//     throw error;
//   }
// });

export const fetchCoins = createAsyncThunk("auth/fetchCoins", async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/allcoins");
    //console.log(response, "Registration Response");
    return response?.data;
  } catch (error) {
    //console.log(error, "Registration Error");
    return error?.response?.status;
  }
});

export const fetchOlhc = createAsyncThunk("auth/fetchOlhc", async (params) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/olhc/${params}`
    );
    return response?.data;
  } catch (error) {
    return error?.response?.status;
  }
});

export const fetchOlhcEth = createAsyncThunk(
  "auth/fetchOlhcEth",
  async (params) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/olhc/${params}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.status;
    }
  }
);

export const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOlhc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOlhc.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchOlhc.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOlhcEth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOlhcEth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fetchOlhcEth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the selector
export const selectCoins = (state) => state.coins.coins;

// Export the reducer
export default coinsSlice.reducer;
