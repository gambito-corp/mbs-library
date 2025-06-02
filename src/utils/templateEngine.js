import fs from 'fs-extra';
import path from 'path';

export async function generateFromTemplate(templateName, data) {
    const templatePath = path.join(__dirname, '..', 'stubs', templateName);

    if (!await fs.pathExists(templatePath)) {
        throw new Error(`Plantilla no encontrada: ${templateName}`);
    }

    let template = await fs.readFile(templatePath, 'utf8');

    // Reemplazar variables en la plantilla
    for (const [key, value] of Object.entries(data)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, value);
    }

    return template;
}
