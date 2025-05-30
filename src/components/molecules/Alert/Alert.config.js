import Alert from './Alert.jsx';
import { ALERT_TYPES, ALERT_VARIANTS, ALERT_SIZES } from './Alert.constants.js';

export const AlertConfig = {
    component: Alert,
    name: 'Alert',
    category: 'atoms',
    description: 'Componente para mostrar mensajes informativos, de éxito, advertencia o error al usuario de manera prominente',

    // Documentación automática de props
    props: {
        type: {
            type: 'string',
            required: false,
            default: 'info',
            options: Object.keys(ALERT_TYPES),
            description: 'Tipo de alerta que determina el color, icono y semántica',
            examples: ['error', 'success', 'warning', 'info']
        },
        variant: {
            type: 'string',
            required: false,
            default: 'filled',
            options: Object.keys(ALERT_VARIANTS),
            description: 'Variante visual del componente',
            examples: ['filled', 'outlined', 'solid']
        },
        size: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(ALERT_SIZES),
            description: 'Tamaño del componente',
            examples: ['small', 'medium', 'large']
        },
        message: {
            type: 'string',
            required: true,
            description: 'Mensaje principal a mostrar en la alerta',
            examples: ['Operación completada exitosamente', 'Error al procesar la solicitud']
        },
        title: {
            type: 'string',
            required: false,
            description: 'Título opcional para la alerta',
            examples: ['¡Éxito!', 'Error crítico', 'Atención']
        },
        dismissible: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Permite cerrar la alerta manualmente'
        },
        onDismiss: {
            type: 'function',
            required: false,
            description: 'Función ejecutada al cerrar la alerta',
            signature: '() => void'
        },
        icon: {
            type: 'boolean',
            required: false,
            default: true,
            description: 'Muestra u oculta el icono de la alerta'
        }
    },

    // Variantes para el Design System Viewer
    variants: [
        {
            name: 'Error básico',
            description: 'Alerta de error simple con mensaje directo',
            code: `<Alert 
  type="error" 
  message="Este es un mensaje de error crítico" 
/>`,
            props: {
                type: 'error',
                message: 'Este es un mensaje de error crítico'
            }
        },
        {
            name: 'Éxito con título',
            description: 'Alerta de éxito con título y mensaje descriptivo',
            code: `<Alert 
  type="success" 
  title="¡Operación exitosa!" 
  message="Los datos se guardaron correctamente" 
/>`,
            props: {
                type: 'success',
                title: '¡Operación exitosa!',
                message: 'Los datos se guardaron correctamente'
            }
        },
        {
            name: 'Warning dismissible',
            description: 'Alerta de advertencia que se puede cerrar manualmente',
            code: `<Alert 
  type="warning" 
  message="Esta acción no se puede deshacer" 
  dismissible={true}
  onDismiss={() => console.log('Alert cerrado')}
/>`,
            props: {
                type: 'warning',
                message: 'Esta acción no se puede deshacer',
                dismissible: true,
                onDismiss: () => console.log('Alert cerrado')
            }
        },
        {
            name: 'Info outlined grande',
            description: 'Alerta informativa con variante outlined y tamaño grande',
            code: `<Alert 
  type="info" 
  variant="outlined" 
  size="large" 
  message="Información importante para el usuario" 
/>`,
            props: {
                type: 'info',
                variant: 'outlined',
                size: 'large',
                message: 'Información importante para el usuario'
            }
        },
        {
            name: 'Error sólido pequeño',
            description: 'Alerta de error con estilo sólido y tamaño compacto',
            code: `<Alert 
  type="error" 
  variant="solid" 
  size="small" 
  message="Error crítico del sistema" 
/>`,
            props: {
                type: 'error',
                variant: 'solid',
                size: 'small',
                message: 'Error crítico del sistema'
            }
        },
        {
            name: 'Success sin icono',
            description: 'Alerta de éxito sin mostrar el icono',
            code: `<Alert 
  type="success" 
  message="Proceso completado" 
  icon={false} 
/>`,
            props: {
                type: 'success',
                message: 'Proceso completado',
                icon: false
            }
        },
        {
            name: 'Warning con contenido personalizado',
            description: 'Alerta usando children en lugar de message',
            code: `<Alert type="warning" title="Contenido personalizado">
  Este es contenido personalizado con <strong>HTML</strong>
</Alert>`,
            props: {
                type: 'warning',
                title: 'Contenido personalizado',
                children: 'Este es contenido personalizado con HTML'
            }
        }
    ]
};
