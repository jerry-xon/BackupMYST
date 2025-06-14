import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  videoURl: string | null;
  videoThumbnail: string | null;
  tag: string;
  caption: string;
  categories: string[];
  duration:number
}

const initialState: VideoState = {
    videoURl: null,
  videoThumbnail: null,
  tag: "",
  caption: "",
  categories: [],
  duration: 0
};

const createPostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setState(state, action: PayloadAction<Partial<VideoState>>) {
      Object.assign(state, action.payload);
    },
    setFormData(state){
      console.log('setFormData', state);
    }
  },
});

export const { setState, setFormData } = createPostSlice.actions;
export default createPostSlice.reducer;
