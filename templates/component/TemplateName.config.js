import TemplateName from './TemplateName.jsx';
import { TEMPLATENAME_TYPES, TEMPLATENAME_VARIANTS, TEMPLATENAME_SIZES } from './TemplateName.constants.js';

export const TemplateNameConfig = {
    component: TemplateName,
    name: 'TemplateName',
    category: 'atoms',
    description: 'Descripción del componente TemplateName',

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
            description: 'Ejemplo básico del componente TemplateName',
            code: `<TemplateName>
  Contenido básico
</TemplateName>`,
            props: {
                children: 'Contenido básico'
            }
        },
        {
            name: 'Con variante primary',
            description: 'TemplateName con variante primary',
            code: `<TemplateName variant="primary">
  Contenido con variante primary
</TemplateName>`,
            props: {
                variant: 'primary',
                children: 'Contenido con variante primary'
            }
        },
        {
            name: 'Tamaño grande',
            description: 'TemplateName con tamaño grande',
            code: `<TemplateName 
  size="large"
  variant="primary"
>
  Contenido en tamaño grande
</TemplateName>`,
            props: {
                size: 'large',
                variant: 'primary',
                children: 'Contenido en tamaño grande'
            }
        }
    ]
};
