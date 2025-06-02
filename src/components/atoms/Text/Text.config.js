import Text from './Text.jsx';

export const TextConfig = {
    component: Text,
    name: 'Text',
    category: 'atoms',
    description: 'Componente de texto versátil con efectos especiales',

    // ✅ EJEMPLOS AGRUPADOS POR CATEGORÍAS
    variants: [
        // ===== GRUPO 1: VARIANTES BÁSICAS =====
        {
            name: '📝 Variantes básicas',
            description: 'Estilos fundamentales de texto',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
  <Text variant="default">Texto por defecto</Text>
  <Text variant="bold">Texto en negrita</Text>
  <Text variant="bolder">Texto extra negrita</Text>
  <Text variant="light">Texto ligero</Text>
  <Text variant="cursiva">Texto en cursiva</Text>
  <Text variant="subrayado">Texto subrayado</Text>
  <Text variant="muted">Texto silenciado</Text>
  <Text variant="tiny">Texto diminuto</Text>
</div>`,
            props: {
                variant: 'default',
                children: 'Texto por defecto'
            }
        },

        // ===== GRUPO 2: TAMAÑOS =====
        {
            name: '📏 Escalas de tamaño',
            description: 'Diferentes tamaños disponibles',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
  <Text size="xs">Extra pequeño (xs)</Text>
  <Text size="small">Pequeño (small)</Text>
  <Text size="medium">Mediano (medium)</Text>
  <Text size="large">Grande (large)</Text>
  <Text size="xlarge">Extra grande (xlarge)</Text>
  <Text size="2xl">2X Grande (2xl)</Text>
</div>`,
            props: {
                size: 'medium',
                children: 'Mediano (medium)'
            }
        },

        // ===== GRUPO 3: COLORES =====
        {
            name: '🎨 Sistema de colores',
            description: 'Paleta de colores disponibles',
            code: `<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px'}}>
  <Text color="primary">Primario</Text>
  <Text color="secondary">Secundario</Text>
  <Text color="success">Éxito</Text>
  <Text color="warning">Advertencia</Text>
  <Text color="error">Error</Text>
  <Text color="info">Información</Text>
  <Text color="black">Negro</Text>
  <Text color="white" style={{background: '#000', padding: '4px', borderRadius: '4px'}}>Blanco</Text>
</div>`,
            props: {
                color: 'primary',
                children: 'Primario'
            }
        },

        // ===== GRUPO 4: EFECTOS DEGRADADO =====
        {
            name: '🌈 Efectos degradado',
            description: 'Degradados estáticos y animados',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  <Text variant="gradient" size="2xl">✨ Degradado estático</Text>
  <Text variant="gradient-animated" size="xlarge">🌈 Degradado animado</Text>
  <Text variant="gradient" gradientFrom="#ff0000" gradientTo="#0000ff" size="large">
    🔴 Rojo a Azul personalizado 🔵
  </Text>
  <Text variant="gradient-animated" gradientFrom="#00ff00" gradientTo="#ff00ff" size="large">
    🟢 Verde a Rosa animado 🟣
  </Text>
</div>`,
            props: {
                variant: 'gradient',
                size: '2xl',
                children: '✨ Degradado estático'
            }
        },

        // ===== GRUPO 5: EFECTOS NEÓN =====
        {
            name: '⚡ Efectos neón',
            description: 'Texto brillante con diferentes colores neón',
            code: `<div style={{background: '#000', padding: '20px', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
  <Text variant="neon" neonColor="cyan" size="large">CIAN</Text>
  <Text variant="neon" neonColor="pink" size="large">ROSA</Text>
  <Text variant="neon" neonColor="green" size="large">VERDE</Text>
  <Text variant="neon" neonColor="orange" size="large">NARANJA</Text>
  <Text variant="neon" neonColor="purple" size="large">PÚRPURA</Text>
  <Text variant="neon" neonColor="yellow" size="large">AMARILLO</Text>
  <Text variant="neon" neonColor="red" size="large">ROJO</Text>
  <Text variant="neon" neonColor="blue" size="large">AZUL</Text>
</div>`,
            props: {
                variant: 'neon',
                neonColor: 'cyan',
                size: 'large',
                children: 'CIAN'
            }
        },

        // ===== GRUPO 6: TYPEWRITER BÁSICO =====
        {
            name: '⌨️ Máquina de escribir',
            description: 'Efecto typewriter con diferentes configuraciones',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  <Text variant="typewriter" typewriterSpeed={100}>
    Texto que se escribe lentamente...
  </Text>
  <Text variant="typewriter" typewriterSpeed={50} size="large">
    ¡Texto más rápido en tamaño grande!
  </Text>
  <Text variant="typewriter" typewriterLoop={true} typewriterSpeed={80} typewriterPause={300}>
    🔄 Este texto se repite automáticamente
  </Text>
</div>`,
            props: {
                variant: 'typewriter',
                typewriterSpeed: 100,
                children: 'Texto que se escribe lentamente...'
            }
        },

        // ===== GRUPO 7: TYPEWRITER CON HTML =====
        {
            name: '⌨️ Typewriter + HTML',
            description: 'Máquina de escribir con contenido HTML enriquecido',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  <Text 
    variant="typewriter" 
    htmlContent={true}
    typewriterSpeed={60}
  >
    Este texto tiene &lt;strong&gt;negritas&lt;/strong&gt; y &lt;em&gt;cursivas&lt;/em&gt; con &lt;span style="color: red"&gt;colores&lt;/span&gt;
  </Text>
  <Text 
    variant="typewriter" 
    htmlContent={true}
    typewriterSpeed={40}
    size="large"
  >
    Código: &lt;code style="background: #f0f0f0; padding: 2px 4px; borderRadius: 4px"&gt;console.log('Hello World')&lt;/code&gt;
  </Text>
</div>`,
            props: {
                variant: 'typewriter',
                htmlContent: true,
                typewriterSpeed: 60,
                children: 'Este texto tiene <strong>negritas</strong> y <em>cursivas</em> con <span style="color: red">colores</span>'
            }
        },

        // ===== GRUPO 8: ELEMENTOS SEMÁNTICOS =====
        {
            name: '🏷️ Elementos semánticos',
            description: 'Texto como diferentes elementos HTML',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
  <Text as="h1" size="2xl" variant="bold">Título H1 Principal</Text>
  <Text as="h2" size="xlarge" variant="bold">Subtítulo H2</Text>
  <Text as="h3" size="large" variant="bold">Sección H3</Text>
  <Text as="p" size="medium">Este es un párrafo normal con contenido estándar.</Text>
  <Text as="label" variant="bold" size="small">Label para formulario</Text>
  <Text as="span" variant="muted" size="xs">Texto pequeño como span</Text>
</div>`,
            props: {
                as: 'h1',
                size: '2xl',
                variant: 'bold',
                children: 'Título H1 Principal'
            }
        },

        // ===== GRUPO 9: COMBINACIONES AVANZADAS =====
        {
            name: '🚀 Combinaciones avanzadas',
            description: 'Mezclas creativas de efectos y estilos',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
  <Text variant="gradient-animated" size="2xl" as="h1">
    🌟 Título con degradado animado
  </Text>
  <Text variant="neon" neonColor="pink" size="xlarge" as="h2" style={{background: '#000', padding: '10px', borderRadius: '8px'}}>
    💖 Subtítulo neón rosa
  </Text>
  <Text variant="typewriter" size="large" typewriterSpeed={50}>
    ⌨️ Texto typewriter grande y fluido
  </Text>
  <Text color="success" variant="bold" size="large">
    ✅ Mensaje de éxito en verde
  </Text>
  <Text variant="subrayado" color="primary" size="medium">
    🔗 Enlace azul subrayado
  </Text>
</div>`,
            props: {
                variant: 'gradient-animated',
                size: '2xl',
                as: 'h1',
                children: '🌟 Título con degradado animado'
            }
        },

        // ===== GRUPO 10: CASOS DE USO REALES =====
        {
            name: '💼 Casos de uso reales',
            description: 'Ejemplos prácticos para aplicaciones',
            code: `<div style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px'}}>
  <Text as="h2" variant="bold" size="xlarge" color="primary">
    🏪 Mi Tienda Online
  </Text>
  <Text variant="muted" size="small">
    Última actualización: hace 2 minutos
  </Text>
  <Text as="p" size="medium">
    Bienvenido a nuestra plataforma de comercio electrónico donde encontrarás los mejores productos.
  </Text>
  <Text color="success" variant="bold">
    ✅ Envío gratis en pedidos superiores a 50€
  </Text>
  <Text color="warning" variant="bold">
    ⚠️ Oferta limitada: Solo quedan 3 días
  </Text>
  <Text color="error" size="small">
    ❌ Este producto no está disponible en tu región
  </Text>
  <Text variant="typewriter" typewriterSpeed={40}>
    💬 Chateando con el soporte técnico...
  </Text>
</div>`,
            props: {
                as: 'h2',
                variant: 'bold',
                size: 'xlarge',
                color: 'primary',
                children: '🏪 Mi Tienda Online'
            }
        },

        {
            name: '🤖 Respuesta ChatGPT',
            description: 'Simula respuesta de ChatGPT con typewriter',
            code: `<Text 
  variant="typewriter" 
  htmlContent={true}
  typewriterSpeed={30}
  size="medium"
>
  {\`<p>Aquí tienes la solución:</p>
<pre><code>function saludar(nombre) {
  console.log("Hola " + nombre);
}</code></pre>
<p>Este código hace lo siguiente:</p>
<ul>
  <li><strong>Define una función</strong> llamada saludar</li>
  <li><em>Recibe un parámetro</em> nombre</li>
  <li>Imprime un saludo en la <code>consola</code></li>
</ul>\`}
</Text>`,
            props: {
                variant: 'typewriter',
                htmlContent: true,
                typewriterSpeed: 30,
                children: '<p>Aquí tienes la solución:</p><pre><code>function saludar(nombre) { console.log("Hola " + nombre); }</code></pre>'
            }
        }


    ]
};

export default TextConfig;
