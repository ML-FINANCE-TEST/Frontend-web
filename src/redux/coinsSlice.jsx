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
    const response = await axios.get(
      "https://server-dbs5.onrender.com/api/allcoins"
    );
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
      `https://server-dbs5.onrender.com/api/olhc/${params}`
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
        `https://server-dbs5.onrender.com/api/olhc/${params}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.status;
    }
  }
);

export const sentimentFetch = createAsyncThunk("auth/sentimentFetch", async (params) => {
  try {
    const response = await axios.get(
      `https://server-dbs5.onrender.com/api/ethereum-sentiments`
    );
    return response?.data;
  } catch (error) {
    return error?.response?.status;
  }
});


export const fearFetch = createAsyncThunk("auth/fearFetch", async (params) => {
  try {
    const response = await axios.get(
      `https://server-dbs5.onrender.com/api/fear-and-greed-index`
    );
    return response?.data;
  } catch (error) {
    return error?.response?.status;
  }
});

export const validate = createAsyncThunk("auth/validate", async (params, coin) => {
  try {
    console.log(params, "paramsparams");
    const response = await axios.get(
      `https://server-dbs5.onrender.com/api/validater/${params?.coin}/${params?.params}`
    );
    return response?.data;
  } catch (error) {
    return error?.response?.status;
  }
});

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
      });
    builder
      .addCase(validate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(validate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fearFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fearFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coins = action.payload;
      })
      .addCase(fearFetch.rejected, (state, action) => {
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
