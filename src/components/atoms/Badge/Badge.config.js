import Badge from './Badge.jsx';

export const BadgeConfig = {
    component: Badge,
    name: 'Badge',
    category: 'atoms',
    description: 'Componente de etiqueta versátil para estados, notificaciones, contadores y categorías con soporte para iconos, posicionamiento y funcionalidad dismissible.',

    variants: [
        {
            name: 'Badge básico',
            description: 'Badge simple con texto',
            code: `<Badge>Nuevo</Badge>`,
            props: {
                children: 'Nuevo'
            }
        },
        {
            name: 'Variantes de color',
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
            name: 'Badges con iconos',
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
            name: 'Diferentes tamaños',
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
            name: 'Diferentes formas',
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
            name: 'Badges con contador',
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
            name: 'Badges tipo punto',
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
            name: 'Badges dismissible',
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
            name: 'Badges posicionados',
            description: 'Badges overlay en diferentes posiciones',
            code: `<div style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
  <div style={{position: 'relative', width: '60px', height: '60px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <span>Elemento</span>
    <Badge count={3} variant="error" positioned position="top-right" />
  </div>
  <div style={{position: 'relative', width: '60px', height: '60px', background: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <span>Icono</span>
    <Badge dot variant="success" positioned position="top-left" />
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
            name: 'Estados de usuario',
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
            name: 'Categorías de contenido',
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
            name: 'Notificaciones complejas',
            description: 'Sistema completo de notificaciones',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
    <div style={{position: 'relative', padding: '10px', background: '#f9fafb', borderRadius: '8px'}}>
      <span>🔔 Notificaciones</span>
      <Badge count={12} variant="error" positioned position="top-right" />
    </div>
    <div style={{position: 'relative', padding: '10px', background: '#f9fafb', borderRadius: '8px'}}>
      <span>💬 Mensajes</span>
      <Badge count={3} variant="primary" positioned position="top-right" />
    </div>
  </div>
  <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
    <Badge variant="error" icon="exclamation-triangle" dismissible>
      Error crítico
    </Badge>
    <Badge variant="warning" icon="clock" dismissible>
      Tarea pendiente
    </Badge>
    <Badge variant="success" icon="check" dismissible>
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
        }
    ]
};

export default BadgeConfig;
