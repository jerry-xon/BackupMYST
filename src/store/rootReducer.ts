import { combineReducers } from '@reduxjs/toolkit';
import createPostSlice  from './slice/postSlice'
import categoriesSlice from './slice/categoriesSlice'
const rootReducer = combineReducers({
  post: createPostSlice,
  categoris: categoriesSlice
  // add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
