import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Missile {
  name: string;
  amount: number;
}

interface MissileState {
  missiles: Missile[];
  loading: boolean;
  error: string | null;
}

const initialState: MissileState = {
  missiles: [],
  loading: false,
  error: null,
};

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchMissiles = createAsyncThunk(
  "missiles/fetchMissiles",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/missiles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch missiles");
    }
  }
);

const missileSlice = createSlice({
  name: "missiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissiles.fulfilled, (state, action) => {
        state.loading = false;
        state.missiles = action.payload;
      })
      .addCase(fetchMissiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default missileSlice.reducer;
