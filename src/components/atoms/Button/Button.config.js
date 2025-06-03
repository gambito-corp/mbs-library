import Button from './Button.jsx';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants.js';

export const ButtonConfig = {
    component: Button,
    name: 'Button',
    category: 'atoms',
    description: 'Componente de botón versátil con múltiples variantes, tamaños, estados y soporte para iconos. Basado en metodología BEM con contraste automático de texto.',

    props: {
        children: {
            type: 'ReactNode',
            required: false,
            description: 'Contenido del botón (texto, elementos, etc.)'
        },
        type: {
            type: 'string',
            required: false,
            default: 'button',
            options: ['button', 'submit', 'reset'],
            description: 'Tipo de botón HTML'
        },
        variant: {
            type: 'string',
            required: false,
            default: 'primary',
            options: Object.keys(BUTTON_VARIANTS),
            description: 'Variante visual del botón'
        },
        size: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(BUTTON_SIZES),
            description: 'Tamaño del botón'
        },
        icon: {
            type: 'string',
            required: false,
            description: 'Nombre del icono FontAwesome a mostrar'
        },
        iconPosition: {
            type: 'string',
            required: false,
            default: 'left',
            options: ['left', 'right', 'top', 'bottom'],
            description: 'Posición del icono relativa al texto'
        },
        loading: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Estado de carga con spinner'
        },
        disabled: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Estado deshabilitado'
        },
        fullWidth: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Ocupa todo el ancho disponible'
        },
        as: {
            type: 'string',
            required: false,
            default: 'button',
            options: ['button', 'a', 'link', 'div'],
            description: 'Elemento HTML a renderizar'
        },
        href: {
            type: 'string',
            required: false,
            description: 'URL cuando se usa como enlace (as="a")'
        },
        textColor: {
            type: 'string',
            required: false,
            description: 'Color personalizado del texto (sobrescribe el automático)'
        },
        iconColor: {
            type: 'string',
            required: false,
            description: 'Color personalizado del icono'
        },
        onClick: {
            type: 'function',
            required: false,
            description: 'Función ejecutada al hacer click',
            signature: '(event) => void'
        }
    },

    variants: [
        {
            name: '🎯 Botones básicos',
            description: 'Variantes principales del sistema',
            code: `<div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
  <Button variant="primary">Primario</Button>
  <Button variant="gradient">Degradado</Button>
  <Button variant="secondary">Secundario</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Fantasma</Button>
</div>`,
            props: {
                variant: 'primary',
                children: 'Primario'
            }
        },
        {
            name: '🎨 Variantes de estado',
            description: 'Botones para diferentes estados',
            code: `<div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
  <Button variant="success">Éxito</Button>
  <Button variant="danger">Peligro</Button>
  <Button variant="warning">Advertencia</Button>
</div>`,
            props: {
                variant: 'success',
                children: 'Éxito'
            }
        },
        {
            name: '📏 Tamaños disponibles',
            description: 'Diferentes tamaños de botones',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start'}}>
  <Button variant="primary" size="xs">Extra pequeño</Button>
  <Button variant="primary" size="small">Pequeño</Button>
  <Button variant="primary" size="medium">Mediano</Button>
  <Button variant="primary" size="large">Grande</Button>
  <Button variant="primary" size="xlarge">Extra grande</Button>
</div>`,
            props: {
                variant: 'primary',
                size: 'medium',
                children: 'Mediano'
            }
        },
        {
            name: '🎮 Botones de juego',
            description: 'Variantes especiales para juegos',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
  <Button variant="gameReveal" size="game" fullWidth={true}>
    REVELAR RESPUESTA
  </Button>
  <Button variant="gameCorrect" size="game" fullWidth={true}>
    ¡CORRECTO!
  </Button>
  <Button variant="gameIncorrect" size="game" fullWidth={true}>
    INCORRECTO
  </Button>
  <div style={{display: 'flex', gap: '12px'}}>
    <Button variant="gameRestart">Reiniciar</Button>
    <Button variant="gameExit">Salir</Button>
  </div>
</div>`,
            props: {
                variant: 'gameReveal',
                size: 'game',
                fullWidth: true,
                children: 'REVELAR RESPUESTA'
            }
        },
        {
            name: '🔄 Estados interactivos',
            description: 'Estados de carga y deshabilitado',
            code: `<div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
  <Button variant="primary" loading={true}>
    Cargando...
  </Button>
  <Button variant="primary" disabled={true}>
    Deshabilitado
  </Button>
  <Button variant="success" loading={true}>
    Guardando...
  </Button>
</div>`,
            props: {
                variant: 'primary',
                loading: true,
                children: 'Cargando...'
            }
        },
        {
            name: '🎯 Botones con iconos',
            description: 'Diferentes posiciones de iconos',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start'}}>
  <Button variant="primary" icon="heart" iconPosition="left">
    Icono izquierda
  </Button>
  <Button variant="success" icon="arrow-right" iconPosition="right">
    Icono derecha
  </Button>
  <Button variant="gradient" icon="star" iconPosition="top">
    Icono arriba
  </Button>
  <Button variant="secondary" icon="download" iconPosition="bottom">
    Icono abajo
  </Button>
</div>`,
            props: {
                variant: 'primary',
                icon: 'heart',
                iconPosition: 'left',
                children: 'Icono izquierda'
            }
        },
        {
            name: '📐 Botón ancho completo',
            description: 'Botón que ocupa todo el ancho disponible',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
  <Button variant="primary" fullWidth={true} size="large">
    Botón Ancho Completo
  </Button>
  <Button variant="gradient" fullWidth={true} icon="download" iconPosition="left">
    Descargar Archivo
  </Button>
</div>`,
            props: {
                variant: 'primary',
                fullWidth: true,
                size: 'large',
                children: 'Botón Ancho Completo'
            }
        },
        {
            name: '🔗 Botón como enlace',
            description: 'Botón renderizado como elemento de enlace',
            code: `<div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
  <Button 
    as="a" 
    href="#" 
    variant="primary"
    icon="external-link-alt"
    iconPosition="right"
  >
    Enlace externo
  </Button>
  <Button 
    as="a" 
    href="#" 
    variant="outline"
    icon="link"
    iconPosition="left"
  >
    Ir al enlace
  </Button>
</div>`,
            props: {
                as: 'a',
                href: '#',
                variant: 'primary',
                icon: 'external-link-alt',
                iconPosition: 'right',
                children: 'Enlace externo'
            }
        },
        {
            name: '🎨 Colores personalizados',
            description: 'Botones con colores de texto e icono personalizados',
            code: `<div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
  <Button 
    variant="ghost" 
    textColor="#e11d48"
    icon="heart"
    iconColor="#e11d48"
  >
    Texto rosa
  </Button>
  <Button 
    variant="outline" 
    textColor="#7c3aed"
    iconColor="#7c3aed"
    icon="star"
  >
    Texto púrpura
  </Button>
  <Button 
    variant="ghost" 
    textColor="#059669"
    iconColor="#f59e0b"
    icon="bell"
  >
    Colores mixtos
  </Button>
</div>`,
            props: {
                variant: 'ghost',
                textColor: '#e11d48',
                iconColor: '#e11d48',
                icon: 'heart',
                children: 'Texto rosa'
            }
        },
        {
            name: '🎯 Solo iconos',
            description: 'Botones que contienen únicamente iconos',
            code: `<div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
  <Button variant="primary" icon="plus" size="small" />
  <Button variant="danger" icon="trash" size="medium" />
  <Button variant="success" icon="check" size="large" />
  <Button variant="outline" icon="edit" size="medium" />
  <Button variant="ghost" icon="heart" size="large" />
</div>`,
            props: {
                variant: 'primary',
                icon: 'plus',
                size: 'small'
            }
        }
    ]
};

export default ButtonConfig;
