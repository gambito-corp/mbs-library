// scripts/generate-config-template.js
const fs = require('fs');
const path = require('path');

const generateConfigTemplate = (componentName, category = 'atoms') => {
    const template = `import ${componentName} from './${componentName}';

export const ${componentName}Config = {
    component: ${componentName},
    name: '${componentName}',
    category: '${category}',
    description: 'Descripción del componente ${componentName}',
    
    props: {
        // Definir props aquí
    },

    variants: [
        {
            name: 'Básico',
            description: 'Ejemplo básico del componente',
            code: \`<${componentName} 
  // props aquí
/>\`,
            props: {
                // props del ejemplo
            }
        }
    ]
};`;

    const configPath = path.join('src', 'components', category, componentName, `${componentName}.config.js`);
    fs.writeFileSync(configPath, template);
    console.log(`✅ Config generado: ${configPath}`);
};

// Uso: node scripts/generate-config-template.js Button atoms
const componentName = process.argv[2];
const category = process.argv[3] || 'atoms';
generateConfigTemplate(componentName, category);
