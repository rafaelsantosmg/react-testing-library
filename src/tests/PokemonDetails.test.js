import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { pokemonTest } from '../services/pokemonTest';
import PokemonDetails from '../components/PokemonDetails';

beforeEach(() => {
  renderWithRouter(<PokemonDetails
    pokemons={ pokemonTest }
    match={ { params: { id: '4' } } }
    isPokemonFavoriteById={ { [pokemonTest[0].id]: true } }
    onUpdateFavoritePokemons={ () => true }
  />);
});

describe(`Teste se as informações detalhadas do Pokémon selecionado
são mostradas na tela.`, () => {
  it(`A página deve conter um texto <name> Details,
  onde <name> é o nome do Pokémon.`, () => {
    const namePokemon = screen.getByText(`${pokemonTest[0].name} Details`);
    expect(namePokemon).toBeInTheDocument();
  });

  it(`Não deve existir o link de navegação para os detalhes
  do Pokémon selecionado.`, () => {
    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    const title = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(title).toBeInTheDocument();
  });

  it(`A seção de detalhes deve conter um parágrafo com o resumo do Pokémon
  específico sendo visualizado.`, () => {
    const paragrafh = screen
      .getByText(/The flame on its tail shows the strength of its life force. If it is/i);
    expect(paragrafh).toBeInTheDocument();
  });
});

describe(`Teste se existe na página uma seção com os mapas contendo as
localizações do pokémon`, () => {
  it(`Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of
  <name> onde <name> é o nome do Pokémon exibido.`, () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemonTest[0].name}`,
    });
    expect(title).toBeInTheDocument();
  });

  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes.', () => {
    pokemonTest[0].foundAt.forEach((found, index) => {
      const locations = screen.getAllByRole('img', {
        name: `${pokemonTest[0].name} location`,
      });
      expect(locations).toBeDefined();
      const nameLocation = screen.getByText(found.location);
      expect(nameLocation).toBeInTheDocument();
      const imgMap = screen.getAllByRole('img', {
        name: `${pokemonTest[0].name} location`,
      });
      expect(imgMap[index]).toBeDefined();
      expect(imgMap[index]).toHaveAttribute('src', `${found.map}`);
    });
  });

  it(`Teste se o usuário pode favoritar um pokémon através da página de 
  detalhes.`, () => {
    const favoritePokemon = [];
    const isCheked = screen.getByRole('checkbox');
    expect(isCheked).toBeInTheDocument();
    userEvent.click(isCheked);
    favoritePokemon.push(pokemonTest[0]);
    expect(favoritePokemon).toHaveLength(1);
    userEvent.click(isCheked);
    favoritePokemon.pop();
    expect(favoritePokemon).toHaveLength(0);
    const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(labelFavorite).toBeInTheDocument();
  });
});
