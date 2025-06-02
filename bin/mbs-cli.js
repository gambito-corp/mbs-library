#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

/**
 * MBS Library CLI
 * Herramientas de línea de comandos para MBS Library
 */

program
    .name('mbs')
    .description('CLI para MBS Library - Sistema de diseño modular')
    .version('0.1.1');

// Comando make:config
program
    .command('make:config')
    .description('Crear archivo de configuración library.config.js')
    .option('-f, --force', 'Sobrescribir archivo existente')
    .option('-t, --template <type>', 'Tipo de template (basic, advanced, full)', 'basic')
    .action((options) => {
        require('../scripts/make-config.js')(options);
    });

// Comando info
program
    .command('info')
    .description('Mostrar información de la librería')
    .action(() => {
        console.log(`
🎨 MBS Library v0.1.1
═══════════════════════════════════════════════════════════

📦 Componentes disponibles:
   • Atoms: Text, Button, Input, TextArea, Badge, Avatar, Icon
   • Molecules: Alert
   • Organisms: (En desarrollo)
   • Templates: (En desarrollo)

🔧 Comandos:
   mbs make:config        - Crear configuración
   mbs info              - Esta información
   mbs --help            - Ayuda completa

📚 Documentación: https://gambito-corp.github.io/mbs-library
    `);
    });

program.parse();
