import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiClient from '../api/apiClient'

export const likeCaftan = createAsyncThunk(
  'caftan/likeCaftan',
  async (slug, { rejectWithValue }) => {
    try {
        const response = await apiClient.patch(`/caftans/${slug}/like/`);
      return { slug, likes: response.data.likes };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to like caftan');
    }
  }
);
// ✅ AsyncThunk: جلب القفاطن الأكثر مشاهدة
export const fetchTopCaftans = createAsyncThunk(
  'caftans/fetchTopCaftans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/caftans/most_viewed/');
      return response.data;
      
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch caftans');
    }
  }
);
 // fetch caftan by category

export const fetchCaftansByCategory = createAsyncThunk(
  'caftan/fetchCaftansByCategory',
  async (categoryName, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/caftans/by_category/?category=${categoryName}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch caftans by category');
    }
  }
);

export const fetchCaftans = createAsyncThunk('caftan/fetchCaftans', async () => {
  const response = await apiClient.get('/caftans/')
  return response.data.results
})

export const deleteCaftan = createAsyncThunk('caftan/deleteCaftan', async (id) => {
  await apiClient.delete(`/caftans/${id}/`)
})
// 🔍 Search caftans
export const searchCaftans = createAsyncThunk('caftan/searchCaftans', async (query) => {
  const response = await apiClient.get('/caftans/search/', {
    params: { q: query },
  });
  return response.data;
});

export const fetchCaftanById = createAsyncThunk(
  'caftan/fetchCaftanById',
  async (id) => {
    const response = await apiClient.get(`/caftans/${id}/`);
    return response.data;
  }
);
export const createCaftan = createAsyncThunk(
  'caftan/createCaftan',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/caftans/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editCaftan = createAsyncThunk(
  'caftan/editCaftan',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/caftans/${id}/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const caftanSlice = createSlice({
  name: 'caftan',
  initialState: {
    caftans: [],
    topCaftans:[], 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaftans.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCaftans.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.caftans = action.payload
      })
      .addCase(fetchCaftans.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
       .addCase(searchCaftans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchCaftans.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.caftans = action.payload;
      })
      .addCase(searchCaftans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCaftan.pending, (state) => {
        state.status = 'loading'
      })  
      .addCase(deleteCaftan.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.caftans = state.caftans.filter(caftan => caftan.id !== action.meta.arg)
      })
      .addCase(deleteCaftan.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createCaftan.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createCaftan.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.caftans.push(action.payload.data)
      })
      .addCase(createCaftan.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
      .addCase(editCaftan.pending, (state) => {
        state.status = 'loading'
      })  
      .addCase(editCaftan.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.caftans.findIndex(caftan => caftan.id === action.payload.data.id)
        if (index !== -1) {
          state.caftans[index] = action.payload.data
        }
      })
      .addCase(editCaftan.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message
      })
      .addCase(fetchCaftanById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCaftanById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.caftan = action.payload
      })
      .addCase(fetchCaftanById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
       // ✅ fetchTopCaftans
      .addCase(fetchTopCaftans.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopCaftans.fulfilled, (state, action) => {
         console.log("✅ fetchTopCaftans success:", action.payload);
        state.status = 'succeeded';
        state.topCaftans = action.payload;
      })
      .addCase(fetchTopCaftans.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(likeCaftan.fulfilled, (state, action) => {
  const { id, likes } = action.payload;
  const caftan = state.caftans.find(c => c.id === id);
  if (caftan) {
    caftan.likes = likes;
  }
})
.addCase(fetchCaftansByCategory.pending, (state) => {
  state.status = 'loading';
  state.error = null;
})
.addCase(fetchCaftansByCategory.fulfilled, (state, action) => {
  state.status = 'succeeded';
  state.caftans = Array.isArray(action.payload) ? action.payload : [];
})
.addCase(fetchCaftansByCategory.rejected, (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
})
}
})

export default caftanSlice.reducer
