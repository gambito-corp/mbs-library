import Image from './Image.jsx';

export const ImageConfig = {
    component: Image,
    name: 'Image',
    category: 'atoms',
    description: 'Componente de imagen completo con dimensiones, bordes, sombras, filtros, efectos y optimizaciones.',

    props: {
        src: { type: 'string', required: true, description: 'URL de la imagen' },
        alt: { type: 'string', required: false, description: 'Texto alternativo' },
        w: { type: 'number', required: false, description: 'Ancho' },
        h: { type: 'number', required: false, description: 'Alto' },
        wType: { type: 'string', required: false, default: 'px', options: ['px', 'em', 'rem', '%', 'vw', 'vh'], description: 'Unidad del ancho' },
        hType: { type: 'string', required: false, default: 'px', options: ['px', 'em', 'rem', '%', 'vw', 'vh'], description: 'Unidad del alto' },
        borderRadius: { type: 'number', required: false, description: 'Radio del borde' },
        borderWidth: { type: 'number', required: false, description: 'Grosor del borde' },
        borderStyle: { type: 'string', required: false, default: 'solid', options: ['solid', 'dashed', 'dotted', 'double'], description: 'Estilo del borde' },
        borderColor: { type: 'string', required: false, default: '#000000', description: 'Color del borde' },
        shadowOffsetX: { type: 'number', required: false, default: 0, description: 'Desplazamiento X de la sombra' },
        shadowOffsetY: { type: 'number', required: false, default: 0, description: 'Desplazamiento Y de la sombra' },
        shadowBlur: { type: 'number', required: false, default: 0, description: 'Desenfoque de la sombra' },
        shadowColor: { type: 'string', required: false, default: '#000000', description: 'Color de la sombra' },
        shadowOpacity: { type: 'number', required: false, default: 0.3, description: 'Opacidad de la sombra' },
        objectFit: { type: 'string', required: false, default: 'cover', options: ['fill', 'contain', 'cover', 'none'], description: 'Ajuste de la imagen' },
        hoverEffect: { type: 'string', required: false, default: 'none', options: ['none', 'zoom', 'brightness', 'scale'], description: 'Efecto al hacer hover' },
        grayscale: { type: 'boolean', required: false, default: false, description: 'Escala de grises' },
        sepia: { type: 'boolean', required: false, default: false, description: 'Efecto sepia' },
        brightness: { type: 'number', required: false, default: 1, description: 'Brillo (0-2)' }
    },

    variants: [
        {
            name: '🖼️ Imagen básica',
            description: 'Imagen simple sin modificaciones',
            code: `<Image 
  src="https://picsum.photos/300/200?random=1" 
  alt="Imagen básica" 
/>`,
            props: {
                src: 'https://picsum.photos/300/200?random=1',
                alt: 'Imagen básica'
            }
        },

        {
            name: '📏 Dimensiones en píxeles',
            description: 'Control exacto de dimensiones usando píxeles',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Image 
    src="https://picsum.photos/400/300?random=2" 
    alt="100x75 px"
    w={100}
    h={75}
  />
  <Image 
    src="https://picsum.photos/400/300?random=3" 
    alt="150x100 px"
    w={150}
    h={100}
  />
  <Image 
    src="https://picsum.photos/400/300?random=4" 
    alt="200x150 px"
    w={200}
    h={150}
  />
</div>`,
            props: {
                src: 'https://picsum.photos/400/300?random=2',
                alt: '100x75 px',
                w: 100,
                h: 75
            }
        },

        {
            name: '📐 Unidades relativas',
            description: 'Dimensiones usando em, rem y porcentajes',
            code: `<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/400/300?random=5" 
      alt="10em ancho"
      w={10}
      wType="em"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>10em ancho</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/400/300?random=6" 
      alt="12rem ancho"
      w={12}
      wType="rem"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>12rem ancho</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/400/300?random=7" 
      alt="30% ancho"
      w={30}
      wType="%"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>30% ancho</p>
  </div>
</div>`,
            props: {
                src: 'https://picsum.photos/400/300?random=5',
                alt: '10em ancho',
                w: 10,
                wType: 'em'
            }
        },

        {
            name: '📱 Unidades viewport',
            description: 'Dimensiones responsive usando vw y vh',
            code: `<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/800/600?random=8" 
      alt="20vw ancho"
      w={20}
      wType="vw"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>20vw ancho</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/800/600?random=9" 
      alt="15vh alto"
      h={15}
      hType="vh"
      w={200}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>200px × 15vh</p>
  </div>
</div>`,
            props: {
                src: 'https://picsum.photos/800/600?random=8',
                alt: '20vw ancho',
                w: 20,
                wType: 'vw'
            }
        },

        {
            name: '🔘 Border radius',
            description: 'Diferentes valores de border-radius',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=10" 
      alt="Sin border-radius"
      w={100}
      h={100}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Sin radius</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=11" 
      alt="8px border-radius"
      w={100}
      h={100}
      borderRadius={8}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>8px radius</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=12" 
      alt="20px border-radius"
      w={100}
      h={100}
      borderRadius={20}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>20px radius</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=13" 
      alt="Círculo"
      w={100}
      h={100}
      borderRadius={50}
      borderRadiusType="%"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>50% (círculo)</p>
  </div>
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=10',
                alt: 'Border radius ejemplo',
                w: 100,
                h: 100,
                borderRadius: 8
            }
        },

        {
            name: '🔲 Bordes',
            description: 'Diferentes estilos y colores de borde',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=14" 
      alt="Borde sólido azul"
      w={100}
      h={100}
      borderWidth={3}
      borderStyle="solid"
      borderColor="#3b82f6"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Sólido azul</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=15" 
      alt="Borde discontinuo rojo"
      w={100}
      h={100}
      borderWidth={2}
      borderStyle="dashed"
      borderColor="#ef4444"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Discontinuo rojo</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=16" 
      alt="Borde punteado verde"
      w={100}
      h={100}
      borderWidth={4}
      borderStyle="dotted"
      borderColor="#10b981"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Punteado verde</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=17" 
      alt="Borde doble morado"
      w={100}
      h={100}
      borderWidth={6}
      borderStyle="double"
      borderColor="#8b5cf6"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Doble morado</p>
  </div>
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=14',
                alt: 'Borde sólido azul',
                w: 100,
                h: 100,
                borderWidth: 3,
                borderStyle: 'solid',
                borderColor: '#3b82f6'
            }
        },

        {
            name: '🌫️ Sombras',
            description: 'Diferentes tipos de sombras',
            code: `<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=18" 
      alt="Sombra suave"
      w={100}
      h={100}
      shadowOffsetX={3}
      shadowOffsetY={3}
      shadowBlur={8}
      shadowOpacity={0.2}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Sombra suave</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=19" 
      alt="Sombra intensa"
      w={100}
      h={100}
      shadowOffsetX={6}
      shadowOffsetY={6}
      shadowBlur={12}
      shadowColor="#3b82f6"
      shadowOpacity={0.4}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Sombra azul intensa</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=20" 
      alt="Sombra elegante"
      w={100}
      h={100}
      shadowOffsetY={8}
      shadowBlur={20}
      shadowOpacity={0.15}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Sombra elegante</p>
  </div>
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=18',
                alt: 'Sombra suave',
                w: 100,
                h: 100,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 8,
                shadowOpacity: 0.2
            }
        },

        {
            name: '🎯 Object fit',
            description: 'Diferentes modos de ajuste de imagen',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/400/300?random=21" 
      alt="object-fit: cover"
      w={120}
      h={80}
      objectFit="cover"
      borderRadius={8}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>cover</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/400/300?random=22" 
      alt="object-fit: contain"
      w={120}
      h={80}
      objectFit="contain"
      borderRadius={8}
      borderWidth={1}
      borderColor="#e5e7eb"
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>contain</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/400/300?random=23" 
      alt="object-fit: fill"
      w={120}
      h={80}
      objectFit="fill"
      borderRadius={8}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>fill</p>
  </div>
</div>`,
            props: {
                src: 'https://picsum.photos/400/300?random=21',
                alt: 'object-fit: cover',
                w: 120,
                h: 80,
                objectFit: 'cover',
                borderRadius: 8
            }
        },

        {
            name: '🎨 Filtros CSS',
            description: 'Efectos visuales con filtros',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=24" 
      alt="Original"
      w={100}
      h={100}
      borderRadius={8}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Original</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=24" 
      alt="Escala de grises"
      w={100}
      h={100}
      grayscale={true}
      borderRadius={8}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Escala de grises</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=24" 
      alt="Efecto sepia"
      w={100}
      h={100}
      sepia={true}
      borderRadius={8}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Efecto sepia</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <Image 
      src="https://picsum.photos/200/200?random=24" 
      alt="Más brillo"
      w={100}
      h={100}
      brightness={1.4}
      borderRadius={8}
    />
    <p style={{fontSize: '12px', color: '#6b7280'}}>Más brillo</p>
  </div>
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=24',
                alt: 'Filtros CSS',
                w: 100,
                h: 100,
                grayscale: true,
                borderRadius: 8
            }
        },

        {
            name: '👤 Avatar circular',
            description: 'Imagen de perfil circular con borde y sombra',
            code: `<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <Image 
    src="https://picsum.photos/200/200?random=28" 
    alt="Avatar pequeño"
    w={60}
    h={60}
    borderRadius={50}
    borderRadiusType="%"
    borderWidth={2}
    borderColor="#10b981"
    shadowOffsetY={2}
    shadowBlur={8}
    shadowColor="#10b981"
    shadowOpacity={0.3}
    objectFit="cover"
  />
  <Image 
    src="https://picsum.photos/200/200?random=29" 
    alt="Avatar mediano"
    w={80}
    h={80}
    borderRadius={50}
    borderRadiusType="%"
    borderWidth={3}
    borderColor="#3b82f6"
    shadowOffsetY={4}
    shadowBlur={12}
    shadowColor="#3b82f6"
    shadowOpacity={0.3}
    hoverEffect="scale"
    objectFit="cover"
  />
  <Image 
    src="https://picsum.photos/200/200?random=30" 
    alt="Avatar grande"
    w={100}
    h={100}
    borderRadius={50}
    borderRadiusType="%"
    borderWidth={4}
    borderColor="#f59e0b"
    shadowOffsetY={6}
    shadowBlur={16}
    shadowColor="#f59e0b"
    shadowOpacity={0.3}
    hoverEffect="zoom"
    objectFit="cover"
  />
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=28',
                alt: 'Avatar circular',
                w: 80,
                h: 80,
                borderRadius: 50,
                borderRadiusType: '%',
                borderWidth: 3,
                borderColor: '#3b82f6',
                shadowOffsetY: 4,
                shadowBlur: 12,
                shadowColor: '#3b82f6',
                shadowOpacity: 0.3,
                hoverEffect: 'scale',
                objectFit: 'cover'
            }
        },

        {
            name: '🎴 Card moderna',
            description: 'Imagen estilo card con sombra elegante',
            code: `<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <Image 
    src="https://picsum.photos/300/200?random=31" 
    alt="Card pequeña"
    w={150}
    h={100}
    borderRadius={12}
    borderWidth={1}
    borderColor="#e5e7eb"
    shadowOffsetY={4}
    shadowBlur={12}
    shadowOpacity={0.1}
    hoverEffect="zoom"
    objectFit="cover"
  />
  <Image 
    src="https://picsum.photos/300/200?random=32" 
    alt="Card elegante"
    w={200}
    h={130}
    borderRadius={16}
    shadowOffsetY={8}
    shadowBlur={24}
    shadowOpacity={0.15}
    hoverEffect="brightness"
    objectFit="cover"
  />
</div>`,
            props: {
                src: 'https://picsum.photos/300/200?random=31',
                alt: 'Card moderna',
                w: 150,
                h: 100,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                shadowOffsetY: 4,
                shadowBlur: 12,
                shadowOpacity: 0.1,
                hoverEffect: 'zoom',
                objectFit: 'cover'
            }
        },

        {
            name: '🌟 Efecto neón',
            description: 'Imagen con sombra colorida brillante',
            code: `<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <Image 
    src="https://picsum.photos/200/200?random=33" 
    alt="Neón azul"
    w={120}
    h={120}
    borderRadius={16}
    shadowOffsetX={0}
    shadowOffsetY={0}
    shadowBlur={20}
    shadowColor="#3b82f6"
    shadowOpacity={0.6}
    hoverEffect="brightness"
    objectFit="cover"
  />
  <Image 
    src="https://picsum.photos/200/200?random=34" 
    alt="Neón morado"
    w={120}
    h={120}
    borderRadius={16}
    shadowOffsetX={0}
    shadowOffsetY={0}
    shadowBlur={25}
    shadowColor="#8b5cf6"
    shadowOpacity={0.7}
    hoverEffect="scale"
    objectFit="cover"
  />
  <Image 
    src="https://picsum.photos/200/200?random=35" 
    alt="Neón verde"
    w={120}
    h={120}
    borderRadius={16}
    shadowOffsetX={0}
    shadowOffsetY={0}
    shadowBlur={20}
    shadowColor="#10b981"
    shadowOpacity={0.6}
    hoverEffect="zoom"
    objectFit="cover"
  />
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=33',
                alt: 'Efecto neón',
                w: 120,
                h: 120,
                borderRadius: 16,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                shadowColor: '#8b5cf6',
                shadowOpacity: 0.6,
                hoverEffect: 'brightness',
                objectFit: 'cover'
            }
        },

        {
            name: '📸 Estilo polaroid',
            description: 'Imagen con borde blanco y sombra vintage',
            code: `<div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
  <Image 
    src="https://picsum.photos/200/200?random=36" 
    alt="Polaroid normal"
    w={120}
    h={120}
    borderWidth={8}
    borderColor="#ffffff"
    shadowOffsetX={2}
    shadowOffsetY={8}
    shadowBlur={16}
    shadowOpacity={0.15}
    hoverEffect="scale"
  />
  <Image 
    src="https://picsum.photos/200/200?random=37" 
    alt="Polaroid sepia"
    w={120}
    h={120}
    borderWidth={10}
    borderColor="#ffffff"
    shadowOffsetX={3}
    shadowOffsetY={10}
    shadowBlur={20}
    shadowOpacity={0.2}
    sepia={true}
    hoverEffect="zoom"
  />
</div>`,
            props: {
                src: 'https://picsum.photos/200/200?random=36',
                alt: 'Estilo polaroid',
                w: 120,
                h: 120,
                borderWidth: 8,
                borderColor: '#ffffff',
                shadowOffsetX: 2,
                shadowOffsetY: 8,
                shadowBlur: 16,
                shadowOpacity: 0.15,
                hoverEffect: 'scale'
            }
        },

        {
            name: '🖼️ Banner responsive',
            description: 'Imagen banner que se adapta al contenedor',
            code: `<Image 
  src="https://picsum.photos/1200/400?random=38" 
  alt="Banner responsive"
  w={100}
  wType="%"
  h={200}
  borderRadius={16}
  shadowOffsetY={12}
  shadowBlur={24}
  shadowOpacity={0.15}
  hoverEffect="brightness"
  objectFit="cover"
/>`,
            props: {
                src: 'https://picsum.photos/1200/400?random=38',
                alt: 'Banner responsive',
                w: 100,
                wType: '%',
                h: 200,
                borderRadius: 16,
                shadowOffsetY: 12,
                shadowBlur: 24,
                shadowOpacity: 0.15,
                hoverEffect: 'brightness',
                objectFit: 'cover'
            }
        }
    ]
};

export default ImageConfig;
