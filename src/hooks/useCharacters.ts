import { useCallback, useMemo } from 'react';
import { ApiRepo } from '../services/api.repo';
import { useDispatch, useSelector } from 'react-redux';
import * as ac from '../slices/charactersSlice';
import { RootState } from '../store/store';
// import { Character } from '../models/character';

export function useCharacters() {
  const { characters } = useSelector(
    (state: RootState) => state.charactersState
  );
  const dispatch = useDispatch();

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      // Asíncrona
      const loadedNotes = await repo.getCharacters();
      // Síncrono
      dispatch(ac.load(loadedNotes));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [repo]);

  // const addNote = async (note: Partial<Note>) => {
  //   try {
  //     // Asíncrona -> API
  //     const newNote = await repo.createNote(note);
  //     // Síncrono -> Vista
  //     dispatch(ac.create(newNote));
  //   } catch (error) {
  //     console.log((error as Error).message);
  //   }
  // };

  // const updateNote = async (id: Note['id'], note: Partial<Note>) => {
  //   try {
  //     // Asíncrona -> API
  //     const updatedNote = await repo.updateNote(id, note);
  //     // Síncrono -> Vista

  //     // setNotes(
  //     //   notes.map((item) => (item.id === updatedNote.id ? updatedNote : item))
  //     // );
  //     dispatch(ac.update(updatedNote));
  //   } catch (error) {
  //     console.log((error as Error).message);
  //   }
  // };

  // const deleteNote = async (id: Note['id']) => {
  //   try {
  //     // Asíncrona -> API
  //     await repo.deleteNote(id);
  //     // Síncrono -> Vista
  //     // setNotes(notes.filter((item) => item.id !== id));
  //     dispatch(ac.deleteActionCreator(id));
  //   } catch (error) {
  //     console.log((error as Error).message);
  //   }

  return {
    loadCharacters,
    characters,
  };
}
