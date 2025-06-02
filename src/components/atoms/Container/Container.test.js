import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from './Container.jsx';

// ===== GRUPO 1: TESTS BÁSICOS DE RENDERIZADO =====
describe('Container Component - Renderizado Básico', () => {
  test('renderiza sin errores', () => {
    render(<Container>Contenido de prueba</Container>);
    expect(screen.getByTestId('Container')).toBeInTheDocument();
  });

  test('muestra el contenido de children correctamente', () => {
    render(<Container>Contenido del container</Container>);
    expect(screen.getByText('Contenido del container')).toBeInTheDocument();
  });

  test('renderiza contenido vacío sin errores', () => {
    render(<Container></Container>);
    const element = screen.getByTestId('Container');
    expect(element).toBeInTheDocument();
    expect(element).toBeEmptyDOMElement();
  });

  test('maneja contenido complejo correctamente', () => {
    render(
        <Container>
          <h1>Título</h1>
          <p>Párrafo de contenido</p>
        </Container>
    );
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Párrafo de contenido')).toBeInTheDocument();
  });
});

// ===== GRUPO 2: TESTS DE VARIANTES =====
describe('Container Component - Variantes', () => {
  test('aplica la variante por defecto', () => {
    render(<Container>Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container');
    expect(screen.getByTestId('Container')).not.toHaveClass('container--card');
  });

  test('aplica variante card correctamente', () => {
    render(<Container variant="card">Contenido card</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--card');
  });

  test('aplica variante panel correctamente', () => {
    render(<Container variant="panel">Contenido panel</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--panel');
  });

  test('aplica variante hero correctamente', () => {
    render(<Container variant="hero">Contenido hero</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--hero');
  });

  test('aplica variante sidebar correctamente', () => {
    render(<Container variant="sidebar">Contenido sidebar</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--sidebar');
  });

  test('aplica variante modal correctamente', () => {
    render(<Container variant="modal">Contenido modal</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--modal');
  });
});

// ===== GRUPO 3: TESTS DE TAMAÑOS =====
describe('Container Component - Tamaños', () => {
  test('aplica tamaño por defecto (medium)', () => {
    render(<Container>Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container');
    expect(screen.getByTestId('Container')).not.toHaveClass('container--small');
  });

  test('aplica tamaño xs correctamente', () => {
    render(<Container size="xs">Contenido XS</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--xs');
  });

  test('aplica tamaño small correctamente', () => {
    render(<Container size="small">Contenido pequeño</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--small');
  });

  test('aplica tamaño large correctamente', () => {
    render(<Container size="large">Contenido grande</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--large');
  });

  test('aplica tamaño xlarge correctamente', () => {
    render(<Container size="xlarge">Contenido XL</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--xlarge');
  });

  test('aplica tamaño full correctamente', () => {
    render(<Container size="full">Contenido completo</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--full');
  });
});

// ===== GRUPO 4: TESTS DE ANCHO MÁXIMO =====
describe('Container Component - Ancho Máximo', () => {
  test('aplica maxWidth por defecto (full)', () => {
    render(<Container>Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container');
    expect(screen.getByTestId('Container')).not.toHaveClass('container--max-lg');
  });

  test('aplica maxWidth xs correctamente', () => {
    render(<Container maxWidth="xs">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--max-xs');
  });

  test('aplica maxWidth md correctamente', () => {
    render(<Container maxWidth="md">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--max-md');
  });

  test('aplica maxWidth lg correctamente', () => {
    render(<Container maxWidth="lg">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--max-lg');
  });

  test('aplica maxWidth none correctamente', () => {
    render(<Container maxWidth="none">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--max-none');
  });
});

// ===== GRUPO 5: TESTS DE ESPACIADO =====
describe('Container Component - Espaciado', () => {
  test('aplica padding por defecto (medium)', () => {
    render(<Container>Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container');
    expect(screen.getByTestId('Container')).not.toHaveClass('container--padding-large');
  });

  test('aplica padding none correctamente', () => {
    render(<Container padding="none">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--padding-none');
  });

  test('aplica padding small correctamente', () => {
    render(<Container padding="small">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--padding-small');
  });

  test('aplica padding large correctamente', () => {
    render(<Container padding="large">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--padding-large');
  });

  test('aplica padding xlarge correctamente', () => {
    render(<Container padding="xlarge">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--padding-xlarge');
  });

  test('aplica margin auto correctamente', () => {
    render(<Container margin="auto">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--margin-auto');
  });

  test('aplica margin large correctamente', () => {
    render(<Container margin="large">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--margin-large');
  });
});

// ===== GRUPO 6: TESTS DE ESTADOS =====
describe('Container Component - Estados', () => {
  test('aplica centrado cuando centered es true', () => {
    render(<Container centered={true}>Contenido centrado</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--centered');
  });

  test('no aplica centrado cuando centered es false', () => {
    render(<Container centered={false}>Contenido</Container>);
    expect(screen.getByTestId('Container')).not.toHaveClass('container--centered');
  });

  test('aplica fluid cuando fluid es true', () => {
    render(<Container fluid={true}>Contenido fluido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--fluid');
  });

  test('aplica fitContent cuando fitContent es true', () => {
    render(<Container fitContent={true}>Contenido ajustado</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--fit-content');
  });

  test('combina centered y fitContent correctamente', () => {
    render(<Container centered={true} fitContent={true}>Contenido</Container>);
    const element = screen.getByTestId('Container');
    expect(element).toHaveClass('container--centered');
    expect(element).toHaveClass('container--fit-content');
  });
});

// ===== GRUPO 7: TESTS DE EFECTOS VISUALES =====
describe('Container Component - Efectos Visuales', () => {
  test('aplica sombra sm correctamente', () => {
    render(<Container shadow="sm">Contenido con sombra</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--shadow-sm');
  });

  test('aplica sombra lg correctamente', () => {
    render(<Container shadow="lg">Contenido con sombra</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--shadow-lg');
  });

  test('aplica borde sm correctamente', () => {
    render(<Container border="sm">Contenido con borde</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--border-sm');
  });

  test('aplica borde dashed correctamente', () => {
    render(<Container border="dashed">Contenido con borde</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--border-dashed');
  });

  test('aplica bordes redondeados md correctamente', () => {
    render(<Container rounded="md">Contenido redondeado</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--rounded-md');
  });

  test('aplica bordes redondeados full correctamente', () => {
    render(<Container rounded="full">Contenido circular</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--rounded-full');
  });
});

// ===== GRUPO 8: TESTS DE FONDOS =====
describe('Container Component - Fondos', () => {
  test('aplica fondo por defecto (transparent)', () => {
    render(<Container>Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container');
    expect(screen.getByTestId('Container')).not.toHaveClass('container--bg-white');
  });

  test('aplica fondo white correctamente', () => {
    render(<Container background="white">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--bg-white');
  });

  test('aplica fondo gray correctamente', () => {
    render(<Container background="gray">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--bg-gray');
  });

  test('aplica fondo primary correctamente', () => {
    render(<Container background="primary">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--bg-primary');
  });

  test('aplica fondo secondary correctamente', () => {
    render(<Container background="secondary">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--bg-secondary');
  });

  test('aplica fondo accent correctamente', () => {
    render(<Container background="accent">Contenido</Container>);
    expect(screen.getByTestId('Container')).toHaveClass('container--bg-accent');
  });
});

// ===== GRUPO 9: TESTS DE ELEMENTOS HTML =====
describe('Container Component - Elementos HTML', () => {
  test('renderiza como div por defecto', () => {
    render(<Container>Contenido</Container>);
    expect(screen.getByTestId('Container').tagName).toBe('DIV');
  });

  test('renderiza como section cuando se especifica', () => {
    render(<Container as="section">Contenido de sección</Container>);
    // Solo verificar que el tagName es correcto
    expect(screen.getByTestId('Container').tagName).toBe('SECTION');
    expect(screen.getByText('Contenido de sección')).toBeInTheDocument();
  });

  test('renderiza como article cuando se especifica', () => {
    render(<Container as="article">Contenido de artículo</Container>);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByTestId('Container').tagName).toBe('ARTICLE');
  });

  test('renderiza como main cuando se especifica', () => {
    render(<Container as="main">Contenido principal</Container>);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('Container').tagName).toBe('MAIN');
  });

  test('renderiza como header cuando se especifica', () => {
    render(<Container as="header">Contenido de header</Container>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByTestId('Container').tagName).toBe('HEADER');
  });

  test('renderiza como footer cuando se especifica', () => {
    render(<Container as="footer">Contenido de footer</Container>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByTestId('Container').tagName).toBe('FOOTER');
  });

  test('renderiza como nav cuando se especifica', () => {
    render(<Container as="nav">Navegación</Container>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('Container').tagName).toBe('NAV');
  });

  test('renderiza como aside cuando se especifica', () => {
    render(<Container as="aside">Contenido lateral</Container>);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByTestId('Container').tagName).toBe('ASIDE');
  });
});

// ===== GRUPO 10: TESTS DE COMBINACIONES =====
describe('Container Component - Combinaciones', () => {
  test('combina múltiples props correctamente', () => {
    render(
        <Container
            variant="card"
            size="large"
            padding="xlarge"
            shadow="lg"
            rounded="xl"
            centered={true}
            className="custom-class"
        >
          Contenido complejo
        </Container>
    );

    const element = screen.getByTestId('Container');
    expect(element).toHaveClass('container');
    expect(element).toHaveClass('container--card');
    expect(element).toHaveClass('container--large');
    expect(element).toHaveClass('container--padding-xlarge');
    expect(element).toHaveClass('container--shadow-lg');
    expect(element).toHaveClass('container--rounded-xl');
    expect(element).toHaveClass('container--centered');
    expect(element).toHaveClass('custom-class');
  });

  test('combina variante hero con padding y centrado', () => {
    render(
        <Container variant="hero" padding="xlarge" centered={true}>
          Sección héroe
        </Container>
    );

    const element = screen.getByTestId('Container');
    expect(element).toHaveClass('container--hero');
    expect(element).toHaveClass('container--padding-xlarge');
    expect(element).toHaveClass('container--centered');
  });

  test('combina modal con sombra y bordes redondeados', () => {
    render(
        <Container variant="modal" shadow="2xl" rounded="xl" maxWidth="md">
          Contenido modal
        </Container>
    );

    const element = screen.getByTestId('Container');
    expect(element).toHaveClass('container--modal');
    expect(element).toHaveClass('container--shadow-2xl');
    expect(element).toHaveClass('container--rounded-xl');
    expect(element).toHaveClass('container--max-md');
  });

  test('combina fluid con background y padding', () => {
    render(
        <Container fluid={true} background="primary" padding="large">
          Contenido fluido
        </Container>
    );

    const element = screen.getByTestId('Container');
    expect(element).toHaveClass('container--fluid');
    expect(element).toHaveClass('container--bg-primary');
    expect(element).toHaveClass('container--padding-large');
  });
});

// ===== GRUPO 11: TESTS DE PROPS ADICIONALES =====
describe('Container Component - Props Adicionales', () => {
  test('pasa props adicionales al elemento', () => {
    render(
        <Container
            id="test-container"
            data-custom="value"
            onClick={() => {}}
            role="region"
        >
          Contenido con props
        </Container>
    );

    const element = screen.getByTestId('Container');
    expect(element).toHaveAttribute('id', 'test-container');
    expect(element).toHaveAttribute('data-custom', 'value');
    expect(element).toHaveAttribute('role', 'region');
  });

  test('aplica className personalizada junto con clases BEM', () => {
    render(<Container className="mi-container-custom">Contenido</Container>);
    const element = screen.getByTestId('Container');
    expect(element).toHaveClass('container');
    expect(element).toHaveClass('mi-container-custom');
  });

  test('maneja eventos correctamente', () => {
    const handleClick = jest.fn();
    render(<Container onClick={handleClick}>Contenido clicable</Container>);

    const element = screen.getByTestId('Container');
    element.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('aplica estilos inline correctamente', () => {
    render(
        <Container style={{ backgroundColor: 'red', minHeight: '200px' }}>
          Contenido con estilos
        </Container>
    );

    const element = screen.getByTestId('Container');
    expect(element).toHaveStyle('background-color: red');
    expect(element).toHaveStyle('min-height: 200px');
  });
});

// ===== GRUPO 12: TESTS DE CASOS EXTREMOS =====
describe('Container Component - Casos Extremos', () => {
  test('maneja contenido undefined sin errores', () => {
    render(<Container>{undefined}</Container>);
    expect(screen.getByTestId('Container')).toBeInTheDocument();
  });

  test('maneja contenido null sin errores', () => {
    render(<Container>{null}</Container>);
    expect(screen.getByTestId('Container')).toBeInTheDocument();
  });

  test('maneja múltiples children correctamente', () => {
    render(
        <Container>
          <div>Primer hijo</div>
          <div>Segundo hijo</div>
          <div>Tercer hijo</div>
        </Container>
    );

    expect(screen.getByText('Primer hijo')).toBeInTheDocument();
    expect(screen.getByText('Segundo hijo')).toBeInTheDocument();
    expect(screen.getByText('Tercer hijo')).toBeInTheDocument();
  });

  test('maneja contenido muy anidado sin errores', () => {
    render(
        <Container>
          <div>
            <div>
              <div>
                <p>Contenido muy anidado</p>
              </div>
            </div>
          </div>
        </Container>
    );

    expect(screen.getByText('Contenido muy anidado')).toBeInTheDocument();
  });

  test('maneja props con valores extremos', () => {
    render(
        <Container
            variant="modal"
            size="xlarge"
            maxWidth="7xl"
            padding="xlarge"
            margin="xlarge"
            shadow="2xl"
            border="lg"
            rounded="3xl"
            background="accent"
            centered={true}
            fluid={false}
            fitContent={true}
        >
          Contenido con props extremas
        </Container>
    );

    const element = screen.getByTestId('Container');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('container--modal');
    expect(element).toHaveClass('container--xlarge');
    expect(element).toHaveClass('container--max-7xl');
  });
});
