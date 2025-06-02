# Text Component

Componente de texto versátil que puede mostrar contenido estático o con animaciones opcionales tipo máquina de escribir.

## 📋 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Contenido de texto como children |
| `text` | `string` | - | Texto a mostrar como prop |
| `animated` | `boolean` | `false` | Activa la animación de máquina de escribir |
| `speed` | `number` | `50` | Velocidad de la animación en milisegundos |
| `variant` | `string` | `'default'` | Variante visual del texto |
| `size` | `string` | `'medium'` | Tamaño del texto |
| `textColor` | `string` | - | Color del texto usando clases Tailwind |
| `as` | `string` | `'span'` | Elemento HTML que se renderizará |
| `htmlStyles` | `boolean` | `false` | Permite contenido HTML enriquecido |

## 🎨 Variantes

### Variantes Visuales
- `default` - Texto estándar
- `highlight` - Texto con fondo destacado
- `gradient` - Texto con efecto degradado
- `neon` - Efecto de texto neón brillante
- `retro` - Estilo retro de terminal
- `muted` - Texto con menor prominencia
- `bold` - Texto en negrita
- `italic` - Texto en cursiva

### Tamaños
- `xs` - Extra pequeño
- `small` - Pequeño
- `medium` - Mediano (default)
- `large` - Grande
- `xlarge` - Extra grande
- `2xl` - 2X Grande
- `3xl` - 3X Grande

## 🚀 Ejemplos de Uso

### Texto Básico
```javascript
<Text>Texto básico sin animación</Text>
```


### Texto Animado
```javascript
<Text animated={true} speed={80}> Este texto se anima como máquina de escribir </Text> 
```

### Título con Color

````javascript
<Text 
  as="h1" 
  size="3xl" 
  textColor="blue"
  variant="bold"
>
  Título Principal Azul
</Text>

````

### Texto con HTML
````javascript
<Text 
  htmlStyles={true}
  text="Este texto tiene <strong>negritas</strong> y <em>cursivas</em>"
/>

````

### Texto Neón Animado
````javascript
<Text 
  variant="neon"
  animated={true}
  speed={100}
  size="large"
>
  TEXTO NEÓN ANIMADO
</Text>

````

## 🎯 Casos de Uso Comunes

### Títulos de Sección

````javascript
<Text as="h2" size="2xl" variant="gradient">
  Sección Principal
</Text>

````
### Labels de Formulario
````javascript
<Text as="label" variant="bold" size="small">
  Nombre de usuario:
</Text>

````

### Texto de Ayuda
````javascript
<Text variant="muted" size="small">
  Este campo es opcional
</Text>

````

## 🔧 Integración con Otros Componentes
### Con Button

````javascript
<Button>
  <Text variant="bold">Texto del Botón</Text>
</Button>

````

### Con Container

````javascript
<Container variant="card">
  <Text as="h3" size="large">Título de la Tarjeta</Text>
  <Text variant="muted">Descripción secundaria</Text>
</Container>

````

### Con Animated
````javascript
<Animated animation="fadeIn">
    <Text size="2xl" textColor="purple">
        Texto que aparece con animación
    </Text>
</Animated>

````

## 🎨 Colores Disponibles
### Puedes usar cualquier color de Tailwind con la prop textColor:

blue, red, green, yellow, purple, pink

indigo, gray, orange, teal, cyan, emerald

white, black

Tonos específicos: blue-600, red-500, gray-700, etc.

## ♿ Accesibilidad
### ✅ Soporte completo para lectores de pantalla

### ✅ Respeta prefers-reduced-motion para animaciones

### ✅ Contraste de colores WCAG 2.1 AA

### ✅ Navegación por teclado

## 📱 Responsive
### El componente Text es completamente responsive y se adapta automáticamente a diferentes tamaños de pantalla.