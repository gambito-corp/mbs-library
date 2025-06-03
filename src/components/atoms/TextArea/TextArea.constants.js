export const TEXTAREA_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'TextArea estándar sin estilos especiales'
    },
    success: {
        label: 'Éxito',
        description: 'TextArea con estado de éxito'
    },
    error: {
        label: 'Error',
        description: 'TextArea con estado de error'
    },
    warning: {
        label: 'Advertencia',
        description: 'TextArea con estado de advertencia'
    }
};

export const TEXTAREA_SIZES = {
    small: {
        label: 'Pequeño',
        description: 'TextArea compacto'
    },
    medium: {
        label: 'Mediano',
        description: 'TextArea estándar'
    },
    large: {
        label: 'Grande',
        description: 'TextArea prominente'
    }
};

export const RESIZE_OPTIONS = {
    none: {
        label: 'Sin resize',
        description: 'No se puede redimensionar'
    },
    horizontal: {
        label: 'Horizontal',
        description: 'Solo redimensionamiento horizontal'
    },
    vertical: {
        label: 'Vertical',
        description: 'Solo redimensionamiento vertical'
    },
    both: {
        label: 'Ambos',
        description: 'Redimensionamiento en ambas direcciones'
    }
};

export const AUTO_GROW_CONFIG = {
    defaultMinRows: 2,
    defaultMaxRows: 10,
    defaultRows: 3,
    lineHeight: 1.5,
    maxHeight: '400px'
};

export const COMMON_TEXTAREA_ICONS = {
    edit: 'edit',
    save: 'save',
    send: 'paper-plane',
    comment: 'comment',
    check: 'check',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle',
    envelope: 'envelope',
    chat: 'comment-dots',
    message: 'comment-alt',
    bold: 'bold',
    italic: 'italic',
    underline: 'underline',
    list: 'list',
    attachment: 'paperclip',
    upload: 'upload',
    download: 'download'
};

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

export const CHARACTER_COUNTER_CONFIG = {
    warningThreshold: 0.8,
    dangerThreshold: 1.0,
    colors: {
        normal: 'text-gray-400',
        warning: 'text-yellow-500',
        danger: 'text-red-500'
    }
};

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

export const KEYBOARD_SHORTCUTS = {
    save: 'Ctrl+S',
    send: 'Ctrl+Enter',
    bold: 'Ctrl+B',
    italic: 'Ctrl+I',
    undo: 'Ctrl+Z',
    redo: 'Ctrl+Y'
};
