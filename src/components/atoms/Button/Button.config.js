import Button from './Button.jsx';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants.js';

export const ButtonConfig = {
    component: Button,
    name: 'Button',
    category: 'atoms',
    description: 'Componente de botón versátil con múltiples variantes, tamaños, estados y soporte para iconos. Basado en tus estilos favoritos con gradientes y efectos.',

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
        onClick: {
            type: 'function',
            required: false,
            description: 'Función ejecutada al hacer click',
            signature: '(event) => void'
        }
    },

    variants: [
        {
            name: 'Botón primario',
            description: 'Botón principal con gradiente azul',
            code: `<Button variant="primary">
  Botón Primario
</Button>`,
            props: {
                variant: 'primary',
                children: 'Botón Primario'
            }
        },
        {
            name: 'Botón secundario',
            description: 'Botón secundario con gradiente gris',
            code: `<Button variant="secondary">
  Botón Secundario
</Button>`,
            props: {
                variant: 'secondary',
                children: 'Botón Secundario'
            }
        },
        {
            name: 'Botón de éxito',
            description: 'Botón de éxito con gradiente verde',
            code: `<Button variant="success" size="large">
  ¡Éxito!
</Button>`,
            props: {
                variant: 'success',
                size: 'large',
                children: '¡Éxito!'
            }
        },
        {
            name: 'Botón de peligro',
            description: 'Botón de peligro con gradiente rojo',
            code: `<Button variant="danger" size="large">
  Eliminar
</Button>`,
            props: {
                variant: 'danger',
                size: 'large',
                children: 'Eliminar'
            }
        },
        {
            name: 'Botón con icono',
            description: 'Botón con icono a la izquierda',
            code: `<Button 
  variant="primary" 
  icon="heart" 
  iconPosition="left"
>
  Me gusta
</Button>`,
            props: {
                variant: 'primary',
                icon: 'heart',
                iconPosition: 'left',
                children: 'Me gusta'
            }
        },
        {
            name: 'Botón con icono derecha',
            description: 'Botón con icono a la derecha',
            code: `<Button 
  variant="success" 
  icon="arrow-right" 
  iconPosition="right"
>
  Continuar
</Button>`,
            props: {
                variant: 'success',
                icon: 'arrow-right',
                iconPosition: 'right',
                children: 'Continuar'
            }
        },
        {
            name: 'Botón cargando',
            description: 'Botón en estado de carga',
            code: `<Button 
  variant="primary" 
  loading={true}
>
  Guardando...
</Button>`,
            props: {
                variant: 'primary',
                loading: true,
                children: 'Guardando...'
            }
        },
        {
            name: 'Botón deshabilitado',
            description: 'Botón en estado deshabilitado',
            code: `<Button 
  variant="primary" 
  disabled={true}
>
  No disponible
</Button>`,
            props: {
                variant: 'primary',
                disabled: true,
                children: 'No disponible'
            }
        },
        {
            name: 'Botón ancho completo',
            description: 'Botón que ocupa todo el ancho',
            code: `<Button 
  variant="primary" 
  fullWidth={true}
  size="large"
>
  Botón Completo
</Button>`,
            props: {
                variant: 'primary',
                fullWidth: true,
                size: 'large',
                children: 'Botón Completo'
            }
        },
        {
            name: 'Botón outline',
            description: 'Botón con solo borde',
            code: `<Button variant="outline">
  Botón Outline
</Button>`,
            props: {
                variant: 'outline',
                children: 'Botón Outline'
            }
        },
        {
            name: 'Botón fantasma',
            description: 'Botón transparente',
            code: `<Button variant="ghost">
  Botón Fantasma
</Button>`,
            props: {
                variant: 'ghost',
                children: 'Botón Fantasma'
            }
        },
        {
            name: 'Botón de juego - Revelar',
            description: 'Botón estilo juego para revelar',
            code: `<Button 
  variant="gameReveal" 
  size="game"
  fullWidth={true}
>
  REVELAR RESPUESTA
</Button>`,
            props: {
                variant: 'gameReveal',
                size: 'game',
                fullWidth: true,
                children: 'REVELAR RESPUESTA'
            }
        },
        {
            name: 'Botón de juego - Correcto',
            description: 'Botón para respuesta correcta',
            code: `<Button 
  variant="gameCorrect" 
  size="game"
  fullWidth={true}
>
  ¡CORRECTO!
</Button>`,
            props: {
                variant: 'gameCorrect',
                size: 'game',
                fullWidth: true,
                children: '¡CORRECTO!'
            }
        },
        {
            name: 'Botón de juego - Incorrecto',
            description: 'Botón para respuesta incorrecta',
            code: `<Button 
  variant="gameIncorrect" 
  size="game"
  fullWidth={true}
>
  INCORRECTO
</Button>`,
            props: {
                variant: 'gameIncorrect',
                size: 'game',
                fullWidth: true,
                children: 'INCORRECTO'
            }
        },
        {
            name: 'Botón como enlace',
            description: 'Botón renderizado como enlace',
            code: `<Button 
  as="a" 
  href="#" 
  variant="primary"
  icon="external-link-alt"
  iconPosition="right"
>
  Ir al enlace
</Button>`,
            props: {
                as: 'a',
                href: '#',
                variant: 'primary',
                icon: 'external-link-alt',
                iconPosition: 'right',
                children: 'Ir al enlace'
            }
        },
        {
            name: 'Tamaños múltiples',
            description: 'Diferentes tamaños de botones',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start'}}>
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
            name: 'Colores personalizados',
            description: 'Botones con colores Tailwind personalizados',
            code: `<div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
  <Button color="blue">Azul</Button>
  <Button color="red">Rojo</Button>
  <Button color="green">Verde</Button>
  <Button color="purple">Púrpura</Button>
  <Button color="orange">Naranja</Button>
  <Button color="pink">Rosa</Button>
</div>`,
            props: {
                color: 'blue',
                children: 'Azul'
            }
        },
        {
            name: 'Outline con colores',
            description: 'Botones outline con colores personalizados',
            code: `<div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
  <Button color="blue" variant="outline">Azul</Button>
  <Button color="red" variant="outline">Rojo</Button>
  <Button color="green" variant="outline">Verde</Button>
  <Button color="purple" variant="outline">Púrpura</Button>
</div>`,
            props: {
                color: 'blue',
                variant: 'outline',
                children: 'Azul'
            }
        },
        {
            name: 'Botón con texto colorido',
            description: 'Botón con color de texto personalizado',
            code: `<Button 
  variant="outline" 
  textColor="purple"
  iconColor="purple"
  icon="heart"
>
  Texto Púrpura
</Button>`,
            props: {
                variant: 'outline',
                textColor: 'purple',
                iconColor: 'purple',
                icon: 'heart',
                children: 'Texto Púrpura'
            }
        },
        {
            name: 'Botón con icono colorido',
            description: 'Botón con icono de color diferente',
            code: `<Button 
  variant="ghost" 
  textColor="blue"
  iconColor="red"
  icon="star"
  iconPosition="left"
>
  Texto azul, icono rojo
</Button>`,
            props: {
                variant: 'ghost',
                textColor: 'blue',
                iconColor: 'red',
                icon: 'star',
                iconPosition: 'left',
                children: 'Texto azul, icono rojo'
            }
        }
    ]
};
