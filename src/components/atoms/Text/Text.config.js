import Text from './Text.jsx';
import { TEXT_VARIANTS, TEXT_SIZES } from './Text.constants.js';

export const TextConfig = {
    component: Text,
    name: 'Text',
    category: 'atoms',
    description: 'Componente de texto versátil que puede mostrar contenido estático o con animaciones opcionales tipo máquina de escribir',

    props: {
        children: {
            type: 'ReactNode',
            required: false,
            description: 'Contenido de texto como children'
        },
        text: {
            type: 'string',
            required: false,
            description: 'Texto a mostrar como prop'
        },
        animated: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Activa la animación de máquina de escribir'
        },
        speed: {
            type: 'number',
            required: false,
            default: 50,
            description: 'Velocidad de la animación en milisegundos (solo si animated=true)'
        },
        variant: {
            type: 'string',
            required: false,
            default: 'default',
            options: Object.keys(TEXT_VARIANTS),
            description: 'Variante visual del texto'
        },
        size: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(TEXT_SIZES),
            description: 'Tamaño del texto'
        },
        as: {
            type: 'string',
            required: false,
            default: 'span',
            options: ['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'label'],
            description: 'Elemento HTML que se renderizará'
        },
        htmlStyles: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Permite contenido HTML enriquecido'
        }
    },

    variants: [
        {
            name: 'Texto básico',
            description: 'Texto estático simple',
            code: `<Text>
  Texto básico sin animación
</Text>`,
            props: {
                children: 'Texto básico sin animación'
            }
        },
        {
            name: 'Texto con prop',
            description: 'Usando la prop text en lugar de children',
            code: `<Text text="Texto usando la prop text" />`,
            props: {
                text: 'Texto usando la prop text'
            }
        },
        {
            name: 'Texto animado',
            description: 'Texto con animación de máquina de escribir',
            code: `<Text 
  animated={true}
  speed={80}
>
  Este texto se anima como máquina de escribir
</Text>`,
            props: {
                animated: true,
                speed: 80,
                children: 'Este texto se anima como máquina de escribir'
            }
        },
        {
            name: 'Título H1',
            description: 'Texto renderizado como H1',
            code: `<Text 
  as="h1" 
  size="3xl" 
  variant="bold"
>
  Título Principal
</Text>`,
            props: {
                as: 'h1',
                size: '3xl',
                variant: 'bold',
                children: 'Título Principal'
            }
        },
        {
            name: 'Texto destacado',
            description: 'Texto con fondo destacado',
            code: `<Text 
  variant="highlight"
  size="large"
>
  Texto destacado importante
</Text>`,
            props: {
                variant: 'highlight',
                size: 'large',
                children: 'Texto destacado importante'
            }
        },
        {
            name: 'Texto degradado',
            description: 'Texto con efecto degradado',
            code: `<Text 
  variant="gradient"
  size="2xl"
  as="h2"
>
  Texto con Degradado
</Text>`,
            props: {
                variant: 'gradient',
                size: '2xl',
                as: 'h2',
                children: 'Texto con Degradado'
            }
        },
        {
            name: 'Texto neón animado',
            description: 'Combinando variante neón con animación',
            code: `<Text 
  variant="neon"
  animated={true}
  speed={100}
  size="large"
>
  TEXTO NEÓN ANIMADO
</Text>`,
            props: {
                variant: 'neon',
                animated: true,
                speed: 100,
                size: 'large',
                children: 'TEXTO NEÓN ANIMADO'
            }
        },
        {
            name: 'Texto retro terminal',
            description: 'Estilo retro con animación',
            code: `<Text 
  variant="retro"
  animated={true}
  speed={50}
  cursorChar="█"
>
  $ echo "Terminal retro animado"
</Text>`,
            props: {
                variant: 'retro',
                animated: true,
                speed: 50,
                cursorChar: '█',
                children: '$ echo "Terminal retro animado"'
            }
        },
        {
            name: 'Párrafo con HTML',
            description: 'Texto con contenido HTML enriquecido',
            code: `<Text 
  as="p"
  htmlStyles={true}
  text="Este texto tiene <strong>negritas</strong> y <em>cursivas</em>"
/>`,
            props: {
                as: 'p',
                htmlStyles: true,
                text: 'Este texto tiene <strong>negritas</strong> y <em>cursivas</em>'
            }
        },
        {
            name: 'HTML animado',
            description: 'Contenido HTML con animación',
            code: `<Text 
  animated={true}
  htmlStyles={true}
  speed={60}
  text="Texto <span style='color: red;'>rojo</span> y <span style='color: blue;'>azul</span> animado"
/>`,
            props: {
                animated: true,
                htmlStyles: true,
                speed: 60,
                text: "Texto <span style='color: red;'>rojo</span> y <span style='color: blue;'>azul</span> animado"
            }
        },
        {
            name: 'Texto silenciado pequeño',
            description: 'Texto secundario con menor prominencia',
            code: `<Text 
  variant="muted"
  size="small"
  as="span"
>
  Texto secundario o de ayuda
</Text>`,
            props: {
                variant: 'muted',
                size: 'small',
                as: 'span',
                children: 'Texto secundario o de ayuda'
            }
        },
        {
            name: 'Label de formulario',
            description: 'Texto como label de formulario',
            code: `<Text 
  as="label"
  variant="bold"
  size="small"
>
  Nombre de usuario:
</Text>`,
            props: {
                as: 'label',
                variant: 'bold',
                size: 'small',
                children: 'Nombre de usuario:'
            }
        },
        {
            name: 'Colores de texto',
            description: 'Texto con colores Tailwind personalizados',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
  <Text textColor="blue">Texto azul</Text>
  <Text textColor="red">Texto rojo</Text>
  <Text textColor="green">Texto verde</Text>
  <Text textColor="purple">Texto púrpura</Text>
  <Text textColor="orange">Texto naranja</Text>
</div>`,
            props: {
                textColor: 'blue',
                children: 'Texto azul'
            }
        },
        {
            name: 'Título con color personalizado',
            description: 'Título H2 con color personalizado',
            code: `<Text 
  as="h2" 
  size="2xl" 
  textColor="indigo"
  variant="bold"
>
  Título Índigo
</Text>`,
            props: {
                as: 'h2',
                size: '2xl',
                textColor: 'indigo',
                variant: 'bold',
                children: 'Título Índigo'
            }
        },
    ]
};
