import chalk from 'chalk';

const VALID_TYPES = ['atoms', 'molecules', 'organisms'];

export function validateComponentType(type) {
    if (!VALID_TYPES.includes(type)) {
        throw new Error(`Tipo de componente inválido: ${type}. Tipos válidos: ${VALID_TYPES.join(', ')}`);
    }
    return true;
}

export function validateComponentName(name) {
    // Validar PascalCase
    const pascalCaseRegex = /^[A-Z][a-zA-Z0-9]*$/;

    if (!pascalCaseRegex.test(name)) {
        throw new Error(`Nombre de componente inválido: ${name}. Debe estar en PascalCase (ej: MyComponent)`);
    }

    // Validar longitud
    if (name.length < 2 || name.length > 50) {
        throw new Error(`Nombre de componente debe tener entre 2 y 50 caracteres`);
    }

    return true;
}

export function validateConfigSchema(config) {
    const requiredFields = ['projectName', 'fonts', 'colors', 'themes'];

    for (const field of requiredFields) {
        if (!config[field]) {
            console.error(chalk.red(`❌ Campo requerido faltante: ${field}`));
            return false;
        }
    }

    return true;
}
