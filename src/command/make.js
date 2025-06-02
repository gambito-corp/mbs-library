import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { validateComponentType, validateComponentName } from '../utils/validation.js';
import { generateFromTemplate } from '../utils/templateEngine.js';
import { logger } from '../utils/logger.js';

export function makeCommand(program) {
    program
        .command('make:atom <component>')
        .description('Crear nuevo componente atom')
        .action((component) => createComponent('atoms', component));

    program
        .command('make:molecule <component>')
        .description('Crear nuevo componente molecule')
        .action((component) => createComponent('molecules', component));

    program
        .command('make:organism <component>')
        .description('Crear nuevo componente organism')
        .action((component) => createComponent('organisms', component));
}

async function createComponent(type, componentName) {
    const spinner = ora(`Creando componente ${componentName}...`).start();

    try {
        validateComponentType(type);
        validateComponentName(componentName);

        const destPath = path.join(process.cwd(), 'src', 'components', type, componentName);

        // Verificar si el componente ya existe
        if (await fs.pathExists(destPath)) {
            throw new Error(`El componente ${componentName} ya existe en ${type}`);
        }

        await fs.ensureDir(destPath);

        // Generar todos los archivos desde plantillas
        const files = [
            { template: 'component.config.js.stub', output: `${componentName}.config.js` },
            { template: 'component.constant.js.stub', output: `${componentName}.constant.js` },
            { template: 'component.css.stub', output: `${componentName}.css` },
            { template: 'component.jsx.stub', output: `${componentName}.jsx` },
            { template: 'component.lazy.jsx.stub', output: `${componentName}.lazy.jsx` },
            { template: 'component.test.js.stub', output: `${componentName}.test.js` },
            { template: 'component.utils.js.stub', output: `${componentName}.utils.js` }
        ];

        const templateData = {
            componentName,
            type,
            timestamp: new Date().toISOString(),
            author: 'MBS Library Generator'
        };

        for (const file of files) {
            const content = await generateFromTemplate(file.template, templateData);
            await fs.writeFile(path.join(destPath, file.output), content);
        }

        spinner.succeed(chalk.green(`✅ Componente ${componentName} creado exitosamente`));
        console.log(chalk.blue(`📁 Ubicación: ${destPath}`));

        // Mostrar archivos generados
        console.log(chalk.yellow('\n📄 Archivos generados:'));
        files.forEach(file => {
            console.log(chalk.gray(`  - ${file.output}`));
        });

        logger.info(`Componente ${componentName} creado en: ${destPath}`);
    } catch (error) {
        spinner.fail(chalk.red(`❌ Error creando componente ${componentName}`));
        logger.error(`Error creando componente ${componentName}`, error);
        throw error;
    }
}
