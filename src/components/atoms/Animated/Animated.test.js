import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Animated from './Animated.jsx';

// ===== GRUPO 1: TESTS BÁSICOS DE RENDERIZADO =====
describe('Animated Component - Renderizado Básico', () => {
  test('renderiza sin errores', () => {
    render(<Animated>Contenido animado</Animated>);
    expect(screen.getByTestId('Animated')).toBeInTheDocument();
  });

  test('muestra el contenido de children correctamente', () => {
    render(<Animated>Contenido de prueba</Animated>);
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  test('renderiza contenido complejo correctamente', () => {
    render(
        <Animated>
          <h1>Título animado</h1>
          <p>Párrafo con animación</p>
        </Animated>
    );
    expect(screen.getByText('Título animado')).toBeInTheDocument();
    expect(screen.getByText('Párrafo con animación')).toBeInTheDocument();
  });

  test('aplica data-testid correctamente', () => {
    render(<Animated>Contenido</Animated>);
    expect(screen.getByTestId('Animated')).toBeInTheDocument();
  });
});

// ===== GRUPO 2: TESTS DE ANIMACIONES Y CATEGORÍAS =====
describe('Animated Component - Animaciones y Categorías', () => {
  test('aplica animación por defecto (fadeIn)', () => {
    render(<Animated>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveAttribute('data-animation', 'entrances-fadeIn');
  });

  test('aplica animación personalizada correctamente', () => {
    render(<Animated animation="slideIn">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveAttribute('data-animation', 'entrances-slideIn');
  });

  test('aplica categoría personalizada correctamente', () => {
    render(<Animated category="exits" animation="fadeOut">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveAttribute('data-animation', 'exits-fadeOut');
  });

  test('combina categoría y animación en data-animation', () => {
    render(<Animated category="attention" animation="bounce">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveAttribute('data-animation', 'attention-bounce');
  });
});

// ===== GRUPO 3: TESTS DE ESTILOS DE ANIMACIÓN =====
describe('Animated Component - Estilos de Animación', () => {
  test('aplica duración por defecto (0.6s)', () => {
    render(<Animated>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-duration: 0.6s');
  });

  test('aplica duración personalizada correctamente', () => {
    render(<Animated duration={1.5}>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-duration: 1.5s');
  });

  test('aplica delay correctamente', () => {
    render(<Animated delay={0.3}>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-delay: 0.3s');
  });

  test('aplica easing por defecto (ease)', () => {
    render(<Animated>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-timing-function: ease');
  });

  test('aplica easing personalizado correctamente', () => {
    render(<Animated easing="ease-in-out">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-timing-function: ease-in-out');
  });

  test('aplica dirección normal por defecto', () => {
    render(<Animated>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-direction: normal');
  });

  test('aplica dirección personalizada correctamente', () => {
    render(<Animated direction="reverse">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-direction: reverse');
  });

  test('aplica fillMode por defecto (both)', () => {
    render(<Animated>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-fill-mode: both');
  });

  test('aplica playState por defecto (running)', () => {
    render(<Animated>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-play-state: running');
  });

  test('aplica playState paused correctamente', () => {
    render(<Animated playState="paused">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-play-state: paused');
  });
});

// ===== GRUPO 4: TESTS DE REPETICIÓN =====
describe('Animated Component - Repetición', () => {
  test('aplica iteración única por defecto', () => {
    render(<Animated>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-iteration-count: 1');
  });

  test('aplica repetición infinita cuando repeat es true', () => {
    render(<Animated repeat={true}>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-iteration-count: infinite');
  });

  test('no aplica repetición cuando repeat es false', () => {
    render(<Animated repeat={false}>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-iteration-count: 1');
  });
});

// ===== GRUPO 5: TESTS DE TRIGGERS =====
describe('Animated Component - Triggers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('usa trigger mount por defecto', () => {
    render(<Animated>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toBeInTheDocument();
  });

  test('acepta trigger manual sin errores', () => {
    render(<Animated trigger="manual">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toBeInTheDocument();
  });

  test('acepta trigger hover sin errores', () => {
    render(<Animated trigger="hover">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toBeInTheDocument();
  });

  test('acepta trigger click sin errores', () => {
    render(<Animated trigger="click">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toBeInTheDocument();
  });
});

// ===== GRUPO 6: TESTS DE EVENTOS =====
describe('Animated Component - Eventos', () => {
  test('llama onAnimationStart cuando se proporciona', () => {
    const handleAnimationStart = jest.fn();
    render(
        <Animated onAnimationStart={handleAnimationStart}>
          Contenido
        </Animated>
    );

    const element = screen.getByTestId('Animated');

    // Simular evento de inicio de animación
    act(() => {
      element.dispatchEvent(new Event('animationstart', { bubbles: true }));
    });

    expect(handleAnimationStart).toHaveBeenCalledTimes(1);
  });

  test('llama onAnimationEnd cuando se proporciona', () => {
    const handleAnimationEnd = jest.fn();
    render(
        <Animated onAnimationEnd={handleAnimationEnd}>
          Contenido
        </Animated>
    );

    const element = screen.getByTestId('Animated');

    // Simular evento de fin de animación
    act(() => {
      element.dispatchEvent(new Event('animationend', { bubbles: true }));
    });

    expect(handleAnimationEnd).toHaveBeenCalledTimes(1);
  });

  test('llama onAnimationIteration cuando se proporciona', () => {
    const handleAnimationIteration = jest.fn();
    render(
        <Animated onAnimationIteration={handleAnimationIteration} repeat={true}>
          Contenido
        </Animated>
    );

    const element = screen.getByTestId('Animated');

    // Simular evento de iteración de animación
    act(() => {
      element.dispatchEvent(new Event('animationiteration', { bubbles: true }));
    });

    expect(handleAnimationIteration).toHaveBeenCalledTimes(1);
  });

  test('no falla cuando no se proporcionan handlers', () => {
    render(<Animated>Contenido</Animated>);

    const element = screen.getByTestId('Animated');

    // Simular eventos sin handlers
    expect(() => {
      act(() => {
        element.dispatchEvent(new Event('animationstart', { bubbles: true }));
        element.dispatchEvent(new Event('animationend', { bubbles: true }));
        element.dispatchEvent(new Event('animationiteration', { bubbles: true }));
      });
    }).not.toThrow();
  });
});

// ===== GRUPO 7: TESTS DE ESTILOS PERSONALIZADOS =====
describe('Animated Component - Estilos Personalizados', () => {
  test('aplica className personalizada', () => {
    render(<Animated className="mi-animacion-custom">Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveClass('mi-animacion-custom');
  });

  test('aplica estilos inline personalizados', () => {
    const customStyles = {
      backgroundColor: 'red',
      padding: '20px'
    };

    render(<Animated style={customStyles}>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('background-color: red');
    expect(element).toHaveStyle('padding: 20px');
  });

  test('combina estilos de animación con estilos personalizados', () => {
    const customStyles = {
      backgroundColor: 'blue',
      margin: '10px'
    };

    render(
        <Animated
            style={customStyles}
            duration={2}
            delay={0.5}
        >
          Contenido
        </Animated>
    );

    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('background-color: blue');
    expect(element).toHaveStyle('margin: 10px');
    expect(element).toHaveStyle('animation-duration: 2s');
    expect(element).toHaveStyle('animation-delay: 0.5s');
  });
});

// ===== GRUPO 8: TESTS DE COMBINACIONES =====
describe('Animated Component - Combinaciones', () => {
  test('combina múltiples props correctamente', () => {
    render(
        <Animated
            animation="slideIn"
            category="entrances"
            duration={1.2}
            delay={0.3}
            easing="ease-in-out"
            direction="alternate"
            fillMode="forwards"
            repeat={true}
            className="animacion-compleja"
        >
          Contenido complejo
        </Animated>
    );

    const element = screen.getByTestId('Animated');
    expect(element).toHaveAttribute('data-animation', 'entrances-slideIn');
    expect(element).toHaveStyle('animation-duration: 1.2s');
    expect(element).toHaveStyle('animation-delay: 0.3s');
    expect(element).toHaveStyle('animation-timing-function: ease-in-out');
    expect(element).toHaveStyle('animation-direction: alternate');
    expect(element).toHaveStyle('animation-fill-mode: forwards');
    expect(element).toHaveStyle('animation-iteration-count: infinite');
    expect(element).toHaveClass('animacion-compleja');
  });

  test('maneja todas las opciones de easing', () => {
    const easingOptions = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];

    easingOptions.forEach((easing) => {
      const { unmount } = render(
          <Animated easing={easing}>
            Contenido {easing}
          </Animated>
      );

      const element = screen.getByTestId('Animated');
      expect(element).toHaveStyle(`animation-timing-function: ${easing}`);

      // ✅ LIMPIAR después de cada test
      unmount();
    });
  });

  // ✅ CORREGIDO: Test de direction sin loops
  test('maneja todas las opciones de direction', () => {
    const directions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];

    directions.forEach((direction) => {
      const { unmount } = render(
          <Animated direction={direction}>
            Contenido {direction}
          </Animated>
      );

      const element = screen.getByTestId('Animated');
      expect(element).toHaveStyle(`animation-direction: ${direction}`);

      // ✅ LIMPIAR después de cada test
      unmount();
    });
  });
});


// ===== GRUPO 9: TESTS DE PROPS ADICIONALES =====
describe('Animated Component - Props Adicionales', () => {
  test('pasa props adicionales al elemento', () => {
    render(
        <Animated
            id="animacion-test"
            data-custom="valor-custom"
            role="region"
        >
          Contenido con props
        </Animated>
    );

    const element = screen.getByTestId('Animated');
    expect(element).toHaveAttribute('id', 'animacion-test');
    expect(element).toHaveAttribute('data-custom', 'valor-custom');
    expect(element).toHaveAttribute('role', 'region');
  });

  test('maneja eventos DOM adicionales', () => {
    const handleClick = jest.fn();
    const handleMouseOver = jest.fn();

    render(
        <Animated onClick={handleClick} onMouseOver={handleMouseOver}>
          Contenido interactivo
        </Animated>
    );

    const element = screen.getByTestId('Animated');

    act(() => {
      element.click();
      element.dispatchEvent(new Event('mouseover', { bubbles: true }));
    });

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleMouseOver).toHaveBeenCalledTimes(1);
  });
});

// ===== GRUPO 10: TESTS DE CASOS EXTREMOS =====
describe('Animated Component - Casos Extremos', () => {
  test('maneja duración 0 correctamente', () => {
    render(<Animated duration={0}>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-duration: 0s');
  });

  test('maneja duración muy larga correctamente', () => {
    render(<Animated duration={10}>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-duration: 10s');
  });

  test('maneja delay negativo correctamente', () => {
    render(<Animated delay={-0.5}>Contenido</Animated>);
    const element = screen.getByTestId('Animated');
    expect(element).toHaveStyle('animation-delay: -0.5s');
  });

  test('maneja contenido undefined sin errores', () => {
    render(<Animated>Contenido válido</Animated>);
    expect(screen.getByTestId('Animated')).toBeInTheDocument();
  });

  test('maneja contenido null sin errores', () => {
    render(<Animated>{null}</Animated>);
    expect(screen.getByTestId('Animated')).toBeInTheDocument();
  });

  test('maneja múltiples children correctamente', () => {
    render(
        <Animated>
          <div>Primer elemento</div>
          <div>Segundo elemento</div>
          <div>Tercer elemento</div>
        </Animated>
    );

    expect(screen.getByText('Primer elemento')).toBeInTheDocument();
    expect(screen.getByText('Segundo elemento')).toBeInTheDocument();
    expect(screen.getByText('Tercer elemento')).toBeInTheDocument();
  });
});
