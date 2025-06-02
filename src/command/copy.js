import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { validateComponentType, validateComponentName } from '../utils/validation.js';
import { logger } from '../utils/logger.js';

export function copyCommand(program) {
    // Comando para copiar tipo completo
    program
        .command('copy:atoms')
        .description('Copiar todos los componentes atoms')
        .action(() => copyComponentType('atoms'));

    program
        .command('copy:molecules')
        .description('Copiar todos los componentes molecules')
        .action(() => copyComponentType('molecules'));

    program
        .command('copy:organisms')
        .description('Copiar todos los componentes organisms')
        .action(() => copyComponentType('organisms'));

    // Comando para copiar componente específico
    program
        .command('copy:atoms <component>')
        .description('Copiar componente atom específico')
        .option('-a, --all', 'Copiar todos los archivos')
        .option('-s, --css', 'Solo archivos CSS')
        .option('-t, --test', 'Solo archivos de test')
        .option('-u, --utils', 'Solo archivos de utilidades')
        .option('-c, --config', 'Solo archivos de configuración')
        .option('-o, --const', 'Solo archivos de constantes')
        .option('-l, --lazy', 'Solo archivos de lazy loading')
        .action((component, options) => copySpecificComponent('atoms', component, options));

    program
        .command('copy:molecules <component>')
        .description('Copiar componente molecule específico')
        .option('-a, --all', 'Copiar todos los archivos')
        .option('-s, --css', 'Solo archivos CSS')
        .option('-t, --test', 'Solo archivos de test')
        .option('-u, --utils', 'Solo archivos de utilidades')
        .option('-c, --config', 'Solo archivos de configuración')
        .option('-o, --const', 'Solo archivos de constantes')
        .option('-l, --lazy', 'Solo archivos de lazy loading')
        .action((component, options) => copySpecificComponent('molecules', component, options));

    program
        .command('copy:organisms <component>')
        .description('Copiar componente organism específico')
        .option('-a, --all', 'Copiar todos los archivos')
        .option('-s, --css', 'Solo archivos CSS')
        .option('-t, --test', 'Solo archivos de test')
        .option('-u, --utils', 'Solo archivos de utilidades')
        .option('-c, --config', 'Solo archivos de configuración')
        .option('-o, --const', 'Solo archivos de constantes')
        .option('-l, --lazy', 'Solo archivos de lazy loading')
        .action((component, options) => copySpecificComponent('organisms', component, options));
}

async function copyComponentType(type) {
    const spinner = ora(`Copiando todos los componentes ${type}...`).start();

    try {
        validateComponentType(type);

        const sourcePath = path.join(__dirname, '..', 'templates', type);
        const destPath = path.join(process.cwd(), 'src', 'components', type);

        await fs.ensureDir(destPath);
        await fs.copy(sourcePath, destPath, { overwrite: true });

        spinner.succeed(chalk.green(`✅ Componentes ${type} copiados exitosamente`));
        logger.info(`Componentes ${type} copiados a: ${destPath}`);
    } catch (error) {
        spinner.fail(chalk.red(`❌ Error copiando ${type}`));
        logger.error(`Error copiando ${type}`, error);
        throw error;
    }
}

async function copySpecificComponent(type, component, options) {
    const spinner = ora(`Copiando componente ${component}...`).start();

    try {
        validateComponentType(type);
        validateComponentName(component);

        const sourcePath = path.join(__dirname, '..', 'templates', type, component);
        const destPath = path.join(process.cwd(), 'src', 'components', type, component);

        if (!await fs.pathExists(sourcePath)) {
            throw new Error(`Componente ${component} no encontrado en ${type}`);
        }

        await fs.ensureDir(destPath);

        // Determinar qué archivos copiar según las opciones
        const filesToCopy = getFilesToCopy(options);

        if (filesToCopy.length === 0) {
            // Por defecto, copiar solo el archivo principal .jsx
            const mainFile = `${component}.jsx`;
            await copyFile(sourcePath, destPath, mainFile);
        } else {
            for (const file of filesToCopy) {
                await copyFile(sourcePath, destPath, file);
            }
        }

        spinner.succeed(chalk.green(`✅ Componente ${component} copiado exitosamente`));
        logger.info(`Componente ${component} copiado a: ${destPath}`);
    } catch (error) {
        spinner.fail(chalk.red(`❌ Error copiando componente ${component}`));
        logger.error(`Error copiando componente ${component}`, error);
        throw error;
    }
}

function getFilesToCopy(options) {
    const files = [];

    if (options.all) {
        return ['*']; // Copiar todos los archivos
    }

    if (options.css) files.push('*.css');
    if (options.test) files.push('*.test.js');
    if (options.utils) files.push('*.utils.js');
    if (options.config) files.push('*.config.js');
    if (options.const) files.push('*.constant.js');
    if (options.lazy) files.push('*.lazy.jsx');

    return files;
}

async function copyFile(sourcePath, destPath, pattern) {
    if (pattern === '*') {
        await fs.copy(sourcePath, destPath, { overwrite: true });
    } else {
        const files = await fs.readdir(sourcePath);
        const matchingFiles = files.filter(file =>
            pattern.includes('*') ?
                file.includes(pattern.replace('*', '')) :
                file === pattern
        );

        for (const file of matchingFiles) {
            await fs.copy(
                path.join(sourcePath, file),
                path.join(destPath, file),
                { overwrite: true }
            );
        }
    }
}
