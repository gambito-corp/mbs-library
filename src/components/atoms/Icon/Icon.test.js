// Mocks arriba del todo
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props) => <span data-testid="fontawesome-icon">{JSON.stringify(props.icon)}</span>
}));

jest.mock('./Icon.utils', () => ({
  ...jest.requireActual('./Icon.utils'),
  renderCustomIcon: jest.fn(() => <svg data-testid="custom-svg"></svg>)
}));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from './Icon';



// ===== GRUPO 1: RENDERIZADO BÁSICO =====
describe('Icon Component - Renderizado Básico', () => {
  test('renderiza un icono por defecto', () => {
    render(<Icon data-testid="icon-default" />);
    expect(screen.getByTestId('icon-default')).toBeInTheDocument();
  });

  test('renderiza FontAwesome por nombre', () => {
    render(<Icon name="home" data-testid="icon-fa" />);
    expect(screen.getByTestId('fontawesome-icon')).toBeInTheDocument();
  });
});

// ===== GRUPO 2: TIPOS DE ICONOS =====
describe('Icon Component - Tipos de Icono', () => {
  test('renderiza emoji', () => {
    render(<Icon emoji="🔥" data-testid="icon-emoji" />);
    expect(screen.getByTestId('icon-emoji')).toHaveTextContent('🔥');
  });

  test('renderiza SVG custom', () => {
    const svgString = '<svg width="10" height="10"><circle cx="5" cy="5" r="5" /></svg>';
    render(<Icon svg={svgString} data-testid="icon-svg" />);
    expect(screen.getByTestId('custom-svg')).toBeInTheDocument();
  });

});

// ===== GRUPO 3: INTERACCIÓN Y ESTADOS =====
describe('Icon Component - Interacción', () => {
  test('maneja clicks', () => {
    const handleClick = jest.fn();
    render(<Icon onClick={handleClick} data-testid="icon-click" />);
    fireEvent.click(screen.getByTestId('icon-click'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('no permite clicks cuando está deshabilitado', () => {
    const handleClick = jest.fn();
    render(<Icon disabled onClick={handleClick} data-testid="icon-disabled" />);
    fireEvent.click(screen.getByTestId('icon-disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

// ===== GRUPO 4: ACCESIBILIDAD =====
describe('Icon Component - Accesibilidad', () => {
  test('tiene aria-label', () => {
    render(<Icon ariaLabel="Ícono de búsqueda" data-testid="icon-aria" />);
    expect(screen.getByTestId('icon-aria')).toHaveAttribute('aria-label', 'Ícono de búsqueda');
  });
});

// ===== GRUPO 5: PROPS DE ESTILO =====
describe('Icon Component - Estilos', () => {
  test('aplica tamaño large', () => {
    render(<Icon size="large" data-testid="icon-size" />);
    expect(screen.getByTestId('icon-size')).toHaveClass('icon-lg');
  });

  test('aplica color primary', () => {
    render(<Icon variant="primary" data-testid="icon-color" />);
    expect(screen.getByTestId('icon-color')).toHaveClass('icon-primary');
  });
});
