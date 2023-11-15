import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRepo } from '../services/api.repo';
import { AnyCharacter } from '../models/character';

export const loadCharactersThunk = createAsyncThunk<AnyCharacter[], ApiRepo>(
  'characters/load',
  async (repo) => {
    const characters = await repo.getCharacters();
    return characters;
  }
);

export const updateCharacterThunk = createAsyncThunk<
  AnyCharacter,
  {
    repo: ApiRepo;
    id: AnyCharacter['id'];
    updatedCharacter: Partial<AnyCharacter>;
  }
>('characters/update', async ({ repo, id, updatedCharacter }) => {
  const finalCharacter = await repo.updateCharacter(id, updatedCharacter);
  return finalCharacter;
});
