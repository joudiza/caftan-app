import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const refresh = state.auth.refresh;

      const response = await apiClient.post('/token/refresh/', {
        refresh: refresh,
      });

      const { access } = response.data;

      // ✅ تحديث الـ access token
      localStorage.setItem('access', access);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      return access;
    } catch (error) {
      console.error('❌ Refresh token failed:', error);
      return rejectWithValue(error.response?.data || 'Refresh failed');
    }
  }
);


// ✅ Fetch user info if token exists
export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {

  const response = await apiClient.get('/users/me/');
  return response.data;
});

// login action
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ username, password }) => {
     console.log("🚀 loginAdmin called"); // <== هادي أهم وحدة

    const tokenResponse = await apiClient.post('/token/', {
      username,
      password,
    });
 console.log("🛂 Token response:", tokenResponse.data); // <== واش فيه access و refresh؟

    const { access, refresh } = tokenResponse.data;

    // ✅ Save tokens
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    // ✅ Set default header for next requests
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    // ✅ Fetch user info (no need to set headers again)
    const userResponse = await apiClient.get('/users/me/');
console.log("👤 userResponse:", userResponse.data); // <== واش وصلنا للـ user؟
    if (!userResponse.data) {
      throw new Error('User not found');
    }
    return {
      access: access,
      refresh: refresh,
      user: userResponse.data,
    };
  }
);


// initial state
const initialState = {
  access: localStorage.getItem('access') || null,
  refresh: localStorage.getItem('refresh') || null,
  user: null,
  isLoading: true, // ✅ جديد
};

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.access = null;
      state.refresh = null;
      state.user = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      
      // ✅ Remove token from apiClient
      delete apiClient.defaults.headers.common['Authorization'];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.user = action.payload.user;
    })
    .addCase(loginAdmin.rejected, (state, action) => {
      console.error('Login failed:', action.error.message);
      // Optionally handle login failure
    })
    .addCase(fetchMe.pending, (state) => {
      console.log("❌ nothing yet");
      state.isLoading = true;
  })
  .addCase(fetchMe.fulfilled, (state, action) => {
      console.log("✅ fetchMe success:", action.payload);
    state.user = action.payload;
    state.isLoading = false;
  })
  .addCase(fetchMe.rejected, (state) => {
     console.log("❌ fetchMe failed");
    state.user = null;
    state.isLoading = false;
  })
  .addCase(refreshAccessToken.fulfilled, (state, action) => {
  state.access = action.payload;
})
.addCase(refreshAccessToken.rejected, (state) => {
  state.access = null;
  state.refresh = null;
  state.user = null;
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  delete apiClient.defaults.headers.common['Authorization'];
})
    
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
