import r2wc from '@r2wc/react-to-web-component';
import {
    Animated,
    Badge,
    Button,
    Container,
    Icon,
    Image,
    Input,
    Text,
    TextArea,
    Alert
} from '@gambito-corp/mbs-library'; // ✅ CORREGIDO: Usar tu paquete publicado

// ✅ DEFINIR TODOS TUS WEB COMPONENTS CON PROPS COMPLETAS
const components = [
    {
        name: 'mbs-button',
        component: Button,
        props: {
            variant: 'string',
            size: 'string',
            disabled: 'boolean',
            loading: 'boolean',
            onClick: 'function',
            children: 'string'
        }
    },
    {
        name: 'mbs-text',
        component: Text,
        props: {
            variant: 'string',
            size: 'string',
            weight: 'string',
            color: 'string',
            children: 'string'
        }
    },
    {
        name: 'mbs-input',
        component: Input,
        props: {
            type: 'string',
            placeholder: 'string',
            value: 'string',
            variant: 'string',
            size: 'string',
            disabled: 'boolean',
            error: 'boolean',
            onChange: 'function'
        }
    },
    {
        name: 'mbs-textarea',
        component: TextArea,
        props: {
            placeholder: 'string',
            value: 'string',
            rows: 'number',
            cols: 'number',
            disabled: 'boolean',
            onChange: 'function'
        }
    },
    {
        name: 'mbs-badge',
        component: Badge,
        props: {
            count: 'number',
            variant: 'string',
            size: 'string',
            positioned: 'boolean',
            showZero: 'boolean',
            max: 'number'
        }
    },
    {
        name: 'mbs-image',
        component: Image,
        props: {
            src: 'string',
            alt: 'string',
            w: 'number',
            h: 'number',
            wType: 'string',
            hType: 'string',
            borderRadius: 'number',
            objectFit: 'string'
        }
    },
    {
        name: 'mbs-icon',
        component: Icon,
        props: {
            name: 'string',
            size: 'string',
            variant: 'string',
            color: 'string',
            onClick: 'function'
        }
    },
    {
        name: 'mbs-container',
        component: Container,
        props: {
            variant: 'string',
            padding: 'string',
            shadow: 'string',
            centered: 'boolean',
            fitContent: 'boolean'
        }
    },
    {
        name: 'mbs-alert',
        component: Alert,
        props: {
            type: 'string',
            title: 'string',
            message: 'string',
            icon: 'string',
            linkText: 'string',
            linkUrl: 'string',
            linkTarget: 'string'
        }
    }
];

// ✅ REGISTRAR TODOS AUTOMÁTICAMENTE
components.forEach(({ name, component, props }) => {
    try {
        const WebComponent = r2wc(component, { props });
        customElements.define(name, WebComponent);
        console.log(`✅ Registered: ${name}`);
    } catch (error) {
        console.error(`❌ Failed to register ${name}:`, error);
    }
});

console.log('🎉 MBS Web Components registered:', components.map(c => c.name));

// ✅ EXPORTAR PARA USO EXTERNO
export { components };
