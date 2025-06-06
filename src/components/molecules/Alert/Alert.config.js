import Alert from './Alert.jsx';
import { ALERT_TYPES, ALERT_SIZES, ALERT_SHADOWS, LINK_TARGETS } from './Alert.constants.js';

export const AlertConfig = {
    component: Alert,
    name: 'Alert',
    category: 'molecules',
    description: 'Componente de alerta para mostrar información contextual usando átomos Icon, Text y Container. Soporta enlaces y diferentes tipos visuales.',

    props: {
        type: {
            type: 'string',
            required: false,
            options: Object.keys(ALERT_TYPES),
            description: 'Tipo de alert que determina color e icono'
        },
        icon: {
            type: 'string',
            required: false,
            description: 'Icono personalizado (sobrescribe el automático)'
        },
        title: {
            type: 'string',
            required: false,
            description: 'Título del alert'
        },
        message: {
            type: 'string',
            required: false,
            description: 'Mensaje del alert'
        },
        linkText: {
            type: 'string',
            required: false,
            description: 'Texto del enlace'
        },
        linkUrl: {
            type: 'string',
            required: false,
            description: 'URL del enlace'
        },
        linkTarget: {
            type: 'string',
            required: false,
            default: '_blank',
            options: Object.keys(LINK_TARGETS),
            description: 'Target del enlace'
        },
        padding: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(ALERT_SIZES),
            description: 'Padding del container'
        },
        shadow: {
            type: 'string',
            required: false,
            default: 'md',
            options: Object.keys(ALERT_SHADOWS),
            description: 'Sombra del container'
        }
    },

    variants: [
        {
            name: '💬 Alert básico',
            description: 'Alert simple con mensaje',
            code: `<Alert 
  type="info"
  title="Información"
  message="Este es un mensaje informativo básico."
/>`,
            props: {
                type: 'info',
                title: 'Información',
                message: 'Este es un mensaje informativo básico.'
            }
        },

        {
            name: '🎨 Diferentes tipos',
            description: 'Alerts con diferentes tipos y colores',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <Alert 
    type="info"
    title="Información"
    message="Datos importantes que debes conocer."
  />
  
  <Alert 
    type="success"
    title="¡Éxito!"
    message="La operación se completó correctamente."
  />
  
  <Alert 
    type="warning"
    title="Advertencia"
    message="Ten cuidado con esta acción."
  />
  
  <Alert 
    type="error"
    title="Error"
    message="Ha ocurrido un problema inesperado."
  />
</div>`,
            props: {
                type: 'success',
                title: '¡Éxito!',
                message: 'La operación se completó correctamente.'
            }
        },

        {
            name: '🔗 Alert con enlace',
            description: 'Alert que incluye un enlace en el mensaje',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <Alert 
    type="info"
    title="Más información"
    message="Para conocer más detalles visita"
    linkText="nuestra documentación"
    linkUrl="https://docs.example.com"
    linkTarget="_blank"
  />
  
  <Alert 
    type="error"
    title="Error de conexión"
    message="No se pudo conectar al servidor. Contacta con"
    linkText="soporte técnico"
    linkUrl="mailto:support@example.com"
    linkTarget="_self"
  />
  
  <Alert 
    type="success"
    title="¡Registro exitoso!"
    message="Tu cuenta ha sido creada. Ve a tu"
    linkText="panel de control"
    linkUrl="/dashboard"
    linkTarget="_self"
  />
</div>`,
            props: {
                type: 'info',
                title: 'Más información',
                message: 'Para conocer más detalles visita',
                linkText: 'nuestra documentación',
                linkUrl: 'https://docs.example.com',
                linkTarget: '_blank'
            }
        },

        {
            name: '🎯 Iconos personalizados',
            description: 'Alerts con iconos personalizados',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <Alert 
    type="info"
    icon="lightbulb"
    title="Consejo"
    message="Usa atajos de teclado para ser más eficiente."
  />
  
  <Alert 
    type="warning"
    icon="shield-alt"
    title="Seguridad"
    message="Tu sesión expirará en 5 minutos."
  />
  
  <Alert 
    type="success"
    icon="rocket"
    title="¡Lanzamiento!"
    message="Tu aplicación está ahora en producción."
  />
  
  <Alert 
    type="error"
    icon="skull"
    title="Error crítico"
    message="El sistema requiere reinicio inmediato."
  />
</div>`,
            props: {
                type: 'info',
                icon: 'lightbulb',
                title: 'Consejo',
                message: 'Usa atajos de teclado para ser más eficiente.'
            }
        },

        {
            name: '📏 Diferentes tamaños',
            description: 'Alerts con diferentes tamaños de padding',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <Alert 
    type="info"
    title="Padding pequeño"
    message="Alert compacto para espacios reducidos."
    padding="small"
    shadow="sm"
  />
  
  <Alert 
    type="success"
    title="Padding mediano"
    message="Alert estándar para uso general."
    padding="medium"
    shadow="md"
  />
  
  <Alert 
    type="warning"
    title="Padding grande"
    message="Alert prominente para mensajes importantes."
    padding="large"
    shadow="lg"
  />
</div>`,
            props: {
                type: 'success',
                title: 'Padding mediano',
                message: 'Alert estándar para uso general.',
                padding: 'medium',
                shadow: 'md'
            }
        },

        {
            name: '🌟 Casos de uso reales',
            description: 'Ejemplos de alerts en contextos reales',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
  
  {/* Confirmación de registro */}
  <Alert 
    type="success"
    icon="user-check"
    title="¡Bienvenido!"
    message="Tu cuenta ha sido creada exitosamente. Revisa tu email para confirmar y luego"
    linkText="inicia sesión"
    linkUrl="/login"
    linkTarget="_self"
    padding="large"
    shadow="lg"
  />
  
  {/* Error de validación */}
  <Alert 
    type="error"
    title="Error en el formulario"
    message="Hay campos con errores. Revisa la información y consulta"
    linkText="nuestra guía de ayuda"
    linkUrl="/help/forms"
    linkTarget="_blank"
  />
  
  {/* Mantenimiento programado */}
  <Alert 
    type="warning"
    icon="tools"
    title="Mantenimiento programado"
    message="El sistema estará en mantenimiento el domingo de 2:00 AM a 4:00 AM. Más detalles en"
    linkText="nuestro blog"
    linkUrl="https://blog.example.com/maintenance"
    linkTarget="_blank"
    padding="large"
  />
  
  {/* Notificación de actualización */}
  <Alert 
    type="info"
    icon="download"
    title="Nueva versión disponible"
    message="Hay una actualización disponible para mejorar tu experiencia."
    linkText="Actualizar ahora"
    linkUrl="/update"
    linkTarget="_self"
    padding="small"
    shadow="sm"
  />
  
  {/* Sesión expirando */}
  <Alert 
    type="warning"
    icon="clock"
    title="Sesión expirando"
    message="Tu sesión expirará en 5 minutos. ¿Deseas"
    linkText="extender la sesión"
    linkUrl="/extend-session"
    linkTarget="_self"
    padding="medium"
  />
  
</div>`,
            props: {
                type: 'success',
                icon: 'user-check',
                title: '¡Bienvenido!',
                message: 'Tu cuenta ha sido creada exitosamente. Revisa tu email para confirmar y luego',
                linkText: 'inicia sesión',
                linkUrl: '/login',
                linkTarget: '_self',
                padding: 'large',
                shadow: 'lg'
            }
        }
    ]
};

export default AlertConfig;
