import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import { pokemonTest } from '../services/pokemonTest';

const dataTestIdName = 'pokemon-name';

beforeEach(() => {
  renderWithRouter(<Pokedex
    pokemons={ pokemonTest }
    isPokemonFavoriteById={ { [pokemonTest.id]: true } }
  />);
});

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const title = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(title).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.`, () => {
    const pokemonName = screen.getByTestId(dataTestIdName);
    expect(pokemonName).toHaveTextContent(pokemonTest[0].name);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeDefined();
    userEvent.click(button);
    expect(pokemonName).toHaveTextContent(pokemonTest[1].name);
    userEvent.click(button);
    expect(pokemonName).toHaveTextContent(pokemonTest[0].name);
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonImg = screen.getAllByRole('img');
    expect(pokemonImg).toHaveLength(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it(`Deve existir um botão de filtragem para cada tipo de Pokémon,
  sem repetição.`, () => {
    pokemonTest.forEach((pokemon) => {
      const filterButton = screen.getByRole('button', { name: pokemon.type });
      expect(filterButton).toHaveTextContent(pokemon.type);
    });
  });

  it(`A partir da seleção de um botão de tipo, a Pokédex deve circular somente
  pelos pokémons daquele tipo;`, () => {
    const filterButton = screen.getByRole('button', { name: 'Fire' });
    expect(filterButton).toBeInTheDocument();
    userEvent.click(filterButton);
    const pokemonName = screen.getByTestId(dataTestIdName);
    expect(pokemonName).toHaveTextContent(pokemonTest[0].name);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeDefined();
    userEvent.click(button);
    expect(pokemonName).toHaveTextContent(pokemonTest[0].name);
    userEvent.click(button);
    expect(pokemonName).toHaveTextContent(pokemonTest[0].name);
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic;', () => {
    const button = screen.getByRole('button', { name: 'Fire' });
    expect(button).toHaveTextContent('Fire');
  });

  it('O botão All precisa estar sempre visível.', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All;', () => {
    const allButton = screen.getAllByTestId('pokemon-type-button');
    expect(allButton).toBeDefined();
  });

  it(`A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros)
  quando o botão All for clicado;`, () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    const pokemonName = screen.getByTestId(dataTestIdName);
    expect(pokemonName).toHaveTextContent(pokemonTest[0].name);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeDefined();
    userEvent.click(button);
    expect(pokemonName).toHaveTextContent(pokemonTest[1].name);
    userEvent.click(button);
    expect(pokemonName).toHaveTextContent(pokemonTest[0].name);
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All;', () => {
    expect(pokemonTest).toHaveLength(2);
  });
});
