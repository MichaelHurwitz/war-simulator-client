import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMissilesApi, buyMissileApi, addMissileApi } from '../api/missileApi';
import { MissileState } from '../../types/missile';

const initialState: MissileState = {
  items: [],
  userMissiles: [],
  status: 'idle',
  error: null,
};

// Async actions
export const fetchMissiles = createAsyncThunk(
  'missiles/fetchMissiles',
  async (_, thunkAPI) => {
    try {
      return await fetchMissilesApi();
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch missiles');
    }
  }
);

export const buyMissile = createAsyncThunk(
  'missiles/buyMissile',
  async (missileId: string, thunkAPI) => {
    try {
      return await buyMissileApi(missileId);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to buy missile');
    }
  }
);

export const addMissile = createAsyncThunk(
  'missiles/addMissile',
  async (missileData: { name: string; price: number }, thunkAPI) => {
    try {
      return await addMissileApi(missileData);
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add missile');
    }
  }
);

const missileSlice = createSlice({
  name: 'missiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMissiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMissiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(buyMissile.fulfilled, (state, action) => {
        state.userMissiles.push(action.payload);
      })
      .addCase(addMissile.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default missileSlice.reducer;
