const fs = require('fs');
const path = require('path');

/**
 * Generador del archivo library.config.js
 */

function createConfigFile(options = {}) {
    const { force = false, template = 'basic' } = options;
    const currentDir = process.cwd();
    const configPath = path.join(currentDir, 'library.config.js');

    // Verificar si ya existe
    if (fs.existsSync(configPath) && !force) {
        console.log(`
⚠️  El archivo library.config.js ya existe.
    
    Opciones:
    • Usar --force para sobrescribir
    • Renombrar el archivo existente
    • Cancelar la operación
    
    Ejemplo: npx mbs make:config --force
    `);
        return false;
    }

    // Generar contenido según template
    const configContent = generateConfigContent(template);

    try {
        fs.writeFileSync(configPath, configContent, 'utf8');
        console.log(`
✅ ¡Archivo de configuración creado exitosamente!

📁 Ubicación: ${configPath}
📋 Template: ${template}

🚀 Próximos pasos:
   1. Personaliza las variables en library.config.js
   2. Importa la configuración en tu proyecto:
      
      import config from './library.config.js';
      import { Text, Button } from '@gambito-corp/mbs-library';
      
   3. Usa la configuración en tus componentes

📚 Documentación: https://gambito-corp.github.io/mbs-library/config
    `);
        return true;
    } catch (error) {
        console.error('❌ Error al crear archivo de configuración:', error.message);
        return false;
    }
}

function generateConfigContent(template) {
    const templates = {
        basic: generateBasicTemplate(),
        advanced: generateAdvancedTemplate(),
        full: generateFullTemplate()
    };

    return templates[template] || templates.basic;
}

function generateBasicTemplate() {
    return `/**
 * MBS Library - Configuración Básica
 * Archivo generado automáticamente por: npx mbs make:config
 * 
 * Personaliza estas variables según las necesidades de tu proyecto
 */

export const MBSConfig = {
  // ===== TIPOGRAFÍA =====
  typography: {
    // Fuentes del sistema
    fonts: {
      primary: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      secondary: ['Roboto', 'Arial', 'sans-serif'],
      tertiary: ['Fira Code', 'Monaco', 'Consolas', 'monospace']
    },
    
    // Tamaño base del texto
    baseFontSize: '16px',
    
    // Escalas de tamaño
    scale: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem'   // 24px
    }
  },

  // ===== COLORES =====
  colors: {
    // Color primario de tu marca
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',  // Color principal
      600: '#2563eb',
      900: '#1e3a8a'
    },
    
    // Color secundario
    secondary: {
      50: '#f8fafc',
      500: '#64748b',
      900: '#0f172a'
    },
    
    // Estados
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Neutrales
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827'
    }
  },

  // ===== ESPACIADO =====
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem'    // 48px
  },

  // ===== COMPONENTES =====
  components: {
    // Configuración por defecto para Text
    text: {
      defaultSize: 'base',
      defaultFont: 'primary'
    },
    
    // Configuración por defecto para Button
    button: {
      defaultSize: 'md',
      defaultVariant: 'primary'
    },
    
    // Configuración por defecto para Input
    input: {
      defaultSize: 'md',
      borderRadius: '0.375rem'
    }
  }
};

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Obtiene un valor de configuración usando dot notation
 * @param {string} path - Ruta del valor (ej: 'colors.primary.500')
 * @param {any} fallback - Valor por defecto
 */
export const getConfigValue = (path, fallback = null) => {
  return path.split('.').reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : fallback;
  }, MBSConfig);
};

/**
 * Aplica la configuración a los componentes MBS
 */
export const applyMBSConfig = () => {
  // Esta función se puede usar para aplicar la configuración globalmente
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    // Aplicar variables CSS
    root.style.setProperty('--mbs-font-primary', MBSConfig.typography.fonts.primary.join(', '));
    root.style.setProperty('--mbs-font-size-base', MBSConfig.typography.baseFontSize);
    root.style.setProperty('--mbs-color-primary', MBSConfig.colors.primary[500]);
    root.style.setProperty('--mbs-color-secondary', MBSConfig.colors.secondary[500]);
  }
};

export default MBSConfig;
`;
}

