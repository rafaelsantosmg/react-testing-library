import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemonTest from './mockPokemon/pokemonTest';
import App from '../App';

const dataTestIdName = 'pokemon-name';

describe(`Teste se é renderizado um card com as
informações de determinado pokémon.`, () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonTest[0] }
      isFavorite={ pokemonTest[0].id }
    />);
    const pokemonName = screen.getByTestId(dataTestIdName);
    expect(pokemonName).toHaveTextContent(pokemonTest[0].name);
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonTest[0] }
      isFavorite={ pokemonTest[0].id }
    />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Fire');
  });

  it('O peso médio do pokémon deve ser exibido', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonTest[0] }
      isFavorite={ pokemonTest[0].id }
    />);
    const { value, measurementUnit } = pokemonTest[0].averageWeight;
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonTest[0] }
      isFavorite={ pokemonTest[0].id }
    />);
    const pokemonImg = screen.getByRole('img', { name: `${pokemonTest[0].name} sprite` });
    expect(pokemonImg).toBeDefined();
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
});

describe('Teste de Link de Navegação', () => {
  it(`Teste se o card do Pokémon indicado na Pokédex contém um link de navegação
  para exibir detalhes deste Pokémon.`, () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonTest[0] }
      isFavorite={ pokemonTest[0].id }
    />);
    const linkPokemon = screen.getByRole('link', {
      name: 'More details',
    });
    expect(linkPokemon).toHaveAttribute('href', `/pokemons/${pokemonTest[0].id}`);
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento
  da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkPokemon = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkPokemon);
    const title = screen.getByText(/Pikachu Details/i);
    expect(title).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it(`O ícone deve ser uma imagem com o atributo src contendo o caminho
  /star-icon.svg;`, () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonTest[0] }
      isFavorite
    />);
    const icon = screen.getByRole('img', {
      name: `${pokemonTest[0].name} is marked as favorite`,
    });
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
  });
});
