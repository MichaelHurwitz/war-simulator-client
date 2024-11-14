import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/user';

const API_URL = import.meta.env.VITE_API_URL;

interface UserState {
  user: any | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  users: User[];
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("token") || null,
  status: 'idle',
  error: null,
  users: [],
};

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      console.log("Sending login request:", { username, password });
      const response = await axios.post(`${API_URL}/users/login`, { username, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);


export const registerUser = createAsyncThunk(
  'user/register',
  async (
    userData: { username: string; password: string; organization: string; region?: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, userData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }

      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user)); // שומר רק את הנתונים הרלוונטיים
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user data'
      );
    }
  }
);





const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    setUserFromLocalStorage(state) {
      state.token = localStorage.getItem('token') || null;
      const storedUser = localStorage.getItem('user');
      state.user = storedUser ? JSON.parse(storedUser) : null;
    },    
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
  })
  .addCase(registerUser.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.user = action.payload.user;
    localStorage.setItem("user", JSON.stringify(action.payload.user));
  })
  .addCase(fetchUserData.fulfilled, (state, action) => {
    state.user = action.payload;
    state.status = 'succeeded';
  })
  .addCase(loginUser.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload as string;
  })
  .addCase(registerUser.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload as string;
  })
  .addCase(fetchUserData.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload as string;
  });
  },
});

export const { logout, setUserFromLocalStorage } = userSlice.actions;

export default userSlice.reducer;

console.log("Token in localStorage:", localStorage.getItem('token'));
console.log("User in localStorage:", localStorage.getItem('user'));


