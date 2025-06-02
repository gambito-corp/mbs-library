export const TEXTAREA_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'TextArea estándar sin estilos especiales',
        borderColor: 'border-gray-300',
        focusColor: 'focus:border-blue-500 focus:ring-blue-100',
        backgroundColor: 'bg-white'
    },
    success: {
        label: 'Éxito',
        description: 'TextArea con estado de éxito',
        borderColor: 'border-green-500',
        focusColor: 'focus:border-green-600 focus:ring-green-100',
        backgroundColor: 'bg-green-50'
    },
    error: {
        label: 'Error',
        description: 'TextArea con estado de error',
        borderColor: 'border-red-500',
        focusColor: 'focus:border-red-600 focus:ring-red-100',
        backgroundColor: 'bg-red-50'
    },
    warning: {
        label: 'Advertencia',
        description: 'TextArea con estado de advertencia',
        borderColor: 'border-yellow-500',
        focusColor: 'focus:border-yellow-600 focus:ring-yellow-100',
        backgroundColor: 'bg-yellow-50'
    }
};

export const TEXTAREA_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'TextArea compacto',
        padding: 'px-3 py-1.5',
        fontSize: 'text-sm',
        iconSize: 'xs',
        iconPadding: { left: 'pl-8', right: 'pr-8', both: 'px-8' }
    },
    medium: {
        label: 'Mediano',
        description: 'TextArea estándar',
        padding: 'px-3 py-2',
        fontSize: 'text-base',
        iconSize: 'small',
        iconPadding: { left: 'pl-10', right: 'pr-10', both: 'px-10' }
    },
    large: {
        label: 'Grande',
        description: 'TextArea prominente',
        padding: 'px-4 py-3',
        fontSize: 'text-lg',
        iconSize: 'medium',
        iconPadding: { left: 'pl-12', right: 'pr-12', both: 'px-12' }
    }
};

// ✅ OPCIONES DE RESIZE
export const RESIZE_OPTIONS = {
    none: {
        label: 'Sin resize',
        description: 'No se puede redimensionar',
        className: 'resize-none'
    },
    horizontal: {
        label: 'Horizontal',
        description: 'Solo redimensionamiento horizontal',
        className: 'resize-x'
    },
    vertical: {
        label: 'Vertical',
        description: 'Solo redimensionamiento vertical',
        className: 'resize-y'
    },
    both: {
        label: 'Ambos',
        description: 'Redimensionamiento en ambas direcciones',
        className: 'resize'
    }
};

// ✅ CONFIGURACIÓN DE AUTO-GROW
export const AUTO_GROW_CONFIG = {
    defaultMinRows: 2,
    defaultMaxRows: 10,
    defaultRows: 3,
    lineHeight: 1.5, // rem
    maxHeight: '400px'
};

// ✅ ICONOS COMUNES PARA TEXTAREA
export const COMMON_TEXTAREA_ICONS = {
    // Acciones de texto
    edit: 'edit',
    save: 'save',
    send: 'paper-plane',
    comment: 'comment',

    // Estados
    check: 'check',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle',

    // Comunicación
    envelope: 'envelope',
    chat: 'comment-dots',
    message: 'comment-alt',

    // Herramientas
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    list: 'list',

    // Archivos
    attachment: 'paperclip',
    upload: 'upload',
    download: 'download'
};

// ✅ CASOS DE USO PREDEFINIDOS
export const PREDEFINED_USE_CASES = {
    comment: {
        label: 'Comentario',
        placeholder: 'Escribe tu comentario...',
        iconLeft: 'comment',
        iconRight: 'send',
        rows: 3,
        maxLength: 500
    },
    message: {
        label: 'Mensaje',
        placeholder: 'Escribe tu mensaje...',
        iconLeft: 'envelope',
        iconRight: 'paper-plane',
        autoGrow: true,
        minRows: 2,
        maxRows: 8
    },
    description: {
        label: 'Descripción',
        placeholder: 'Describe detalladamente...',
        iconLeft: 'edit',
        rows: 5,
        maxLength: 1000
    },
    review: {
        label: 'Reseña',
        placeholder: 'Comparte tu experiencia...',
        iconLeft: 'star',
        iconRight: 'check',
        autoGrow: true,
        maxLength: 800
    },
    feedback: {
        label: 'Comentarios',
        placeholder: 'Tus comentarios son importantes...',
        iconLeft: 'comment-dots',
        rows: 4,
        maxLength: 600
    }
};

// ✅ MENSAJES POR DEFECTO
export const DEFAULT_MESSAGES = {
    required: 'Este campo es requerido',
    minLength: 'El texto es muy corto',
    maxLength: 'Has excedido el límite de caracteres',
    tooShort: 'Necesitas escribir más',
    tooLong: 'El texto es demasiado largo',
    saved: '¡Guardado exitosamente!',
    sending: 'Enviando...',
    sent: '¡Enviado!'
};

// ✅ CONFIGURACIÓN DE CONTADOR DE CARACTERES
export const CHARACTER_COUNTER_CONFIG = {
    warningThreshold: 0.8, // 80% del límite
    dangerThreshold: 1.0,  // 100% del límite
    colors: {
        normal: 'text-gray-400',
        warning: 'text-yellow-500',
        danger: 'text-red-500'
    }
};

// ✅ PLACEHOLDERS POR CONTEXTO
export const CONTEXT_PLACEHOLDERS = {
    comment: 'Escribe tu comentario...',
    message: 'Escribe tu mensaje...',
    description: 'Describe detalladamente...',
    review: 'Comparte tu experiencia...',
    feedback: 'Tus comentarios...',
    note: 'Escribe una nota...',
    content: 'Escribe el contenido...',
    bio: 'Cuéntanos sobre ti...',
    summary: 'Resumen...',
    details: 'Detalles adicionales...'
};

// ✅ VALIDACIONES COMUNES
export const VALIDATION_RULES = {
    minLength: {
        comment: 10,
        message: 5,
        description: 20,
        review: 15,
        feedback: 10
    },
    maxLength: {
        comment: 500,
        message: 1000,
        description: 2000,
        review: 800,
        feedback: 600,
        bio: 300,
        summary: 150
    }
};

// ✅ CONFIGURACIONES DE TECLADO
export const KEYBOARD_SHORTCUTS = {
    save: 'Ctrl+S',
    send: 'Ctrl+Enter',
    bold: 'Ctrl+B',
    italic: 'Ctrl+I',
    undo: 'Ctrl+Z',
    redo: 'Ctrl+Y'
};
