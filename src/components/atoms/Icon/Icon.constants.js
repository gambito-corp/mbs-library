export const ICON_TYPES = {
    fontawesome: {
        label: 'FontAwesome',
        description: 'Iconos de la librería FontAwesome'
    },
    svg: {
        label: 'SVG Custom',
        description: 'Iconos SVG personalizados'
    },
    image: {
        label: 'Imagen',
        description: 'Iconos como imágenes (PNG, JPG, etc.)'
    },
    emoji: {
        label: 'Emoji',
        description: 'Emojis como iconos'
    },
    unicode: {
        label: 'Unicode',
        description: 'Caracteres Unicode'
    }
};

export const ICON_SIZES = {
    xs: {
        label: 'Extra pequeño',
        description: 'Icono muy pequeño',
        size: '12px',
        className: 'icon-xs'
    },
    small: {
        label: 'Pequeño',
        description: 'Icono pequeño',
        size: '16px',
        className: 'icon-sm'
    },
    medium: {
        label: 'Mediano',
        description: 'Icono estándar',
        size: '20px',
        className: 'icon-md'
    },
    large: {
        label: 'Grande',
        description: 'Icono grande',
        size: '24px',
        className: 'icon-lg'
    },
    xlarge: {
        label: 'Extra grande',
        description: 'Icono muy grande',
        size: '32px',
        className: 'icon-xl'
    },
    '2x': {
        label: '2X',
        description: 'Icono 2 veces más grande',
        size: '40px',
        className: 'icon-2x'
    },
    '3x': {
        label: '3X',
        description: 'Icono 3 veces más grande',
        size: '60px',
        className: 'icon-3x'
    }
};

export const ICON_VARIANTS = {
    default: {
        label: 'Por defecto',
        description: 'Icono estándar sin estilos especiales'
    },
    primary: {
        label: 'Primario',
        description: 'Icono con color primario'
    },
    secondary: {
        label: 'Secundario',
        description: 'Icono con color secundario'
    },
    success: {
        label: 'Éxito',
        description: 'Icono verde de éxito'
    },
    warning: {
        label: 'Advertencia',
        description: 'Icono amarillo de advertencia'
    },
    error: {
        label: 'Error',
        description: 'Icono rojo de error'
    },
    info: {
        label: 'Información',
        description: 'Icono azul informativo'
    },
    muted: {
        label: 'Silenciado',
        description: 'Icono con menor prominencia'
    },
    inverse: {
        label: 'Inverso',
        description: 'Icono para fondos oscuros'
    }
};

// Iconos FontAwesome más comunes
export const COMMON_FONTAWESOME_ICONS = {
    // Navegación
    home: 'home',
    menu: 'bars',
    close: 'times',
    back: 'arrow-left',
    forward: 'arrow-right',
    up: 'arrow-up',
    down: 'arrow-down',

    // Acciones
    edit: 'edit',
    delete: 'trash',
    save: 'save',
    copy: 'copy',
    paste: 'paste',
    cut: 'cut',
    undo: 'undo',
    redo: 'redo',

    // Estados
    check: 'check',
    error: 'exclamation-triangle',
    warning: 'exclamation-circle',
    info: 'info-circle',
    success: 'check-circle',
    loading: 'spinner',

    // UI
    search: 'search',
    filter: 'filter',
    sort: 'sort',
    settings: 'cog',
    user: 'user',
    users: 'users',

    // Comunicación
    email: 'envelope',
    phone: 'phone',
    chat: 'comment',
    notification: 'bell',

    // Archivos
    file: 'file',
    folder: 'folder',
    download: 'download',
    upload: 'upload',

    // Redes sociales
    facebook: ['fab', 'facebook'],
    twitter: ['fab', 'twitter'],
    instagram: ['fab', 'instagram'],
    linkedin: ['fab', 'linkedin'],
    github: ['fab', 'github']
};

// Emojis comunes
export const COMMON_EMOJIS = {
    // Emociones
    happy: '😊',
    sad: '😢',
    love: '❤️',
    like: '👍',
    dislike: '👎',

    // Estados
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',

    // Objetos
    star: '⭐',
    fire: '🔥',
    lightning: '⚡',
    rocket: '🚀',
    gem: '💎',

    // Naturaleza
    sun: '☀️',
    moon: '🌙',
    cloud: '☁️',
    rain: '🌧️',
    snow: '❄️'
};

