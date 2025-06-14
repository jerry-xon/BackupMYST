// src/redux/slices/categoriesSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from 'src/constants/api';
import { CategoriesProps } from '@features/profile/OnboardProfileController';

// If your API response type is needed, import or define it:
interface CategoriesResponse {
  data: Array<{ _id: string; interest: string; [key: string]: any }>;
  [key: string]: any;
}

// Thunk returns CategoriesProps[]
export const fetchCategories = createAsyncThunk<CategoriesProps[]>(
  'categories/fetchCategories',
  async () => {
    console.log("Call eher")
    const response = await api.get<CategoriesResponse>(
      '/interest/get-interest'
    );
    console.log("response :: =<",response)
    // Map API data to CategoriesProps[]
    return response.data.data.map((item, idx) => ({
      id: idx, // Or use id: item._id if you want string IDs
      name: item.interest,
    }));
  }
);

// State uses CategoriesProps[]
interface CategoriesState {
  categories: CategoriesProps[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  status: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        // Debug logs (optional)
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
        console.log("Error : while get catgories : (categroriesSlice): ",
          state
        )
        // Debug logs (optional)
      });
  },
});

export default categoriesSlice.reducer;
