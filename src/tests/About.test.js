import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const infoPokedex = screen.getAllByText(/p/);
    expect(infoPokedex[0]).toHaveTextContent('This application simulates a Pokédex');
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const infoPokedex = screen.getAllByText(/p/);
    expect(infoPokedex).toHaveLength(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imgPokedex).toHaveAttribute('alt', 'Pokédex');
  });
});
