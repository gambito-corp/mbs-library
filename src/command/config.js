import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { validateConfigSchema } from '../utils/validation.js';
import { logger } from '../utils/logger.js';

export function configCommand(program) {
    program
        .command('config')
        .description('Configurar variables del sistema de diseño')
        .option('-i, --interactive', 'Modo interactivo')
        .option('-f, --file <path>', 'Archivo de configuración personalizado')
        .action(async (options) => {
            try {
                logger.info('Iniciando configuración del sistema de diseño...');

                const config = await generateConfig(options);
                await saveConfig(config);

                console.log(chalk.green('✅ Configuración guardada exitosamente'));
                logger.info('Configuración completada');
            } catch (error) {
                console.error(chalk.red('❌ Error en configuración:'), error.message);
                logger.error('Error en configuración', error);
                process.exit(1);
            }
        });
}

async function generateConfig(options) {
    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: '📝 Nombre del proyecto:',
            default: 'mi-proyecto'
        },
        {
            type: 'input',
            name: 'primaryFont',
            message: '🔤 Fuente primaria:',
            default: 'Inter, sans-serif'
        },
        {
            type: 'input',
            name: 'secondaryFont',
            message: '🔤 Fuente secundaria:',
            default: 'Roboto, sans-serif'
        },
        {
            type: 'input',
            name: 'tertiaryFont',
            message: '🔤 Fuente terciaria:',
            default: 'Courier New, monospace'
        },
        {
            type: 'input',
            name: 'baseFontSize',
            message: '📏 Tamaño de fuente base (px):',
            default: '16'
        },
        {
            type: 'input',
            name: 'primaryColor',
            message: '🎨 Color primario:',
            default: '#3B82F6'
        },
        {
            type: 'input',
            name: 'secondaryColor',
            message: '🎨 Color secundario:',
            default: '#10B981'
        },
        {
            type: 'input',
            name: 'accentColor',
            message: '🎨 Color de acento:',
            default: '#F59E0B'
        },
        {
            type: 'input',
            name: 'neutralColor',
            message: '🎨 Color neutral:',
            default: '#6B7280'
        },
        {
            type: 'input',
            name: 'errorColor',
            message: '🎨 Color de error:',
            default: '#EF4444'
        },
        {
            type: 'input',
            name: 'successColor',
            message: '🎨 Color de éxito:',
            default: '#10B981'
        },
        {
            type: 'input',
            name: 'lightBackground',
            message: '🌞 Fondo modo claro:',
            default: '#FFFFFF'
        },
        {
            type: 'input',
            name: 'darkBackground',
            message: '🌙 Fondo modo oscuro:',
            default: '#1F2937'
        },
        {
            type: 'input',
            name: 'logoUrl',
            message: '🖼️ URL del logo:',
            default: ''
        }
    ];

    if (options.interactive !== false) {
        return await inquirer.prompt(questions);
    }

    return getDefaultConfig();
}

function getDefaultConfig() {
    return {
        projectName: 'mi-proyecto',
        fonts: {
            primary: 'Inter, sans-serif',
            secondary: 'Roboto, sans-serif',
            tertiary: 'Courier New, monospace'
        },
        typography: {
            baseFontSize: '16px'
        },
        colors: {
            primary: '#3B82F6',
            secondary: '#10B981',
            accent: '#F59E0B',
            neutral: '#6B7280',
            error: '#EF4444',
            success: '#10B981'
        },
        themes: {
            light: {
                background: '#FFFFFF',
                text: '#1F2937'
            },
            dark: {
                background: '#1F2937',
                text: '#F9FAFB'
            }
        },
        logo: {
            url: '',
            formats: ['svg', 'png', 'jpg']
        }
    };
}

async function saveConfig(config) {
    const configPath = path.join(process.cwd(), 'mbs.config.json');

    // Validar esquema
    const isValid = validateConfigSchema(config);
    if (!isValid) {
        throw new Error('Configuración inválida');
    }

    await fs.writeJson(configPath, config, { spaces: 2 });
    logger.info(`Configuración guardada en: ${configPath}`);
}
