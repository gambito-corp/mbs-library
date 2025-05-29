# @gambito-corp/mbs-library

Una librería de componentes React moderna y reutilizable diseñada para aplicaciones de flashcards y sistemas educativos.

[![npm version](https://badge.fury.io/js/%40gambito-corp%2Fmbs-library.svg)](https://badge.fury.io/js/%40gambito-corp%2Fmbs-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Instalación

````npm install @gambito-corp/mbs-library````


## 📋 Requisitos

- React >= 16.8.0
- React DOM >= 16.8.0
- Tailwind CSS (recomendado para estilos óptimos)

## 🎯 Uso Básico

``` Javascript
import React from 'react';
import { Button, Card, Alert, Badge } from '@gambito-corp/mbs-library';

function App() {
    return (
        <div>
            <Card>
                <h2>Mi Aplicación</h2>
                <Alert type="success" message="¡Componentes cargados correctamente!" />
                <Badge variant="primary">Nuevo</Badge>
                <Button variant="primary" onClick={() => alert('¡Hola!')}>
                    Mi Boton
                </Button>
            </Card>
        </div>
    );

export default App;
```


## 📦 Componentes Disponibles

### 🔹 Atoms (Componentes Básicos)

## Alert

Componente versátil para mostrar mensajes informativos, de estado, errores y notificaciones al usuario.

### 📝 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `type` | `'error' \| 'success' \| 'warning' \| 'info'` | `'info'` | Tipo de alerta que determina el color y el icono |
| `message` | `string` | - | Mensaje principal a mostrar |
| `title` | `string` | - | Título opcional para la alerta |
| `dismissible` | `boolean` | `false` | Si la alerta puede ser cerrada por el usuario |
| `onDismiss` | `function` | - | Función callback ejecutada al cerrar la alerta |
| `icon` | `boolean` | `true` | Si mostrar el icono correspondiente al tipo |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Tamaño de la alerta |
| `variant` | `'filled' \| 'outlined' \| 'solid'` | `'filled'` | Variante visual de la alerta |
| `className` | `string` | `''` | Clases CSS adicionales |
| `children` | `ReactNode` | - | Contenido personalizado (alternativa a message) |

### 🎨 Variantes

#### Tipos Disponibles
- **`error`**: Para errores y situaciones críticas (rojo)
- **`success`**: Para confirmaciones y éxitos (verde)
- **`warning`**: Para advertencias y precauciones (amarillo)
- **`info`**: Para información general (azul)

#### Estilos Disponibles
- **`filled`**: Fondo de color con borde
- **`outlined`**: Solo borde, fondo transparente
- **`solid`**: Fondo sólido con texto blanco

#### Tamaños Disponibles
- **`small`**: Compacto para espacios reducidos
- **`medium`**: Tamaño estándar
- **`large`**: Más prominente para mensajes importantes

### 💡 Ejemplos de Uso

#### Alerta Básica
``<Alert type="info" message="Esta es una información importante para el usuario" />``

#### Alerta de Error con Título
``<Alert type="error" title="Error de Validación" message="Por favor, revisa los campos marcados en rojo" />``

#### Alerta Dismissible
```
<Alert
    type="warning"
    message="Esta acción no se puede deshacer"
    dismissible={true}
    onDismiss={() => console.log('Alerta cerrada')}
/>
```
#### Alerta con Contenido Personalizado
```
    <Alert 
        type="success" 
        dismissible 
        onDismiss={handleClose}> 
        <div> 
            <strong>
                ¡Operación exitosa!
            </strong>
            <p>
                Los datos se guardaron correctamente en la base de datos.
            </p> 
            <button 
                className="mt-2 text-sm underline"> 
                Ver detalles 
            </button> 
        </div> 
    </Alert> 
```
#### Diferentes Variantes
{/* Variante filled (default) */}
````
<Alert type="info" message="Información con fondo de color" />
````
{/* Variante outlined */}
````aiignore
<Alert
type="success"
variant="outlined"
message="Éxito con solo borde"
/>
````

{/* Variante solid */}
````aiignore
<Alert
type="error"
variant="solid"
message="Error con fondo sólido"
/>
````
#### Diferentes Tamaños
{/* Tamaño pequeño */}
````aiignore
<Alert
type="warning"
size="small"
message="Advertencia compacta"
/>
````

{/* Tamaño mediano (default) */}
````aiignore
<Alert
type="info"
size="medium"
message="Información estándar"
/>
````

{/* Tamaño grande */}
````aiignore
<Alert
type="success"
size="large"
title="Operación Completada"
message="El proceso se ejecutó exitosamente"
/>
````
#### Sin Icono

````
<Alert
    type="info"
    icon={false}
    message="Alerta sin icono para un diseño más limpio"
/>
````
#### 🔧 Personalización con CSS
Puedes personalizar el componente usando clases de Tailwind CSS:

````aiignore
<Alert 
    type="info"
    message="Alerta personalizada"
    className="shadow-xl border-2 border-dashed"
/>

````

### ♿ Accesibilidad
El componente Alert incluye características de accesibilidad:

role="alert": Identifica el elemento como una alerta para lectores de pantalla

aria-label: En el botón de cierre para usuarios de tecnologías asistivas

Contraste de colores: Cumple con las pautas WCAG para legibilidad

Navegación por teclado: El botón de cierre es accesible via teclado

### 🎯 Casos de Uso Comunes
Validación de Formularios
````aiignore
<Alert 
    type="error"
    title="Errores de Validación"
    message="Por favor, corrige los campos marcados antes de continuar"
/>

````
Confirmación de Acciones
````aiignore
<Alert 
    type="success"
    message="Usuario creado exitosamente"
    dismissible
    onDismiss={() => setShowAlert(false)}
/>

````
Advertencias del Sistema
````aiignore
<Alert 
    type="warning"
    title="Mantenimiento Programado"
    message="El sistema estará en mantenimiento el 15 de junio de 2:00 AM a 4:00 AM"
/>

````
Información Contextual
````aiignore
<Alert 
    type="info"
    variant="outlined"
    size="small"
    message="Tip: Usa Ctrl+S para guardar rápidamente"
/>

````
