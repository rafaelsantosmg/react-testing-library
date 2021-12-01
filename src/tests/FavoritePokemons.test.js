import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import App from '../App';
import { Pokemon } from '../components';

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
      pokemon={ pokemons[1] }
      showDetailsLink={ false }
      isFavorite
    />);
    const namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon[0]).toHaveTextContent('Charmander');
  });
});
