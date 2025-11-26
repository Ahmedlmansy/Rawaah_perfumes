import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notesApi } from "../apis/notesApi";

export interface Notes {
    id: string
    name: string
    image: string
    created_at: string;
}

interface NotesState {
  items: Notes[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
        items: [],
    loading: false,
    error: null,
}

export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async () => {
        const data = await notesApi.getNotes()
        return data
    }
    
)

const notesSlice = createSlice({
    name: "Notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state) => {
                  console.log("Fetching brands...");
      state.loading = true;
      state.error = null;
        }).addCase(fetchNotes.fulfilled, (state ,action) => {
            state.loading = false;
      state.items = action.payload;
        }).addCase(fetchNotes.rejected, (state , action) => {
            console.log(" Fetch failed:", action.error.message);
      state.loading = false;
      state.error = action.error.message!;
        })
    }
})
export default notesSlice.reducer;