import Container from './Container.jsx';
import Text from '../Text/Text.jsx'; // ✅ IMPORTAR Text

export const ContainerConfig = {
    component: Container,
    name: 'Container',
    category: 'atoms',
    description: 'Componente contenedor versátil con metodología BEM',

    variants: [
        {
            name: '📦 Contenedores básicos',
            description: 'Variantes fundamentales de contenedores',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  <Container variant="default">
    <Text>Contenedor por defecto</Text>
  </Container>
  <Container variant="card" padding="large">
    <Text variant="bold" size="large">Contenedor tipo tarjeta</Text>
    <Text variant="muted" size="small">Con padding grande y estilo card</Text>
  </Container>
  <Container variant="panel" padding="medium">
    <Text>Contenedor tipo panel</Text>
  </Container>
</div>`,
            props: {
                variant: 'default',
                children: <Text>Contenedor por defecto</Text>
            }
        },
        {
            name: '📏 Tamaños y anchos',
            description: 'Diferentes tamaños y anchos máximos',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  <Container size="small" variant="card" centered={true}>
    <Text variant="bold">Contenedor pequeño centrado</Text>
    <Text variant="muted" size="small">Tamaño small con centrado automático</Text>
  </Container>
  <Container maxWidth="md" variant="panel" centered={true}>
    <Text>Ancho máximo mediano</Text>
  </Container>
  <Container fluid={true} variant="hero">
    <Text as="h1" size="2xl" variant="bold">Contenedor fluido completo</Text>
    <Text size="large">Ocupa todo el ancho disponible</Text>
  </Container>
</div>`,
            props: {
                size: 'small',
                variant: 'card',
                centered: true,
                children: (
                    <>
                        <Text variant="bold">Contenedor pequeño centrado</Text>
                        <Text variant="muted" size="small">Tamaño small con centrado automático</Text>
                    </>
                )
            }
        },
        {
            name: '🎨 Estilos visuales',
            description: 'Sombras, bordes y fondos',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  <Container shadow="lg" rounded="xl" padding="large">
    <Text variant="bold" size="large">Con sombra grande</Text>
    <Text>Bordes redondeados XL y padding grande</Text>
  </Container>
  <Container border="md" rounded="lg" padding="medium">
    <Text variant="bold">Con borde mediano</Text>
    <Text variant="muted">Estilo panel con bordes</Text>
  </Container>
  <Container background="primary" padding="large" rounded="md">
    <Text variant="bold" size="xlarge">Fondo azul primario</Text>
    <Text>Texto que respeta el tema oscuro/claro</Text>
  </Container>
</div>`,
            props: {
                shadow: 'lg',
                rounded: 'xl',
                padding: 'large',
                children: (
                    <>
                        <Text variant="bold" size="large">Con sombra grande</Text>
                        <Text>Bordes redondeados XL y padding grande</Text>
                    </>
                )
            }
        },
        {
            name: '🏷️ Elementos semánticos',
            description: 'Contenedores como diferentes elementos HTML',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  <Container as="header" variant="hero" padding="large">
    <Text as="h1" size="2xl" variant="bold">Header Principal</Text>
    <Text size="large">Elemento semántico header</Text>
  </Container>
  <Container as="section" variant="card" padding="medium">
    <Text as="h2" size="xlarge" variant="bold">Sección de Contenido</Text>
    <Text>Elemento semántico section</Text>
  </Container>
  <Container as="aside" variant="sidebar" padding="medium">
    <Text as="h3" size="large" variant="bold">Sidebar</Text>
    <Text variant="muted">Navegación lateral</Text>
  </Container>
  <Container as="footer" variant="panel" padding="small">
    <Text variant="muted" size="small">© 2025 Mi Aplicación</Text>
  </Container>
</div>`,
            props: {
                as: 'header',
                variant: 'hero',
                padding: 'large',
                children: (
                    <>
                        <Text as="h1" size="2xl" variant="bold">Header Principal</Text>
                        <Text size="large">Elemento semántico header</Text>
                    </>
                )
            }
        },
        {
            name: '🚀 Combinaciones avanzadas',
            description: 'Casos de uso complejos y realistas',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <Container variant="modal" maxWidth="lg" centered={true} shadow="2xl" rounded="xl" padding="xlarge">
    <Text as="h2" size="2xl" variant="bold" color="primary">Modal de Confirmación</Text>
    <Text size="medium" style={{marginTop: '12px', marginBottom: '16px'}}>
      ¿Estás seguro de que quieres eliminar este elemento?
    </Text>
    <div style={{display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
      <Container variant="default" padding="small" border="sm" rounded="md">
        <Text variant="muted">Cancelar</Text>
      </Container>
      <Container variant="default" padding="small" background="primary" rounded="md">
        <Text variant="bold">Confirmar</Text>
      </Container>
    </div>
  </Container>
  
  <Container variant="card" padding="large" shadow="md" rounded="lg">
    <Text as="h3" size="xlarge" variant="bold">Tarjeta de Producto</Text>
    <Text variant="muted" size="small" style={{marginBottom: '8px'}}>Categoría: Electrónicos</Text>
    <Text size="medium" style={{marginBottom: '12px'}}>
      Descripción del producto con texto que respeta automáticamente el tema oscuro y claro.
    </Text>
    <Text variant="bold" size="large" color="success">€99.99</Text>
  </Container>
</div>`,
            props: {
                variant: 'modal',
                maxWidth: 'lg',
                centered: true,
                shadow: '2xl',
                rounded: 'xl',
                padding: 'xlarge',
                children: (
                    <>
                        <Text as="h2" size="2xl" variant="bold" color="primary">Modal de Confirmación</Text>
                        <Text size="medium">¿Estás seguro de que quieres eliminar este elemento?</Text>
                    </>
                )
            }
        },
        {
            name: '📐 Ancho ajustado al contenido',
            description: 'Contenedor que se ajusta al tamaño de su contenido',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start'}}>
  <Container fitContent={true} variant="card" padding="medium">
    <Text variant="bold">Contenido corto</Text>
  </Container>
  <Container fitContent={true} variant="panel" padding="large">
    <Text>Este contenedor se ajusta exactamente al ancho de este texto</Text>
  </Container>
  <Container fitContent={true} centered={true} variant="card" padding="medium" shadow="md">
    <Text variant="bold" size="large">Fit content + centrado</Text>
    <Text variant="muted">Se ajusta al contenido y se centra</Text>
  </Container>
</div>`,
            props: {
                fitContent: true,
                variant: 'card',
                padding: 'medium',
                children: <Text variant="bold">Contenido corto</Text>
            }
        }

    ]
};

export default ContainerConfig;
