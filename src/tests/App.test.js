import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o Componente APP', () => {
  it('O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const textHome = screen.getAllByRole('link', { name: /Home/i });
    expect(textHome).toBeDefined();
  });

  it('O segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const textAbout = screen.getAllByRole('link', { name: /About/i });
    expect(textAbout).toBeDefined();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const textFavotites = screen.getAllByRole('link', { name: /Favorite Pokémons/i });
    expect(textFavotites).toBeDefined();
  });

  it(`Aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorites).toBeInTheDocument();
    userEvent.click(linkFavorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Aplicação é redirecionada para a página Not Found ao
    entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');
    const notFoundTitle = screen.getByText('Page requested not found');
    expect(notFoundTitle).toBeInTheDocument();
  });
});
