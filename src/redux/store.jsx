// src/store.js

import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from './coinsSlice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
  },
});
