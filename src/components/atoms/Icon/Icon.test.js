import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from './Icon.jsx';

// Mock FontAwesome para evitar errores en tests
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className, title }) => (
      <span
          data-testid="font-awesome-icon"
          className={className}
          title={title}
      >
            {Array.isArray(icon) ? icon[1] : icon}
        </span>
  )
}));

describe('Icon Component', () => {
  // ===== TESTS BÁSICOS =====
  test('renders without crashing', () => {
    render(<Icon />);
    expect(screen.getByTestId('Icon')).toBeInTheDocument();
  });

  test('renders default icon when no props provided', () => {
    render(<Icon />);
    expect(screen.getByTestId('Icon')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
  });

  // ===== TESTS DE FONTAWESOME =====
  test('renders FontAwesome icon correctly', () => {
    render(<Icon name="heart" />);
    expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument();
    expect(screen.getByText('heart')).toBeInTheDocument();
  });

  test('renders FontAwesome icon with specific type', () => {
    render(<Icon name="heart" type="far" />);
    expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument();
  });

  test('renders FontAwesome icon with array format', () => {
    render(<Icon icon={['fab', 'github']} />);
    expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument();
    expect(screen.getByText('github')).toBeInTheDocument();
  });

  // ===== TESTS DE EMOJI =====
  test('renders emoji icon correctly', () => {
    render(<Icon emoji="🚀" />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'emoji');
  });

  test('emoji icon has correct accessibility attributes', () => {
    render(<Icon emoji="❤️" ariaLabel="Love" />);
    const emojiElement = screen.getByText('❤️');
    expect(emojiElement).toHaveAttribute('role', 'img');
    expect(emojiElement).toHaveAttribute('aria-label', 'Love');
  });

  // ===== TESTS DE SVG =====
  test('renders SVG data correctly', () => {
    const svgData = 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=';
    render(<Icon svgData={svgData} alt="Custom SVG" />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', svgData);
    expect(imgElement).toHaveAttribute('alt', 'Custom SVG');
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'svgData');
  });

  test('renders custom SVG correctly', () => {
    const svgContent = '<svg><circle r="10"/></svg>';
    render(<Icon svg={svgContent} />);
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'svg');
  });

  // ===== TESTS DE IMAGEN =====
  test('renders image icon correctly', () => {
    render(<Icon src="/test-icon.png" alt="Test icon" />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', '/test-icon.png');
    expect(imgElement).toHaveAttribute('alt', 'Test icon');
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'image');
  });

  // ===== TESTS DE UNICODE =====
  test('renders unicode icon correctly', () => {
    render(<Icon unicode={9733} />); // ★
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'unicode');
  });

  // ===== TESTS DE TAMAÑOS =====
  test('applies different sizes correctly', () => {
    const { rerender } = render(<Icon name="heart" size="xs" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-xs');

    rerender(<Icon name="heart" size="small" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-sm');

    rerender(<Icon name="heart" size="medium" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-md');

    rerender(<Icon name="heart" size="large" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-lg');

    rerender(<Icon name="heart" size="xlarge" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-xl');

    rerender(<Icon name="heart" size="2x" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-2x');

    rerender(<Icon name="heart" size="3x" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-3x');
  });

  // ===== TESTS DE VARIANTES =====
  test('applies different variants correctly', () => {
    const { rerender } = render(<Icon name="heart" variant="default" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-default');

    rerender(<Icon name="heart" variant="primary" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-primary');

    rerender(<Icon name="heart" variant="success" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-success');

    rerender(<Icon name="heart" variant="warning" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-warning');

    rerender(<Icon name="heart" variant="error" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-error');

    rerender(<Icon name="heart" variant="info" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-info');

    rerender(<Icon name="heart" variant="muted" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-muted');

    rerender(<Icon name="heart" variant="inverse" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-inverse');
  });

  // ===== TESTS DE ESTADOS =====
  test('renders loading state correctly', () => {
    render(<Icon loading={true} />);
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'loading');
    expect(screen.getByTestId('Icon')).toHaveClass('icon-loading');
  });

  test('applies disabled state correctly', () => {
    render(<Icon name="heart" disabled={true} />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-disabled');
  });

  // ===== TESTS DE INTERACCIÓN =====
  test('handles click events when not disabled', () => {
    const handleClick = jest.fn();
    render(<Icon name="heart" onClick={handleClick} />);

    fireEvent.click(screen.getByTestId('Icon'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not handle click events when disabled', () => {
    const handleClick = jest.fn();
    render(<Icon name="heart" onClick={handleClick} disabled={true} />);

    fireEvent.click(screen.getByTestId('Icon'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('handles mouse enter and leave events', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    render(
        <Icon
            name="heart"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    );

    const iconElement = screen.getByTestId('Icon');

    fireEvent.mouseEnter(iconElement);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);

    fireEvent.mouseLeave(iconElement);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });

  // ===== TESTS DE ESTILOS PERSONALIZADOS =====
  test('applies custom color correctly', () => {
    render(<Icon name="heart" color="#ff0000" />);
    const iconElement = screen.getByTestId('Icon');
    expect(iconElement).toHaveStyle('color: #ff0000');
  });

  test('applies custom className', () => {
    render(<Icon name="heart" className="custom-class" />);
    expect(screen.getByTestId('Icon')).toHaveClass('custom-class');
  });

  test('applies custom styles', () => {
    const customStyle = { marginTop: '10px' };
    render(<Icon name="heart" style={customStyle} />);
    expect(screen.getByTestId('Icon')).toHaveStyle('margin-top: 10px');
  });

  // ===== TESTS DE ACCESIBILIDAD =====
  test('has proper accessibility attributes', () => {
    render(<Icon name="heart" ariaLabel="Love icon" title="Heart" />);
    const iconElement = screen.getByTestId('Icon');

    expect(iconElement).toHaveAttribute('role', 'img');
    expect(iconElement).toHaveAttribute('aria-label', 'Love icon');
    expect(iconElement).toHaveAttribute('title', 'Heart');
  });

  test('has default role when not specified', () => {
    render(<Icon name="heart" />);
    expect(screen.getByTestId('Icon')).toHaveAttribute('role', 'img');
  });

  // ===== TESTS DE PROPS ADICIONALES =====
  test('passes through additional props', () => {
    render(<Icon name="heart" data-custom="value" id="icon-id" />);
    const iconElement = screen.getByTestId('Icon');

    expect(iconElement).toHaveAttribute('data-custom', 'value');
    expect(iconElement).toHaveAttribute('id', 'icon-id');
  });

  // ===== TESTS DE EDGE CASES =====
  test('handles empty props gracefully', () => {
    render(<Icon />);
    expect(screen.getByTestId('Icon')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument(); // Default icon
  });

  test('handles invalid size gracefully', () => {
    render(<Icon name="heart" size="invalid" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-md'); // Default to medium
  });

  test('handles invalid variant gracefully', () => {
    render(<Icon name="heart" variant="invalid" />);
    expect(screen.getByTestId('Icon')).toHaveClass('icon-invalid'); // Apply as-is
  });

  test('handles null/undefined props gracefully', () => {
    render(<Icon name={null} emoji={undefined} />);
    expect(screen.getByTestId('Icon')).toBeInTheDocument();
  });

  // ===== TESTS DE COMBINACIONES COMPLEJAS =====
  test('handles complex combinations of props', () => {
    render(
        <Icon
            name="heart"
            type="fas"
            size="large"
            variant="error"
            color="#ff0000"
            className="custom-class"
            onClick={() => {}}
            ariaLabel="Love"
            title="Heart icon"
            disabled={false}
        />
    );

    const iconElement = screen.getByTestId('Icon');
    expect(iconElement).toHaveClass('icon-lg');
    expect(iconElement).toHaveClass('icon-error');
    expect(iconElement).toHaveClass('custom-class');
    expect(iconElement).toHaveAttribute('aria-label', 'Love');
    expect(iconElement).toHaveAttribute('title', 'Heart icon');
    expect(iconElement).toHaveStyle('color: #ff0000');
  });

  // ===== TESTS DE TIPOS DE ICONOS =====
  test('prioritizes icon types correctly', () => {
    // Loading tiene prioridad sobre t-odo
    const { rerender } = render(<Icon loading={true} emoji="🚀" name="heart" />);
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'loading');

    // Emoji tiene prioridad sobre FontAwesome
    rerender(<Icon emoji="🚀" name="heart" />);
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'emoji');

    // SVG data tiene prioridad sobre emoji
    rerender(<Icon svgData="data:image/svg+xml;base64,test" emoji="🚀" />);
    expect(screen.getByTestId('Icon')).toHaveAttribute('data-icon-type', 'svgData');
  });
});