function generateAdvancedTemplate() {
    return `/**
 * MBS Library - Configuración Avanzada
 * Archivo generado automáticamente por: npx mbs make:config --template advanced
 */

export const MBSConfig = {
  // ===== METADATOS =====
  meta: {
    name: 'Mi Proyecto',
    version: '1.0.0',
    theme: 'custom'
  },

  // ===== TIPOGRAFÍA AVANZADA =====
  typography: {
    fonts: {
      primary: ['Inter', 'system-ui', 'sans-serif'],
      secondary: ['Roboto', 'Arial', 'sans-serif'],
      tertiary: ['Fira Code', 'Monaco', 'monospace'],
      display: ['Poppins', 'Inter', 'sans-serif']
    },
    
    baseFontSize: '16px',
    
    scale: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  // ===== SISTEMA DE COLORES COMPLETO =====
  colors: {
    brand: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb'
    },
    
    secondary: {
      50: '#f8fafc',
      500: '#64748b',
      600: '#475569'
    },
    
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a'
    },
    
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706'
    },
    
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626'
    },
    
    info: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb'
    },
    
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },

  // ===== ESPACIADO Y LAYOUT =====
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem'
  },

  // ===== BORDES Y SOMBRAS =====
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
  },

  // ===== TRANSICIONES =====
  transitions: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms'
    },
    timing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // ===== BREAKPOINTS =====
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // ===== CONFIGURACIÓN DE COMPONENTES =====
  components: {
    text: {
      defaultSize: 'base',
      defaultFont: 'primary',
      animationSpeed: 50
    },
    
    button: {
      defaultSize: 'md',
      defaultVariant: 'primary',
      borderRadius: 'base'
    },
    
    input: {
      defaultSize: 'md',
      borderRadius: 'base',
      focusRingWidth: '2px'
    },
    
    badge: {
      defaultSize: 'md',
      defaultVariant: 'primary',
      borderRadius: 'full'
    },
    
    avatar: {
      defaultSize: 'md',
      defaultShape: 'circle'
    }
  }
};

// ===== FUNCIONES AVANZADAS =====

export const getConfigValue = (path, fallback = null) => {
  return path.split('.').reduce((obj, key) => {
    return obj && obj[key] !== undefined ? obj[key] : fallback;
  }, MBSConfig);
};

export const applyMBSConfig = () => {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    // Aplicar fuentes
    root.style.setProperty('--mbs-font-primary', MBSConfig.typography.fonts.primary.join(', '));
    root.style.setProperty('--mbs-font-secondary', MBSConfig.typography.fonts.secondary.join(', '));
    root.style.setProperty('--mbs-font-tertiary', MBSConfig.typography.fonts.tertiary.join(', '));
    
    // Aplicar colores
    Object.entries(MBSConfig.colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([shade, color]) => {
          root.style.setProperty(\`--mbs-color-\${key}-\${shade}\`, color);
        });
      } else {
        root.style.setProperty(\`--mbs-color-\${key}\`, value);
      }
    });
    
    // Aplicar espaciado
    Object.entries(MBSConfig.spacing).forEach(([key, value]) => {
      root.style.setProperty(\`--mbs-spacing-\${key}\`, value);
    });
  }
};

export default MBSConfig;
`;
}

function generateFullTemplate() {
    // Template completo con todas las opciones
    return generateAdvancedTemplate() + `

// ===== CONFIGURACIÓN EXTENDIDA =====

// Configuración de animaciones
export const AnimationConfig = {
  typewriter: {
    slow: 100,
    normal: 50,
    fast: 25
  },
  transitions: {
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out'
  }
};

// Configuración de iconos
export const IconConfig = {
  defaultSize: 'md',
  library: 'fontawesome', // o 'heroicons', 'feather', etc.
  prefix: 'fas'
};

// Configuración de temas
export const ThemeConfig = {
  mode: 'light', // 'light', 'dark', 'auto'
  allowToggle: true,
  storageKey: 'mbs-theme'
};
`;
}

module.exports = createConfigFile;