// SVGs del diseñador (base64)
export const DESIGNER_SVGS = {
    questionMark:  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0ic3ZnMiIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMjYuMiAxMjYuMiINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI2LjIgMTI2LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Ni44LDEyNi4yYy0yLjUsMC00LjksMC03LjQsMGMtMC4zLTAuMS0wLjYtMC4yLTEtMC4yYy04LjgtMC42LTE3LjItMi45LTI1LTcuMkMxNS43LDEwOSw0LjgsOTQuMSwxLDc0LjENCgkJYy0wLjUtMi40LTAuNy00LjktMS03LjNjMC0yLjUsMC00LjksMC03LjRjMC4xLTAuNCwwLjItMC43LDAuMi0xLjFjMC42LTguOCwyLjktMTcuMiw3LjItMjQuOUMxOSwxMi44LDM2LjgsMS42LDYwLjQsMC4xDQoJCUM3MC43LTAuNSw4MC41LDEuNCw4OS43LDZjMjIuNSwxMS4yLDM0LjcsMjkuNCwzNi40LDU0LjVjMC44LDExLjUtMS44LDIyLjQtNy40LDMyLjVjLTkuOCwxNy43LTI0LjgsMjguNS00NC43LDMyLjMNCgkJQzcxLjYsMTI1LjcsNjkuMiwxMjUuOSw2Ni44LDEyNi4yeiBNMTE2LjMsNjMuMkMxMTYuNCwzMy44LDkyLjYsMTAsNjMuMiw5LjlDMzMuOCw5LjgsOS45LDMzLjYsOS45LDYzLjENCgkJQzkuOCw5Mi40LDMzLjYsMTE2LjIsNjMsMTE2LjNDOTIuMywxMTYuNCwxMTYuMyw5Mi42LDExNi4zLDYzLjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjEsMzEuN2M5LjUsMCwxNy45LDcsMTkuNSwxNi4zYzEuNiw5LjctMy45LDE5LTEzLjEsMjJjLTEuMSwwLjQtMS41LDAuOC0xLjQsMmMwLjEsMi4xLDAsNC4yLDAsNi4zDQoJCWMwLDMtMi4xLDUuMi01LDUuMWMtMi44LDAtNC45LTIuMS00LjktNS4xYzAtNCwwLTgsMC0xMS45YzAtMi44LDEuNy00LjgsNC41LTVjMy4zLTAuMyw2LjEtMS4yLDguMS0zLjljMi40LTMuMiwyLjgtNi43LDEtMTAuMw0KCQljLTEuOC0zLjctNS01LjYtOS4yLTUuNWMtNSwwLjItOC43LDMuNy05LjQsOC43Yy0wLjEsMC40LTAuMSwwLjktMC4xLDEuM2MtMC4zLDIuOC0yLjQsNC43LTUuMSw0LjZjLTIuNy0wLjEtNC44LTIuMi00LjctNQ0KCQljMC4yLTcsMy4yLTEyLjUsOS4xLTE2LjRDNTUuNywzMi43LDU5LjIsMzEuNyw2My4xLDMxLjd6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjMsODcuMmMzLjQsMC4xLDYuMSwzLDYsNi40Yy0wLjEsMy40LTMsNi02LjMsNS45Yy0zLjQtMC4xLTYuMS0zLTYtNi40QzU3LjEsODkuNyw1OS45LDg3LjEsNjMuMyw4Ny4yeiIvPg0KPC9nPg0KPC9zdmc+DQo=",
    answerMark: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0ic3ZnMiIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMjYuMiAxMjYuMiINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI2LjIgMTI2LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiMxOTVCODE7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04NC4xLDQxLjhjMy45LDAuNyw4LDEsMTEuNywyLjNjMTYuOCw1LjUsMjYuNywxNy4yLDI5LjQsMzQuN2MxLjEsNy41LDAsMTQuNy0zLDIxLjcNCgkJYy0wLjIsMC41LTAuMywxLjItMC4yLDEuOGMxLjEsNi4zLDIuMywxMi42LDMuNCwxOC45YzAuNSwzLTEuMyw0LjktNC4zLDQuNGMtNS41LTAuOS0xMC45LTEuOS0xNi4zLTNjLTIuMi0wLjQtNC4yLTAuNC02LjQsMC41DQoJCWMtMjQsOC45LTUwLjItNS42LTU1LjQtMzAuN2MtMC42LTIuNy0wLjctNS40LTEtOC4xYy0yLjctMC4zLTUuNS0wLjUtOC4yLTEuMWMtMi42LTAuNi01LjItMS42LTcuNy0yLjNjLTAuOC0wLjItMS43LTAuNC0yLjUtMC4zDQoJCWMtNi4xLDEuMS0xMi4yLDIuMi0xOC40LDMuNGMtMy4yLDAuNi01LjItMS4zLTQuNi00LjVDMS44LDczLDMsNjYuOCw0LjEsNjAuNWMwLjEtMC42LDAtMS4zLTAuMi0xLjhDLTQuNiwzOC40LDMuNywxNS4zLDIzLjIsNS4yDQoJCUM0Ny4zLTcuMyw3Nyw2LjYsODIuOSwzMy4xQzgzLjUsMzYuMSw4My43LDM5LjEsODQuMSw0MS44eiIvPg0KPC9nPg0KPC9zdmc+DQo=",
    // Agregar más SVGs del diseñador aquí
};
