import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Character } from '../models/character';

type CharactersState = {
  characters: Character[];
};

const initialState: CharactersState = {
  characters: [],
};
const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    load: (state: CharactersState, { payload }: PayloadAction<Character[]>) => {
      state.characters = payload;
      return state;
    },
  },
});

export default charactersSlice.reducer;
export const { load } = charactersSlice.actions;
