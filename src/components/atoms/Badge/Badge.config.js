import Badge from './Badge.jsx';
import { BADGE_VARIANTS, BADGE_SIZES, BADGE_SHAPES, BADGE_POSITIONS } from './Badge.constants.js';

export const BadgeConfig = {
    component: Badge,
    name: 'Badge',
    category: 'atoms',
    description: 'Componente de etiqueta versátil para estados, notificaciones, contadores y categorías con soporte para iconos, posicionamiento y funcionalidad dismissible.',

    props: {
        children: {
            type: 'ReactNode',
            required: false,
            description: 'Contenido del badge (texto, elementos, etc.)'
        },
        count: {
            type: 'number',
            required: false,
            description: 'Número a mostrar en el badge'
        },
        variant: {
            type: 'string',
            required: false,
            default: 'default',
            options: Object.keys(BADGE_VARIANTS),
            description: 'Variante visual del badge'
        },
        size: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(BADGE_SIZES),
            description: 'Tamaño del badge'
        },
        shape: {
            type: 'string',
            required: false,
            default: 'rounded',
            options: Object.keys(BADGE_SHAPES),
            description: 'Forma del badge'
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
            options: ['left', 'right'],
            description: 'Posición del icono relativa al texto'
        },
        dismissible: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Si el badge se puede cerrar'
        },
        onDismiss: {
            type: 'function',
            required: false,
            description: 'Función ejecutada al cerrar el badge'
        },
        positioned: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Si el badge está posicionado como overlay'
        },
        position: {
            type: 'string',
            required: false,
            default: 'top-right',
            options: Object.keys(BADGE_POSITIONS),
            description: 'Posición del badge cuando está positioned'
        },
        dot: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Si el badge es tipo punto'
        },
        invisible: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Si el badge está oculto'
        },
        showZero: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Si mostrar el badge cuando count es 0'
        },
        max: {
            type: 'number',
            required: false,
            default: 99,
            description: 'Valor máximo para count antes de mostrar "+"'
        },
        onClick: {
            type: 'function',
            required: false,
            description: 'Función ejecutada al hacer click en el badge'
        }
    },

    variants: [
        {
            name: '🏷️ Badge básico',
            description: 'Badge simple con texto',
            code: `<Badge>Nuevo</Badge>`,
            props: {
                children: 'Nuevo'
            }
        },
        {
            name: '🎨 Variantes de color',
            description: 'Diferentes variantes de color para estados',
            code: `<div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
  <Badge variant="default">Por defecto</Badge>
  <Badge variant="primary">Primario</Badge>
  <Badge variant="success">Éxito</Badge>
  <Badge variant="warning">Advertencia</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="info">Información</Badge>
</div>`,
            props: {
                variant: 'primary',
                children: 'Primario'
            }
        },
        {
            name: '🎯 Badges con iconos',
            description: 'Badges con iconos en diferentes posiciones',
            code: `<div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
  <Badge variant="success" icon="check">Completado</Badge>
  <Badge variant="warning" icon="clock">Pendiente</Badge>
  <Badge variant="error" icon="times">Error</Badge>
  <Badge variant="info" icon="info-circle" iconPosition="right">Información</Badge>
</div>`,
            props: {
                variant: 'success',
                icon: 'check',
                children: 'Completado'
            }
        },
        {
            name: '📏 Diferentes tamaños',
            description: 'Badges en diferentes tamaños',
            code: `<div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
  <Badge size="small" variant="primary">Pequeño</Badge>
  <Badge size="medium" variant="primary">Mediano</Badge>
  <Badge size="large" variant="primary">Grande</Badge>
</div>`,
            props: {
                size: 'medium',
                variant: 'primary',
                children: 'Mediano'
            }
        },
        {
            name: '🔷 Diferentes formas',
            description: 'Badges con diferentes formas',
            code: `<div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
  <Badge shape="square" variant="primary">Cuadrado</Badge>
  <Badge shape="rounded" variant="success">Redondeado</Badge>
  <Badge shape="pill" variant="warning">Píldora</Badge>
</div>`,
            props: {
                shape: 'rounded',
                variant: 'success',
                children: 'Redondeado'
            }
        },
        {
            name: '🔢 Badges con contador',
            description: 'Badges numéricos para contadores',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Badge count={5} variant="error" />
  <Badge count={23} variant="primary" />
  <Badge count={150} max={99} variant="success" />
  <Badge count={0} showZero={true} variant="warning" />
</div>`,
            props: {
                count: 5,
                variant: 'error'
            }
        },
        {
            name: '⚫ Badges tipo punto',
            description: 'Badges minimalistas tipo punto',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Badge dot variant="error" />
  <Badge dot variant="success" />
  <Badge dot variant="warning" />
  <Badge dot variant="primary" />
</div>`,
            props: {
                dot: true,
                variant: 'error'
            }
        },
        {
            name: '❌ Badges dismissible',
            description: 'Badges que se pueden cerrar',
            code: `<div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
  <Badge variant="primary" dismissible onDismiss={() => alert('Badge cerrado!')}>
    Etiqueta 1
  </Badge>
  <Badge variant="success" icon="tag" dismissible onDismiss={() => alert('Tag removido!')}>
    Frontend
  </Badge>
  <Badge variant="warning" dismissible onDismiss={() => alert('Categoría eliminada!')}>
    JavaScript
  </Badge>
</div>`,
            props: {
                variant: 'primary',
                dismissible: true,
                onDismiss: () => alert('Badge cerrado!'),
                children: 'Etiqueta 1'
            }
        },
        {
            name: '📍 Badges posicionados',
            description: 'Badges overlay en diferentes posiciones',
            code: `<div style={{display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
  <div style={{position: 'relative', width: '80px', height: '80px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '500', color: '#6b7280', border: '2px dashed #d1d5db'}}>
    <span>Elemento</span>
    <Badge count={3} variant="error" positioned position="top-right" />
  </div>
  <div style={{position: 'relative', width: '80px', height: '80px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '500', color: '#6b7280', border: '2px dashed #d1d5db'}}>
    <span>Icono</span>
    <Badge dot variant="success" positioned position="top-left" />
  </div>
  <div style={{position: 'relative', width: '80px', height: '80px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '500', color: '#6b7280', border: '2px dashed #d1d5db'}}>
    <span>Botón</span>
    <Badge count={99} max={99} variant="primary" positioned position="bottom-right" />
  </div>
  <div style={{position: 'relative', width: '80px', height: '80px', background: '#f3f4f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '500', color: '#6b7280', border: '2px dashed #d1d5db'}}>
    <span>Avatar</span>
    <Badge dot variant="warning" positioned position="bottom-left" />
  </div>
</div>`,
            props: {
                count: 3,
                variant: 'error',
                positioned: true,
                position: 'top-right'
            }
        },
        {
            name: '👤 Estados de usuario',
            description: 'Badges para estados de usuario',
            code: `<div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
  <Badge variant="success" icon="check-circle">Activo</Badge>
  <Badge variant="warning" icon="clock">Ausente</Badge>
  <Badge variant="error" icon="times-circle">Inactivo</Badge>
  <Badge variant="info" icon="user">Invitado</Badge>
  <Badge variant="dark" icon="crown">Admin</Badge>
</div>`,
            props: {
                variant: 'success',
                icon: 'check-circle',
                children: 'Activo'
            }
        },
        {
            name: '🏷️ Categorías de contenido',
            description: 'Badges para categorizar contenido',
            code: `<div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
  <Badge variant="primary" shape="pill">React</Badge>
  <Badge variant="success" shape="pill">JavaScript</Badge>
  <Badge variant="warning" shape="pill">CSS</Badge>
  <Badge variant="info" shape="pill">HTML</Badge>
  <Badge variant="secondary" shape="pill">Node.js</Badge>
</div>`,
            props: {
                variant: 'primary',
                shape: 'pill',
                children: 'React'
            }
        },
        {
            name: '🔔 Sistema de notificaciones',
            description: 'Sistema completo de notificaciones con badges posicionados',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '30px', padding: '20px'}}>
  <div style={{display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{position: 'relative', padding: '16px 24px', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '16px', fontWeight: '600', color: '#374151', minWidth: '120px', textAlign: 'center'}}>
      🔔 Notificaciones
      <Badge count={12} variant="error" positioned position="top-right" />
    </div>
    <div style={{position: 'relative', padding: '16px 24px', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '16px', fontWeight: '600', color: '#374151', minWidth: '120px', textAlign: 'center'}}>
      💬 Mensajes
      <Badge count={3} variant="primary" positioned position="top-right" />
    </div>
    <div style={{position: 'relative', padding: '16px 24px', background: '#f9fafb', borderRadius: '12px', border: '2px solid #e5e7eb', fontSize: '16px', fontWeight: '600', color: '#374151', minWidth: '120px', textAlign: 'center'}}>
      📧 Email
      <Badge dot variant="success" positioned position="top-right" />
    </div>
  </div>
  <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center'}}>
    <Badge variant="error" icon="exclamation-triangle" dismissible onDismiss={() => alert('Error cerrado')}>
      Error crítico
    </Badge>
    <Badge variant="warning" icon="clock" dismissible onDismiss={() => alert('Tarea cerrada')}>
      Tarea pendiente
    </Badge>
    <Badge variant="success" icon="check" dismissible onDismiss={() => alert('Completado cerrado')}>
      Completado
    </Badge>
  </div>
</div>`,
            props: {
                count: 12,
                variant: 'error',
                positioned: true,
                position: 'top-right'
            }
        },
        {
            name: '🎮 Casos de uso avanzados',
            description: 'Combinaciones avanzadas de badges',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px'}}>
  <div style={{display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap'}}>
    <div style={{position: 'relative', width: '60px', height: '60px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px'}}>
      👤
      <Badge dot variant="success" positioned position="bottom-right" />
    </div>
    <div style={{position: 'relative', padding: '12px', background: '#3b82f6', borderRadius: '8px', color: 'white', fontWeight: '600'}}>
      🛒 Carrito
      <Badge count={7} variant="warning" positioned position="top-right" />
    </div>
    <div style={{position: 'relative', padding: '12px', background: '#10b981', borderRadius: '8px', color: 'white', fontWeight: '600'}}>
      ⭐ Favoritos
      <Badge count={23} variant="error" positioned position="top-left" />
    </div>
  </div>
  <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
    <Badge variant="primary" size="small" shape="pill">v2.1.0</Badge>
    <Badge variant="success" icon="check" size="small">Verificado</Badge>
    <Badge variant="warning" icon="star" size="small">Premium</Badge>
    <Badge variant="error" size="small" dismissible onDismiss={() => alert('Beta cerrado')}>Beta</Badge>
  </div>
</div>`,
            props: {
                dot: true,
                variant: 'success',
                positioned: true,
                position: 'bottom-right'
            }
        }
    ]
};

export default BadgeConfig;
