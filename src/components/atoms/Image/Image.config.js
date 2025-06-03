import React from 'react'; // ✅ AGREGAR ESTA LÍNEA
import Image from './Image.jsx';
import Badge from '../Badge/Badge.jsx';
import { IMAGE_VARIANTS, IMAGE_SIZES, IMAGE_SHAPES, AVATAR_STATUS } from './Image.constants.js';

export const ImageConfig = {
    component: Image,
    name: 'Image',
    category: 'atoms',
    description: 'Componente de imagen versátil con soporte para avatares, galerías, lazy loading, fallbacks y estados de carga. Incluye variaciones específicas para diferentes casos de uso.',

    props: {
        src: {
            type: 'string',
            required: false,
            description: 'URL de la imagen'
        },
        alt: {
            type: 'string',
            required: false,
            description: 'Texto alternativo para accesibilidad'
        },
        variant: {
            type: 'string',
            required: false,
            default: 'thumbnail',
            options: Object.keys(IMAGE_VARIANTS),
            description: 'Variante del componente imagen'
        },
        size: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(IMAGE_SIZES),
            description: 'Tamaño de la imagen'
        },
        shape: {
            type: 'string',
            required: false,
            default: 'rounded',
            options: Object.keys(IMAGE_SHAPES),
            description: 'Forma de la imagen'
        },
        status: {
            type: 'string',
            required: false,
            options: Object.keys(AVATAR_STATUS),
            description: 'Estado del avatar (solo para variant="avatar")'
        },
        name: {
            type: 'string',
            required: false,
            description: 'Nombre para generar iniciales en fallback'
        },
        badge: {
            type: 'ReactNode',
            required: false,
            description: 'Badge component para overlay'
        },
        fallback: {
            type: 'string',
            required: false,
            default: 'placeholder',
            options: ['initials', 'icon', 'placeholder', 'skeleton'],
            description: 'Tipo de fallback cuando la imagen falla'
        },
        fallbackIcon: {
            type: 'string',
            required: false,
            default: 'user',
            description: 'Icono a mostrar en fallback tipo "icon"'
        },
        loading: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Estado de carga manual'
        },
        lazy: {
            type: 'boolean',
            required: false,
            default: true,
            description: 'Activar lazy loading'
        },
        hover: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Efectos hover'
        },
        onClick: {
            type: 'function',
            required: false,
            description: 'Función ejecutada al hacer click'
        }
    },

    variants: [
        {
            name: '🖼️ Imagen básica',
            description: 'Imagen simple con diferentes tamaños',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Image 
    src="https://picsum.photos/200/200?random=1" 
    alt="Imagen ejemplo"
    size="small"
  />
  <Image 
    src="https://picsum.photos/200/200?random=2" 
    alt="Imagen ejemplo"
    size="medium"
  />
  <Image 
    src="https://picsum.photos/200/200?random=3" 
    alt="Imagen ejemplo"
    size="large"
  />
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=1',
                alt: 'Imagen ejemplo',
                size: 'medium'
            }
        },
        {
            name: '👤 Avatares básicos',
            description: 'Avatares con diferentes tamaños',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=10" 
    alt="Pedro García"
    size="small"
  />
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=11" 
    alt="Ana López"
    size="medium"
  />
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=12" 
    alt="Carlos Ruiz"
    size="large"
  />
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=13" 
    alt="María González"
    size="xl"
  />
</div>`,
            props: {
                variant: 'avatar',
                src: 'https://picsum.photos/200/200?random=10',
                alt: 'Pedro García',
                size: 'medium'
            }
        },
        {
            name: '🟢 Avatares con estado',
            description: 'Avatares mostrando estado de conexión',
            code: `<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=20" 
    alt="Usuario online"
    status="online"
    size="large"
  />
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=21" 
    alt="Usuario ausente"
    status="away"
    size="large"
  />
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=22" 
    alt="Usuario ocupado"
    status="busy"
    size="large"
  />
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=23" 
    alt="Usuario offline"
    status="offline"
    size="large"
  />
</div>`,
            props: {
                variant: 'avatar',
                src: 'https://picsum.photos/200/200?random=20',
                alt: 'Usuario online',
                status: 'online',
                size: 'large'
            }
        },
        {
            name: '🏷️ Avatares con badges',
            description: 'Avatares con badges de notificación',
            code: `<div style={{display: 'flex', gap: '25px', alignItems: 'center'}}>
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=30" 
    alt="Usuario con notificaciones"
    status="online"
    badge={<Badge count={3} variant="error" positioned />}
    size="large"
  />
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=31" 
    alt="Usuario verificado"
    status="online"
    badge={<Badge dot variant="success" positioned />}
    size="large"
  />
  <Image 
    variant="avatar"
    src="https://picsum.photos/200/200?random=32" 
    alt="Usuario premium"
    badge={<Badge variant="warning" positioned>VIP</Badge>}
    size="large"
  />
</div>`,
            props: {
                variant: 'avatar',
                src: 'https://picsum.photos/200/200?random=30',
                alt: 'Usuario con notificaciones',
                status: 'online',
                badge: React.createElement(Badge, { count: 3, variant: 'error', positioned: true }),
                size: 'large'
            }
        },
        {
            name: '🔤 Fallback con iniciales',
            description: 'Avatares usando iniciales cuando no hay imagen',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Image 
    variant="avatar"
    name="Pedro García"
    fallback="initials"
    status="online"
    size="small"
  />
  <Image 
    variant="avatar"
    name="Ana López"
    fallback="initials"
    status="away"
    size="medium"
  />
  <Image 
    variant="avatar"
    name="Carlos Ruiz"
    fallback="initials"
    status="busy"
    size="large"
  />
  <Image 
    variant="avatar"
    name="María González"
    fallback="initials"
    status="offline"
    size="xl"
  />
</div>`,
            props: {
                variant: 'avatar',
                name: 'Pedro García',
                fallback: 'initials',
                status: 'online',
                size: 'medium'
            }
        },
        {
            name: '🔧 Diferentes fallbacks',
            description: 'Tipos de fallback cuando la imagen no carga',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Image 
    src="imagen-rota.jpg"
    fallback="placeholder"
    size="medium"
    alt="Placeholder"
  />
  <Image 
    src="imagen-rota.jpg"
    fallback="icon"
    fallbackIcon="camera"
    size="medium"
    alt="Icono"
  />
  <Image 
    variant="avatar"
    name="Usuario"
    fallback="initials"
    size="medium"
    alt="Iniciales"
  />
  <Image 
    src="imagen-rota.jpg"
    fallback="skeleton"
    size="medium"
    alt="Skeleton"
  />
</div>`,
            props: {
                src: 'imagen-rota.jpg',
                fallback: 'placeholder',
                size: 'medium',
                alt: 'Placeholder'
            }
        },
        {
            name: '🖼️ Diferentes formas',
            description: 'Imágenes con diferentes formas geométricas',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Image 
    src="https://picsum.photos/200/200?random=40" 
    shape="square"
    size="medium"
    alt="Cuadrada"
  />
  <Image 
    src="https://picsum.photos/200/200?random=41" 
    shape="rounded"
    size="medium"
    alt="Redondeada"
  />
  <Image 
    src="https://picsum.photos/200/200?random=42" 
    shape="circle"
    size="medium"
    alt="Circular"
  />
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=40',
                shape: 'square',
                size: 'medium',
                alt: 'Cuadrada'
            }
        },
        {
            name: '🎨 Variantes de imagen',
            description: 'Diferentes tipos de imagen según su uso',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
    <Image 
      variant="thumbnail"
      src="https://picsum.photos/200/200?random=50" 
      size="small"
      alt="Thumbnail"
    />
    <Image 
      variant="product"
      src="https://picsum.photos/200/200?random=51" 
      size="medium"
      hover={true}
      alt="Producto"
    />
    <Image 
      variant="gallery"
      src="https://picsum.photos/200/200?random=52" 
      size="large"
      alt="Galería"
    />
  </div>
  <Image 
    variant="hero"
    src="https://picsum.photos/800/200?random=53" 
    alt="Hero image"
    style={{width: '100%', maxWidth: '400px'}}
  />
</div>`,
            props: {
                variant: 'thumbnail',
                src: 'https://picsum.photos/200/200?random=50',
                size: 'small',
                alt: 'Thumbnail'
            }
        },
        {
            name: '⚡ Estados de carga',
            description: 'Diferentes estados de carga y error',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Image 
    src="https://picsum.photos/200/200?random=60" 
    loading={true}
    size="medium"
    alt="Cargando"
  />
  <Image 
    src="imagen-que-no-existe.jpg"
    size="medium"
    alt="Error"
  />
  <Image 
    src="https://picsum.photos/200/200?random=61" 
    lazy={false}
    size="medium"
    alt="Sin lazy loading"
  />
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=60',
                loading: true,
                size: 'medium',
                alt: 'Cargando'
            }
        },
        {
            name: '👥 Sistema de usuarios completo',
            description: 'Sistema completo de avatares para una aplicación',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '25px', padding: '20px'}}>
  <div style={{display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap'}}>
    <Image 
      variant="avatar"
      src="https://picsum.photos/200/200?random=70" 
      alt="Admin"
      status="online"
      badge={<Badge variant="dark" positioned>Admin</Badge>}
      size="large"
    />
    <Image 
      variant="avatar"
      src="https://picsum.photos/200/200?random=71" 
      alt="Moderador"
      status="away"
      badge={<Badge variant="warning" positioned>Mod</Badge>}
      size="large"
    />
    <Image 
      variant="avatar"
      name="Usuario Premium"
      fallback="initials"
      status="online"
      badge={<Badge variant="success" positioned>VIP</Badge>}
      size="large"
    />
    <Image 
      variant="avatar"
      src="https://picsum.photos/200/200?random=72" 
      alt="Usuario regular"
      status="busy"
      size="large"
    />
  </div>
  <div style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
    <Image 
      variant="avatar"
      name="Pedro García"
      fallback="initials"
      status="online"
      size="small"
    />
    <Image 
      variant="avatar"
      name="Ana López"
      fallback="initials"
      status="away"
      size="small"
    />
    <Image 
      variant="avatar"
      name="Carlos Ruiz"
      fallback="initials"
      status="offline"
      size="small"
    />
    <span style={{color: '#6b7280', fontSize: '14px'}}>+5 más</span>
  </div>
</div>`,
            props: {
                variant: 'avatar',
                src: 'https://picsum.photos/200/200?random=70',
                alt: 'Admin',
                status: 'online',
                badge: React.createElement(Badge, { count: 3, variant: 'error', positioned: true }),
                size: 'large'
            }
        }
    ]
};

export default ImageConfig;
