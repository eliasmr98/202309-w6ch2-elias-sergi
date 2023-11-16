import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './list';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../../slices/characters.slice';
import { AnyCharacter } from '../../models/character';
import { useCharacters } from '../../hooks/use.characters';

jest.mock('../../hooks/use.characters');

describe('Given List component ', () => {
  describe('When we render it and characterState is idle', () => {
    const mockStore = configureStore({
      reducer: {
        charactersState: charactersReducer,
      },
      preloadedState: {
        charactersState: {
          characters: [{ id: 1 } as AnyCharacter],
          charactersState: 'idle',
        },
      },
    });

    const loadCharacters = jest.fn();
    (useCharacters as jest.Mock).mockReturnValue({
      loadCharacters,
    });

    render(
      <Provider store={mockStore}>
        <List></List>
      </Provider>
    );
    test('Then it should be in the document', () => {
      const listElement = screen.getAllByRole('list')[0];
      expect(listElement).toBeInTheDocument();
      expect(loadCharacters).toHaveBeenCalled();
    });
  });
});
