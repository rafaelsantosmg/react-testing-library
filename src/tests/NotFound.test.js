import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole(
      'heading', { level: 2, name: /Page requested not found/i },
    );
    expect(title).toHaveTextContent('Page requested not found');
  });

  it('Teste se página mostra a imagem.', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
