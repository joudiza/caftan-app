import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';

// 🔄 Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await apiClient.get("/users/");
  return response.data.results;
});

// ➕ Create user
export const createUser = createAsyncThunk("user/createUser", async (userData) => {
  const response = await apiClient.post("/users/", userData);
  return response.data.results;
});

// ✏️ Edit user
export const editUser = createAsyncThunk("user/editUser", async ({ id, data }) => {
  const response = await apiClient.put(`/users/${id}/`, data);
  return response.data;
});

// ❌ Delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await apiClient.delete(`/users/${id}/`);
  return id;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle",
    error: null,
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
