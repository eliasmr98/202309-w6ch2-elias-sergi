import { useEffect } from 'react';
import { Card } from '../card/card';
import { useCharacters } from '../../hooks/use.characters';
import '../../main.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function List() {
  const { characters } = useSelector(
    (state: RootState) => state.charactersState
  );
  const { loadCharacters } = useCharacters();

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  return (
    <ul className="characters-list row list-unstyled">
      {characters.map((item) => (
        <Card key={item.name} character={item}></Card>
      ))}
    </ul>
  );
}
