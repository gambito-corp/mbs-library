import Container from './Container.jsx';
import { CONTAINER_VARIANTS, CONTAINER_SIZES } from './Container.constants.js';

export const ContainerConfig = {
    component: Container,
    name: 'Container',
    category: 'atoms',
    description: 'Componente contenedor versátil para estructurar y organizar otros elementos dentro del layout',

    props: {
        children: {
            type: 'ReactNode',
            required: false,
            description: 'Contenido que se mostrará dentro del contenedor'
        },
        variant: {
            type: 'string',
            required: false,
            default: 'default',
            options: Object.keys(CONTAINER_VARIANTS),
            description: 'Variante visual del contenedor',
            examples: ['default', 'card', 'panel', 'hero', 'sidebar', 'modal']
        },
        size: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(CONTAINER_SIZES),
            description: 'Tamaño del contenedor',
            examples: ['xs', 'small', 'medium', 'large', 'xlarge', 'full']
        },
        maxWidth: {
            type: 'string',
            required: false,
            default: 'full',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full', 'none'],
            description: 'Ancho máximo del contenedor'
        },
        padding: {
            type: 'string',
            required: false,
            default: 'medium',
            options: ['none', 'small', 'medium', 'large', 'xlarge'],
            description: 'Espaciado interno del contenedor'
        },
        margin: {
            type: 'string',
            required: false,
            default: 'none',
            options: ['none', 'small', 'medium', 'large', 'xlarge', 'auto'],
            description: 'Espaciado externo del contenedor'
        },
        centered: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Centra el contenedor horizontalmente'
        },
        fluid: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Hace que el contenedor ocupe todo el ancho disponible'
        },
        shadow: {
            type: 'string',
            required: false,
            default: 'none',
            options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Sombra del contenedor'
        },
        border: {
            type: 'string',
            required: false,
            default: 'none',
            options: ['none', 'sm', 'md', 'lg', 'dashed', 'dotted'],
            description: 'Borde del contenedor'
        },
        rounded: {
            type: 'string',
            required: false,
            default: 'none',
            options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
            description: 'Bordes redondeados del contenedor'
        },
        background: {
            type: 'string',
            required: false,
            default: 'transparent',
            options: ['transparent', 'white', 'gray', 'primary', 'secondary', 'accent'],
            description: 'Color de fondo del contenedor'
        },
        as: {
            type: 'string',
            required: false,
            default: 'div',
            options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav'],
            description: 'Elemento HTML que se renderizará'
        }
    },

    variants: [
        {
            name: 'Contenedor básico',
            description: 'Contenedor simple sin estilos especiales',
            code: `<Container>
  <p>Contenido básico dentro del contenedor</p>
</Container>`,
            props: {
                children: 'Contenido básico dentro del contenedor'
            }
        },
        {
            name: 'Tarjeta con sombra',
            description: 'Contenedor con apariencia de tarjeta',
            code: `<Container 
  variant="card" 
  padding="large" 
  rounded="lg" 
  shadow="md"
>
  <h3>Título de la tarjeta</h3>
  <p>Contenido de la tarjeta con sombra y bordes redondeados</p>
</Container>`,
            props: {
                variant: 'card',
                padding: 'large',
                rounded: 'lg',
                shadow: 'md',
                children: 'Contenido de tarjeta'
            }
        },
        {
            name: 'Panel con borde',
            description: 'Contenedor tipo panel con borde',
            code: `<Container 
  variant="panel" 
  border="sm" 
  padding="medium" 
  rounded="md"
>
  <p>Contenido del panel con borde</p>
</Container>`,
            props: {
                variant: 'panel',
                border: 'sm',
                padding: 'medium',
                rounded: 'md',
                children: 'Contenido del panel'
            }
        },
        {
            name: 'Sección héroe',
            description: 'Contenedor para secciones destacadas',
            code: `<Container 
  variant="hero" 
  padding="xlarge" 
  centered={true}
  maxWidth="4xl"
>
  <h1>Título Principal</h1>
  <p>Descripción de la sección héroe</p>
</Container>`,
            props: {
                variant: 'hero',
                padding: 'xlarge',
                centered: true,
                maxWidth: '4xl',
                children: 'Contenido héroe'
            }
        },
        {
            name: 'Contenedor centrado',
            description: 'Contenedor centrado con ancho máximo',
            code: `<Container 
  maxWidth="lg" 
  centered={true} 
  padding="large"
>
  <p>Contenido centrado con ancho máximo limitado</p>
</Container>`,
            props: {
                maxWidth: 'lg',
                centered: true,
                padding: 'large',
                children: 'Contenido centrado'
            }
        },
        {
            name: 'Contenedor fluido',
            description: 'Contenedor que ocupa todo el ancho',
            code: `<Container 
  fluid={true} 
  background="gray" 
  padding="medium"
>
  <p>Contenedor fluido de ancho completo</p>
</Container>`,
            props: {
                fluid: true,
                background: 'gray',
                padding: 'medium',
                children: 'Contenedor fluido'
            }
        },
        {
            name: 'Modal container',
            description: 'Contenedor para contenido modal',
            code: `<Container 
  variant="modal" 
  maxWidth="md" 
  padding="large" 
  rounded="xl" 
  shadow="2xl"
>
  <h2>Modal Title</h2>
  <p>Contenido del modal</p>
</Container>`,
            props: {
                variant: 'modal',
                maxWidth: 'md',
                padding: 'large',
                rounded: 'xl',
                shadow: '2xl',
                children: 'Contenido modal'
            }
        },
        {
            name: 'Sidebar container',
            description: 'Contenedor para barras laterales',
            code: `<Container 
  variant="sidebar" 
  maxWidth="xs" 
  padding="medium"
  as="aside"
>
  <nav>Enlaces de navegación</nav>
</Container>`,
            props: {
                variant: 'sidebar',
                maxWidth: 'xs',
                padding: 'medium',
                as: 'aside',
                children: 'Contenido sidebar'
            }
        }
    ]
};
