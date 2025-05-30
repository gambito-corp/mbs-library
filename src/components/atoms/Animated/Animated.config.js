import Animated from './Animated.jsx';
import { ANIMATED_CATEGORIES, ENTRANCE_ANIMATIONS } from './Animated.constants.js';

export const AnimatedConfig = {
    component: Animated,
    name: 'Animated',
    category: 'atoms',
    description: 'Componente que integra las animaciones CSS de Animista para crear efectos visuales impactantes',

    props: {
        children: {
            type: 'ReactNode',
            required: true,
            description: 'Contenido que se va a animar'
        },
        animation: {
            type: 'string',
            required: false,
            default: 'fadeIn',
            options: Object.keys(ENTRANCE_ANIMATIONS),
            description: 'Tipo de animación a aplicar'
        },
        category: {
            type: 'string',
            required: false,
            default: 'entrances',
            options: Object.keys(ANIMATED_CATEGORIES),
            description: 'Categoría de la animación'
        },
        duration: {
            type: 'number',
            required: false,
            default: 0.6,
            description: 'Duración de la animación en segundos'
        },
        delay: {
            type: 'number',
            required: false,
            default: 0,
            description: 'Retraso antes de iniciar la animación'
        },
        trigger: {
            type: 'string',
            required: false,
            default: 'mount',
            options: ['mount', 'manual', 'hover', 'click'],
            description: 'Cuándo se activa la animación'
        },
        repeat: {
            type: 'boolean',
            required: false,
            default: false,
            description: 'Si la animación se repite infinitamente'
        }
    },

    variants: [
        {
            name: 'Fade In básico',
            description: 'Entrada suave con desvanecimiento',
            code: `<Animated animation="fadeIn">
                      <div style={{padding: '20px', background: '#3b82f6', color: 'white', borderRadius: '8px'}}>
                        ¡Hola! Aparezco con fade in
                      </div>
                    </Animated>`,
            props: {
                animation: 'fadeIn',
                children: '¡Hola! Aparezco con fade in'
            }
        },
        {
            name: 'Puff In (como Animista)',
            description: 'Efecto puff característico de Animista',
            code: `<Animated 
  animation="puffIn" 
  duration={0.7}
>
  <div style={{padding: '20px', background: '#10b981', color: 'white', borderRadius: '8px'}}>
    Efecto Puff In de Animista
  </div>
</Animated>`,
            props: {
                animation: 'puffIn',
                duration: 0.7,
                children: 'Efecto Puff In de Animista'
            }
        },
        {
            name: 'Scale In desde centro',
            description: 'Escalado desde el centro',
            code: `<Animated 
  animation="scaleIn" 
  duration={0.5}
  delay={0.2}
>
  <div style={{padding: '20px', background: '#8b5cf6', color: 'white', borderRadius: '8px'}}>
    Scale In con retraso
  </div>
</Animated>`,
            props: {
                animation: 'scaleIn',
                duration: 0.5,
                delay: 0.2,
                children: 'Scale In con retraso'
            }
        },
        {
            name: 'Slide desde arriba',
            description: 'Deslizamiento desde la parte superior',
            code: `<Animated 
  animation="slideInTop" 
  duration={0.8}
>
  <div style={{padding: '20px', background: '#f59e0b', color: 'white', borderRadius: '8px'}}>
    Slide In desde arriba
  </div>
</Animated>`,
            props: {
                animation: 'slideInTop',
                duration: 0.8,
                children: 'Slide In desde arriba'
            }
        },
        {
            name: 'Rotate In',
            description: 'Rotación de entrada',
            code: `<Animated 
  animation="rotateIn" 
  duration={0.6}
>
  <div style={{padding: '20px', background: '#ef4444', color: 'white', borderRadius: '8px'}}>
    Rotate In 360°
  </div>
</Animated>`,
            props: {
                animation: 'rotateIn',
                duration: 0.6,
                children: 'Rotate In 360°'
            }
        },
        {
            name: 'Bounce In',
            description: 'Entrada con rebote',
            code: `<Animated 
  animation="bounceIn" 
  duration={1.1}
>
  <div style={{padding: '20px', background: '#06b6d4', color: 'white', borderRadius: '8px'}}>
    Bounce In elástico
  </div>
</Animated>`,
            props: {
                animation: 'bounceIn',
                duration: 1.1,
                children: 'Bounce In elástico'
            }
        },
        {
            name: 'Shake (Atención)',
            description: 'Animación de atención con shake',
            code: `<Animated 
  animation="shake" 
  category="attention"
  repeat={true}
  duration={0.8}
>
  <div style={{padding: '20px', background: '#dc2626', color: 'white', borderRadius: '8px'}}>
    ¡Shake infinito!
  </div>
</Animated>`,
            props: {
                animation: 'shake',
                category: 'attention',
                repeat: true,
                duration: 0.8,
                children: '¡Shake infinito!'
            }
        },
        {
            name: 'Bounce (Atención)',
            description: 'Rebote de atención',
            code: `<Animated 
  animation="bounce" 
  category="attention"
  duration={0.9}
>
  <div style={{padding: '20px', background: '#7c3aed', color: 'white', borderRadius: '8px'}}>
    Bounce de atención
  </div>
</Animated>`,
            props: {
                animation: 'bounce',
                category: 'attention',
                duration: 0.9,
                children: 'Bounce de atención'
            }
        },
        {
            name: 'Slide In Blurred Top',
            description: 'Deslizamiento con efecto blur desde arriba',
            code: `<Animated 
  animation="slideInBlurredTop" 
  duration={0.6}
>
  <div style={{padding: '20px', background: '#8b5cf6', color: 'white', borderRadius: '8px'}}>
    Slide con blur desde arriba
  </div>
</Animated>`,
            props: {
                animation: 'slideInBlurredTop',
                duration: 0.6
            }
        },
        {
            name: 'Flip In Horizontal',
            description: 'Efecto flip horizontal',
            code: `<Animated 
  animation="flipIn" 
  duration={0.5}
>
  <div style={{padding: '20px', background: '#f59e0b', color: 'white', borderRadius: '8px'}}>
    Flip horizontal
  </div>
</Animated>`,
            props: {
                animation: 'flipIn',
                duration: 0.5
            }
        },
        {
            name: 'Jello Horizontal',
            description: 'Efecto jello elástico',
            code: `<Animated 
  animation="jello" 
  category="attention"
  duration={0.9}
>
  <div style={{padding: '20px', background: '#10b981', color: 'white', borderRadius: '8px'}}>
    Efecto Jello
  </div>
</Animated>`,
            props: {
                animation: 'jello',
                category: 'attention',
                duration: 0.9
            }
        },
        {
            name: 'Vibrate',
            description: 'Vibración continua',
            code: `<Animated 
  animation="vibrate" 
  category="attention"
  repeat={true}
  duration={0.3}
>
  <div style={{padding: '20px', background: '#ef4444', color: 'white', borderRadius: '8px'}}>
    Vibrando infinito
  </div>
</Animated>`,
            props: {
                animation: 'vibrate',
                category: 'attention',
                repeat: true,
                duration: 0.3
            }
        },
        {
            name: 'Wobble',
            description: 'Efecto wobble oscilante',
            code: `<Animated 
  animation="wobble" 
  category="attention"
  duration={0.8}
>
  <div style={{padding: '20px', background: '#06b6d4', color: 'white', borderRadius: '8px'}}>
    Wobble oscilante
  </div>
</Animated>`,
            props: {
                animation: 'wobble',
                category: 'attention',
                duration: 0.8
            }
        },
        {
            name: 'Heartbeat',
            description: 'Latido de corazón',
            code: `<Animated 
  animation="heartbeat" 
  category="attention"
  repeat={true}
  duration={1.5}
>
  <div style={{padding: '20px', background: '#ec4899', color: 'white', borderRadius: '8px'}}>
    💖 Heartbeat
  </div>
</Animated>`,
            props: {
                animation: 'heartbeat',
                category: 'attention',
                repeat: true,
                duration: 1.5
            }
        },
        {
            name: 'Rubber Band',
            description: 'Efecto banda elástica',
            code: `<Animated 
  animation="rubberBand" 
  category="attention"
  duration={1}
>
  <div style={{padding: '20px', background: '#7c3aed', color: 'white', borderRadius: '8px'}}>
    Rubber Band
  </div>
</Animated>`,
            props: {
                animation: 'rubberBand',
                category: 'attention',
                duration: 1
            }
        },
        {
            name: 'Tada',
            description: 'Efecto celebración tada',
            code: `<Animated 
  animation="tada" 
  category="attention"
  duration={1}
>
  <div style={{padding: '20px', background: '#f59e0b', color: 'white', borderRadius: '8px'}}>
    🎉 TADA!
  </div>
</Animated>`,
            props: {
                animation: 'tada',
                category: 'attention',
                duration: 1
            }
        },
        {
            name: 'Text Focus In',
            description: 'Texto que aparece enfocándose',
            code: `<Animated 
  animation="textFocusIn" 
  category="text"
  duration={1}
>
  <h2 style={{color: '#3b82f6', fontSize: '24px', fontWeight: 'bold'}}>
    Texto enfocándose
  </h2>
</Animated>`,
            props: {
                animation: 'textFocusIn',
                category: 'text',
                duration: 1
            }
        },
        {
            name: 'Text Flicker Glow',
            description: 'Texto con efecto flicker y glow',
            code: `<Animated 
  animation="textFlicker" 
  category="text"
  duration={2.5}
>
  <h2 style={{color: '#10b981', fontSize: '24px', fontWeight: 'bold'}}>
    Texto Flicker Glow
  </h2>
</Animated>`,
            props: {
                animation: 'textFlicker',
                category: 'text',
                duration: 2.5
            }
        },
        {
            name: 'Tracking In Expand',
            description: 'Texto expandiendo espaciado',
            code: `<Animated 
  animation="trackingIn" 
  category="text"
  duration={0.7}
>
  <h2 style={{color: '#8b5cf6', fontSize: '24px', fontWeight: 'bold'}}>
    TRACKING EXPAND
  </h2>
</Animated>`,
            props: {
                animation: 'trackingIn',
                category: 'text',
                duration: 0.7
            }
        },
        {
            name: 'Glow Effect',
            description: 'Efecto de brillo pulsante',
            code: `<Animated 
  animation="glow" 
  category="attention"
  repeat={true}
  duration={2}
>
  <div style={{padding: '20px', background: '#1f2937', color: '#e60073', borderRadius: '8px', border: '2px solid #e60073'}}>
    ✨ GLOW EFFECT ✨
  </div>
</Animated>`,
            props: {
                animation: 'glow',
                category: 'attention',
                repeat: true,
                duration: 2
            }
        },
        {
            name: 'Glitch Effect',
            description: 'Efecto glitch cyberpunk',
            code: `<Animated 
  animation="glitch" 
  category="special"
  repeat={true}
  duration={1}
>
  <div style={{padding: '20px', background: '#000', color: '#00ff00', borderRadius: '8px', fontFamily: 'monospace'}}>
    [GLITCH_EFFECT]
  </div>
</Animated>`,
            props: {
                animation: 'glitch',
                category: 'special',
                repeat: true,
                duration: 1
            }
        },
        {
            name: 'Neon Flicker',
            description: 'Efecto neón parpadeante',
            code: `<Animated 
  animation="neonFlicker" 
  category="special"
  repeat={true}
  duration={1.5}
>
  <div style={{padding: '20px', background: '#000', color: '#0fa', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold'}}>
    NEON FLICKER
  </div>
</Animated>`,
            props: {
                animation: 'neonFlicker',
                category: 'special',
                repeat: true,
                duration: 1.5
            }
        },
        {
            name: 'Hologram Effect',
            description: 'Efecto holograma futurista',
            code: `<Animated 
  animation="hologram" 
  category="special"
  repeat={true}
  duration={2}
>
  <div style={{padding: '20px', background: 'linear-gradient(45deg, #00ffff, #ff00ff)', color: 'white', borderRadius: '8px'}}>
    HOLOGRAM
  </div>
</Animated>`,
            props: {
                animation: 'hologram',
                category: 'special',
                repeat: true,
                duration: 2
            }
        },
        {
            name: 'Swing In Left',
            description: 'Balanceo de entrada desde la izquierda',
            code: `<Animated 
  animation="swingInLeft" 
  duration={0.6}
>
  <div style={{padding: '20px', background: '#f59e0b', color: 'white', borderRadius: '8px'}}>
    Swing desde izquierda
  </div>
</Animated>`,
            props: {
                animation: 'swingInLeft',
                duration: 0.6
            }
        },
        {
            name: 'Swing In Right',
            description: 'Balanceo de entrada desde la derecha',
            code: `<Animated 
  animation="swingInRight" 
  duration={0.6}
>
  <div style={{padding: '20px', background: '#8b5cf6', color: 'white', borderRadius: '8px'}}>
    Swing desde derecha
  </div>
</Animated>`,
            props: {
                animation: 'swingInRight',
                duration: 0.6
            }
        },
        {
            name: 'Roll In Left',
            description: 'Rodamiento desde la izquierda',
            code: `<Animated 
  animation="rollIn" 
  duration={0.6}
>
  <div style={{padding: '20px', background: '#10b981', color: 'white', borderRadius: '8px'}}>
    Roll In desde izquierda
  </div>
</Animated>`,
            props: {
                animation: 'rollIn',
                duration: 0.6
            }
        },
        {
            name: 'Roll In Right',
            description: 'Rodamiento desde la derecha',
            code: `<Animated 
  animation="rollInRight" 
  duration={0.6}
>
  <div style={{padding: '20px', background: '#ef4444', color: 'white', borderRadius: '8px'}}>
    Roll In desde derecha
  </div>
</Animated>`,
            props: {
                animation: 'rollInRight',
                duration: 0.6
            }
        },
        {
            name: 'Tilt In Forward',
            description: 'Inclinación hacia adelante',
            code: `<Animated 
  animation="tiltIn" 
  duration={0.6}
>
  <div style={{padding: '20px', background: '#06b6d4', color: 'white', borderRadius: '8px'}}>
    Tilt In Forward
  </div>
</Animated>`,
            props: {
                animation: 'tiltIn',
                duration: 0.6
            }
        },
        {
            name: 'Kenburns Top',
            description: 'Efecto Ken Burns desde arriba',
            code: `<Animated 
  animation="kenburnsTop" 
  duration={3}
>
  <div style={{padding: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px'}}>
    Ken Burns Effect
  </div>
</Animated>`,
            props: {
                animation: 'kenburnsTop',
                duration: 3
            }
        },
        {
            name: 'Slit In Vertical',
            description: 'Apertura vertical tipo cortina',
            code: `<Animated 
  animation="slitIn" 
  duration={0.45}
>
  <div style={{padding: '20px', background: '#7c3aed', color: 'white', borderRadius: '8px'}}>
    Slit In Vertical
  </div>
</Animated>`,
            props: {
                animation: 'slitIn',
                duration: 0.45
            }
        },
        {
            name: 'Slit In Horizontal',
            description: 'Apertura horizontal tipo cortina',
            code: `<Animated 
  animation="slitInHorizontal" 
  duration={0.45}
>
  <div style={{padding: '20px', background: '#ec4899', color: 'white', borderRadius: '8px'}}>
    Slit In Horizontal
  </div>
</Animated>`,
            props: {
                animation: 'slitInHorizontal',
                duration: 0.45
            }
        },
        {
            name: 'Blink Slow',
            description: 'Parpadeo lento',
            code: `<Animated 
  animation="blink2" 
  category="attention"
  repeat={true}
  duration={2}
>
  <div style={{padding: '20px', background: '#f59e0b', color: 'white', borderRadius: '8px'}}>
    Parpadeo lento
  </div>
</Animated>`,
            props: {
                animation: 'blink2',
                category: 'attention',
                repeat: true,
                duration: 2
            }
        },
        {
            name: 'Flicker Fast',
            description: 'Parpadeo rápido tipo luz',
            code: `<Animated 
  animation="flicker" 
  category="attention"
  repeat={true}
  duration={2}
>
  <div style={{padding: '20px', background: '#1f2937', color: '#fbbf24', borderRadius: '8px'}}>
    💡 Flicker Light
  </div>
</Animated>`,
            props: {
                animation: 'flicker',
                category: 'attention',
                repeat: true,
                duration: 2
            }
        },
        {
            name: 'Shadow Drop Center',
            description: 'Sombra que aparece desde el centro',
            code: `<Animated 
  animation="shadowDrop" 
  category="attention"
  duration={0.4}
>
  <div style={{padding: '20px', background: 'white', color: '#374151', borderRadius: '8px', border: '1px solid #d1d5db'}}>
    Shadow Drop Center
  </div>
</Animated>`,
            props: {
                animation: 'shadowDrop',
                category: 'attention',
                duration: 0.4
            }
        },
        {
            name: 'Focus In Expand',
            description: 'Enfoque expandiendo',
            code: `<Animated 
  animation="focusIn" 
  category="attention"
  duration={0.8}
>
  <div style={{padding: '20px', background: '#3b82f6', color: 'white', borderRadius: '8px'}}>
    Focus In Expand
  </div>
</Animated>`,
            props: {
                animation: 'focusIn',
                category: 'attention',
                duration: 0.8
            }
        },
        {
            name: 'Typewriter Effect',
            description: 'Efecto máquina de escribir',
            code: `<Animated 
  animation="typewriter" 
  category="text"
  duration={4}
>
  <div style={{padding: '20px', background: '#1f2937', color: '#10b981', borderRadius: '8px', fontFamily: 'monospace', overflow: 'hidden', whiteSpace: 'nowrap'}}>
    console.log("Hello World!");
  </div>
</Animated>`,
            props: {
                animation: 'typewriter',
                category: 'text',
                duration: 4
            }
        },
        {
            name: 'Text Pop Up Top',
            description: 'Texto que salta hacia arriba',
            code: `<Animated 
  animation="textPopUp" 
  category="text"
  duration={0.5}
>
  <h2 style={{color: '#ef4444', fontSize: '24px', fontWeight: 'bold', margin: 0}}>
    TEXT POP UP!
  </h2>
</Animated>`,
            props: {
                animation: 'textPopUp',
                category: 'text',
                duration: 0.5
            }
        },
        {
            name: 'Text Shadow Drop',
            description: 'Sombra de texto que aparece',
            code: `<Animated 
  animation="textShadowDrop" 
  category="text"
  duration={0.6}
>
  <h2 style={{color: '#7c3aed', fontSize: '28px', fontWeight: 'bold', margin: 0}}>
    SHADOW TEXT
  </h2>
</Animated>`,
            props: {
                animation: 'textShadowDrop',
                category: 'text',
                duration: 0.6
            }
        },
        {
            name: 'Background Slide Left',
            description: 'Fondo deslizándose hacia la izquierda',
            code: `<Animated 
  animation="bgSlideLeft" 
  category="background"
  duration={0.5}
>
  <div style={{padding: '20px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px'}}>
    Background Slide Left
  </div>
</Animated>`,
            props: {
                animation: 'bgSlideLeft',
                category: 'background',
                duration: 0.5
            }
        },
        {
            name: 'Background Pan Right',
            description: 'Fondo panorámico hacia la derecha',
            code: `<Animated 
  animation="bgPanRight" 
  category="background"
  duration={2}
>
  <div style={{padding: '20px', background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)', color: 'white', borderRadius: '8px', backgroundSize: '400% 400%'}}>
    Background Pan Right
  </div>
</Animated>`,
            props: {
                animation: 'bgPanRight',
                category: 'background',
                duration: 2
            }
        },
        {
            name: 'Magic Effect',
            description: 'Efecto mágico especial',
            code: `<Animated 
  animation="magic" 
  category="special"
  duration={0.6}
>
  <div style={{padding: '20px', background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white', borderRadius: '8px'}}>
    ✨ MAGIC EFFECT ✨
  </div>
</Animated>`,
            props: {
                animation: 'magic',
                category: 'special',
                duration: 0.6
            }
        },
        {
            name: 'Twister In Forward',
            description: 'Efecto tornado hacia adelante',
            code: `<Animated 
  animation="twisterIn" 
  category="special"
  duration={0.6}
>
  <div style={{padding: '20px', background: '#6366f1', color: 'white', borderRadius: '8px'}}>
    🌪️ Twister In
  </div>
</Animated>`,
            props: {
                animation: 'twisterIn',
                category: 'special',
                duration: 0.6
            }
        },
        {
            name: 'Space In Up',
            description: 'Entrada espacial desde abajo',
            code: `<Animated 
  animation="spaceIn" 
  category="special"
  duration={0.6}
>
  <div style={{padding: '20px', background: 'linear-gradient(135deg, #1e3c72, #2a5298)', color: 'white', borderRadius: '8px'}}>
    🚀 Space In Up
  </div>
</Animated>`,
            props: {
                animation: 'spaceIn',
                category: 'special',
                duration: 0.6
            }
        },
        {
            name: 'Perspective In',
            description: 'Entrada con perspectiva 3D',
            code: `<Animated 
  animation="perspectiveIn" 
  category="special"
  duration={0.6}
>
  <div style={{padding: '20px', background: '#059669', color: 'white', borderRadius: '8px'}}>
    Perspective 3D In
  </div>
</Animated>`,
            props: {
                animation: 'perspectiveIn',
                category: 'special',
                duration: 0.6
            }
        },
        {
            name: 'Matrix Effect',
            description: 'Efecto Matrix digital',
            code: `<Animated 
  animation="matrix" 
  category="special"
  repeat={true}
  duration={2}
>
  <div style={{padding: '20px', background: '#000', color: '#00ff00', borderRadius: '8px', fontFamily: 'monospace'}}>
    [MATRIX_EFFECT_01]
  </div>
</Animated>`,
            props: {
                animation: 'matrix',
                category: 'special',
                repeat: true,
                duration: 2
            }
        },
        {
            name: 'Combinación: Fade + Scale',
            description: 'Combinando múltiples efectos',
            code: `<Animated 
  animation="fadeIn" 
  duration={0.6}
  delay={0.2}
>
  <Animated 
    animation="scaleIn" 
    duration={0.4}
    delay={0.4}
  >
    <div style={{padding: '20px', background: 'linear-gradient(45deg, #ff6b6b, #feca57)', color: 'white', borderRadius: '8px'}}>
      Animación Combinada
    </div>
  </Animated>
</Animated>`,
            props: {
                animation: 'fadeIn',
                duration: 0.6,
                delay: 0.2
            }
        },
        {
            name: 'Preset Rápido',
            description: 'Usando preset de velocidad rápida',
            code: `<Animated 
  animation="bounceIn" 
  preset="quick"
>
  <div style={{padding: '20px', background: '#8b5cf6', color: 'white', borderRadius: '8px'}}>
    Bounce Rápido (0.3s)
  </div>
</Animated>`,
            props: {
                animation: 'bounceIn',
                preset: 'quick'
            }
        },
        {
            name: 'Preset Dramático',
            description: 'Usando preset dramático lento',
            code: `<Animated 
  animation="rotateIn" 
  preset="dramatic"
>
  <div style={{padding: '20px', background: '#dc2626', color: 'white', borderRadius: '8px'}}>
    Rotate Dramático (2s)
  </div>
</Animated>`,
            props: {
                animation: 'rotateIn',
                preset: 'dramatic'
            }
        },
        {
            name: 'Preset Elástico',
            description: 'Usando preset con easing elástico',
            code: `<Animated 
  animation="scaleIn" 
  preset="bouncy"
>
  <div style={{padding: '20px', background: '#059669', color: 'white', borderRadius: '8px'}}>
    Scale Elástico
  </div>
</Animated>`,
            props: {
                animation: 'scaleIn',
                preset: 'bouncy'
            }
        },
        {
            name: 'Trigger Manual',
            description: 'Animación que se activa manualmente',
            code: `<Animated 
  animation="tada" 
  trigger="manual"
  category="attention"
>
  <button style={{padding: '20px', background: '#f59e0b', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer'}}>
    Click para animar
  </button>
</Animated>`,
            props: {
                animation: 'tada',
                trigger: 'manual',
                category: 'attention'
            }
        },
        {
            name: 'Trigger Hover',
            description: 'Animación que se activa al pasar el mouse',
            code: `<Animated 
  animation="pulse" 
  trigger="hover"
  category="attention"
  repeat={true}
>
  <div style={{padding: '20px', background: '#6366f1', color: 'white', borderRadius: '8px', cursor: 'pointer'}}>
    Hover para animar
  </div>
</Animated>`,
            props: {
                animation: 'pulse',
                trigger: 'hover',
                category: 'attention',
                repeat: true
            }
        }
    ]
};
