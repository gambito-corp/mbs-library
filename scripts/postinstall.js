#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script que se ejecuta automáticamente después de npm install
 */

function showWelcomeMessage() {
    console.log(`
🎨 ¡Bienvenido a MBS Library!
═══════════════════════════════════════════════════════════

✅ Instalación completada exitosamente

📚 Comandos disponibles:
   npx mbs make:config     - Crear archivo de configuración
   npx mbs --help          - Ver todos los comandos

🚀 Próximos pasos:
   1. Ejecuta: npx mbs make:config
   2. Personaliza tu archivo library.config.js
   3. Importa los componentes en tu proyecto

📖 Documentación: https://gambito-corp.github.io/mbs-library
💬 Soporte: https://github.com/gambito-corp/mbs-library/issues

═══════════════════════════════════════════════════════════
  `);
}

function checkProjectStructure() {
    const currentDir = process.cwd();
    const packageJsonPath = path.join(currentDir, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
        console.log('⚠️  No se detectó package.json en el directorio actual');
        return false;
    }

    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        console.log(`📦 Proyecto detectado: ${packageJson.name || 'Sin nombre'}`);
        return true;
    } catch (error) {
        console.log('⚠️  Error al leer package.json');
        return false;
    }
}

function main() {
    try {
        showWelcomeMessage();
        checkProjectStructure();
    } catch (error) {
        console.error('❌ Error en postinstall:', error.message);
    }
}

// Solo ejecutar si no estamos en el directorio de desarrollo de la librería
const currentDir = process.cwd();
const isLibraryDevelopment = fs.existsSync(path.join(currentDir, 'src', 'components', 'atoms'));

if (!isLibraryDevelopment) {
    main();
}
