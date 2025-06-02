import Avatar from './Avatar.jsx';
import { TEMPLATENAME_VARIANTS, TEMPLATENAME_SIZES } from './Avatar.constants.js';

export const AvatarConfig = {
    component: Avatar,
    name: 'Avatar',
    category: 'atoms',
    description: 'Descripción del componente Avatar',

    // Documentación automática de props
    props: {
        variant: {
            type: 'string',
            required: false,
            default: 'default',
            options: Object.keys(TEMPLATENAME_VARIANTS),
            description: 'Variante visual del componente',
            examples: ['default', 'primary', 'secondary']
        },
        size: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(TEMPLATENAME_SIZES),
            description: 'Tamaño del componente',
            examples: ['small', 'medium', 'large']
        },
        className: {
            type: 'string',
            required: false,
            default: '',
            description: 'Clases CSS adicionales para personalización'
        },
        children: {
            type: 'ReactNode',
            required: false,
            description: 'Contenido del componente'
        }
    },

    // Variantes para el Design System Viewer
    variants: [
        {
            name: 'Básico',
            description: 'Ejemplo básico del componente Avatar',
            code: `<Avatar>
  Contenido básico
</Avatar>`,
            props: {
                children: 'Contenido básico'
            }
        },
        {
            name: 'Con variante primary',
            description: 'Avatar con variante primary',
            code: `<Avatar variant="primary">
  Contenido con variante primary
</Avatar>`,
            props: {
                variant: 'primary',
                children: 'Contenido con variante primary'
            }
        },
        {
            name: 'Tamaño grande',
            description: 'Avatar con tamaño grande',
            code: `<Avatar 
  size="large"
  variant="primary"
>
  Contenido en tamaño grande
</Avatar>`,
            props: {
                size: 'large',
                variant: 'primary',
                children: 'Contenido en tamaño grande'
            }
        }
    ]
};
