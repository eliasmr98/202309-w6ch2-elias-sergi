import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { Card } from './card';
import { useCharacters } from '../../hooks/use.characters';
import { AnyCharacter } from '../../models/character';
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../../slices/characters.slice';

jest.mock('../../hooks/use.characters');

describe('Given Card component', () => {
  describe('When we render it', () => {
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
    const character = {
      id: 1,
      name: 'jeoffrey',
      isAlive: true,
      category: 'king',
    } as AnyCharacter;
    const updateCharacter = jest.fn();
    (useCharacters as jest.Mock).mockReturnValue({ updateCharacter });

    render(
      <Provider store={mockStore}>
        <Card character={character}></Card>
      </Provider>
    );
    test('Then it should be in the document', () => {
      const element = screen.getByText('jeoffrey');
      expect(element).toBeInTheDocument();
    });
  });
});
