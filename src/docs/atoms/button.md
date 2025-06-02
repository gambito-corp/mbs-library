# Button Component

Componente de botón versátil con múltiples variantes, tamaños, estados y soporte para iconos. Basado en gradientes y efectos visuales modernos.

## 📋 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Contenido del botón |
| `variant` | `string` | `'primary'` | Variante visual del botón |
| `size` | `string` | `'medium'` | Tamaño del botón |
| `icon` | `string` | - | Nombre del icono FontAwesome |
| `iconPosition` | `string` | `'left'` | Posición del icono (`left`, `right`, `top`, `bottom`) |
| `textColor` | `string` | - | Color del texto usando clases Tailwind |
| `iconColor` | `string` | - | Color del icono usando clases Tailwind |
| `loading` | `boolean` | `false` | Estado de carga con spinner |
| `disabled` | `boolean` | `false` | Estado deshabilitado |
| `fullWidth` | `boolean` | `false` | Ocupa todo el ancho disponible |
| `onClick` | `function` | - | Función ejecutada al hacer click |

## 🎨 Variantes

### Variantes Estándar
- `primary` - Botón principal con gradiente azul
- `secondary` - Botón secundario con gradiente gris
- `success` - Botón de éxito con gradiente verde
- `danger` - Botón de peligro con gradiente rojo
- `warning` - Botón de advertencia con gradiente amarillo
- `outline` - Botón con solo borde
- `ghost` - Botón transparente

### Variantes de Juego
- `gameReveal` - Botón para revelar en juegos
- `gameCorrect` - Botón de respuesta correcta
- `gameIncorrect` - Botón de respuesta incorrecta
- `gameRestart` - Botón para reiniciar juego
- `gameExit` - Botón para salir del juego

## 🚀 Ejemplos de Uso

### Botón Básico
````javascript
<Button variant="primary"> Botón Primario </Button>
````
### Botón con Icono

````javascript
<Button 
  variant="success" 
  icon="check" 
  iconPosition="left"
>
  Guardar
</Button>

````

### Botón con carga
````javascript
<Button
    variant="primary"
    loading={true}
>
    Guardando...
</Button>

````

### Botón con Colores Personalizados
````javascript
<Button 
  variant="outline" 
  textColor="purple"
  iconColor="orange"
  icon="fire"
>
  Texto púrpura, icono naranja
</Button>

````

## 🎯 Casos de Uso Comunes
### Formularios

````javascript
<Button type="submit" variant="primary" size="large">
  Enviar Formulario
</Button>

````

### Navegacion
````javascript
<Button 
  as="a" 
  href="/dashboard" 
  variant="ghost"
  icon="arrow-right"
  iconPosition="right"
>
  Ir al Dashboard
</Button>

````

### Acciones Destructivas O Disparar Eventos
````javascript
<Button 
  variant="danger" 
  icon="trash"
  onClick={handleDelete}
>
  Eliminar
</Button>

````

## 🔧 Integración con Otros Componentes
### Con Container
````javascript
<Container variant="card" padding="large">
  <Button variant="primary" fullWidth={true}>
    Botón de Ancho Completo
  </Button>
</Container>
````

### Con Animated

````javascript
<Animated animation="bounceIn">
  <Button variant="success" icon="star">
    Botón Animado
  </Button>
</Animated>
````

## 📱 Responsive
Todos los botones son responsive y se adaptan automáticamente a dispositivos móviles con tamaños táctiles apropiados.
