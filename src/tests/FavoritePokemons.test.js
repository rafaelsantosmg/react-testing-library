import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { pokemonTest } from '../services/pokemonTest';
import FavoritePokemons from '../components/FavoritePokemons';
import Pokemon from '../components/Pokemon';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
    se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/4');
    const inputDetail = screen.getByRole('checkbox', { checked: false });
    userEvent.click(inputDetail);
    expect(inputDetail).toBeChecked();
    history.push('/favorites');
    renderWithRouter(<Pokemon
      pokemon={ pokemonTest }
      showDetailsLink={ false }
      isFavorite={ pokemonTest.isFavorite }
    />);
    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon[0]).toHaveTextContent('Charmander');
  });
});
