import { cleanup, render, screen } from '@testing-library/react';
import PriceRange from '@/pages/adverts/components/price-range';
import { afterEach, expect, vi } from 'vitest'; // Importa vitest y su API

// Después de cada prueba, realiza la limpieza (como lo has configurado)
afterEach(() => {
  cleanup();
});

describe('PriceRange Component', () => {
  test('should match the snapshot', () => {
    const mockOnValueChange = vi.fn(); // Utiliza vi.fn() en lugar de jest.fn()

    // Renderiza el componente con valores de prueba
    const { asFragment } = render(
      <PriceRange min={10} max={100} onValueChange={mockOnValueChange} />
    );
    
    // Compara el fragmento renderizado con el snapshot
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display the correct price range', () => {
    render(<PriceRange min={10} max={100} onValueChange={() => {}} />);
    
    // Verifica que el rango de precios se muestre correctamente
    expect(screen.getByText('Price range (10 - 100)')).toBeInTheDocument();
  });
});