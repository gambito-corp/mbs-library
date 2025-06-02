# MBS Design System Library

Una librería de componentes React moderna basada en **Atomic Design** con soporte completo para animaciones, iconos y estilos personalizables.

## 🚀 Características Principales

- ✅ **5 Átomos Fundamentales** - Text, Container, Icon, Animated, Button
- ✅ **210+ Animaciones** integradas de Animista
- ✅ **FontAwesome + SVG + Emojis** como iconos
- ✅ **Colores Tailwind** personalizables
- ✅ **TypeScript** ready
- ✅ **Totalmente accesible** (WCAG 2.1)

## 📦 Instalación

``npm install @gambito-corp/mbs-library``


## 🎯 Inicio Rápido

````javascript
import { Text, Button, Icon, Container, Animated } from '@gambito-corp/mbs-library';

function App() {
    return (
        <Container variant="card" padding="large">
            <Text as="h1" size="3xl" textColor="blue">
                ¡Hola MBS Library!
            </Text>
            <Button
                variant="primary"
                icon="heart"
                iconColor="red"
                onClick={() => alert('¡Funciona!')}
            >
                Me gusta
            </Button>

            <Animated animation="bounceIn">
                <Icon name="rocket" textColor="purple" size="2x"/>
            </Animated>
        </Container>
    );
}
````

## 📚 Documentación

### Átomos Fundamentales
- [Text](../untitled1/src/docs/atoms/text.md) - Componente de texto versátil con animaciones
- [Container](../untitled1/src/docs/atoms/container.md) - Contenedor para layouts y estructuras
- [Icon](../untitled1/src/docs/atoms/icon.md) - Iconos universales (FontAwesome + SVG + Emojis)
- [Animated](../untitled1/src/docs/atoms/animated.md) - 210+ animaciones de Animista
- [Button](../untitled1/src/docs/atoms/button.md) - Botones interactivos con múltiples variantes

### Guías
- [Getting Started](../untitled1/src/docs/getting-started.md) - Guía de inicio completa
- [Atomic Design](../untitled1/src/docs/guides/atomic-design.md) - Metodología y estructura
- [Integration Examples](../untitled1/src/docs/examples/integration-examples.md) - Ejemplos prácticos

## 🎨 Design System Studio

Explora todos los componentes en vivo:

``npm start``


## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

MIT © [Pedro - Gambito Corp](https://github.com/tu-usuario)
