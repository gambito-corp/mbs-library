import Icon from './Icon.jsx';
import { ICON_SIZES, ICON_VARIANTS } from './Icon.constants.js';

export const IconConfig = {
    component: Icon,
    name: 'Icon',
    category: 'atoms',
    description: 'Componente de icono universal que soporta FontAwesome, SVG personalizados, imágenes, emojis y más',

    props: {
        // FontAwesome
        name: {
            type: 'string',
            required: false,
            description: 'Nombre del icono de FontAwesome',
            examples: ['home', 'user', 'search', 'heart']
        },
        type: {
            type: 'string',
            required: false,
            default: 'fas',
            options: ['fas', 'far', 'fab', 'fal', 'fad'],
            description: 'Tipo de icono FontAwesome'
        },

        // Custom content
        svg: {
            type: 'string',
            required: false,
            description: 'Código SVG personalizado'
        },
        svgData: {
            type: 'string',
            required: false,
            description: 'SVG en formato base64 (como los del diseñador)'
        },
        src: {
            type: 'string',
            required: false,
            description: 'URL de imagen para icono'
        },
        emoji: {
            type: 'string',
            required: false,
            description: 'Emoji como icono'
        },

        // Styling
        size: {
            type: 'string',
            required: false,
            default: 'medium',
            options: Object.keys(ICON_SIZES),
            description: 'Tamaño del icono'
        },
        variant: {
            type: 'string',
            required: false,
            default: 'default',
            options: Object.keys(ICON_VARIANTS),
            description: 'Variante de color del icono'
        },
        color: {
            type: 'string',
            required: false,
            description: 'Color personalizado del icono'
        }
    },

    variants: [
        {
            name: 'FontAwesome básico',
            description: 'Icono de FontAwesome estándar',
            code: `<Icon name="heart" />`,
            props: {
                name: 'heart'
            }
        },
        {
            name: 'FontAwesome con tipo',
            description: 'Icono FontAwesome con tipo específico',
            code: `<Icon name="heart" type="far" size="large" />`,
            props: {
                name: 'heart',
                type: 'far',
                size: 'large'
            }
        },
        {
            name: 'SVG del diseñador',
            description: 'Usando el SVG base64 del diseñador',
            code: `<Icon 
  svgData="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0ic3ZnMiIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMjYuMiAxMjYuMiINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI2LjIgMTI2LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Ni44LDEyNi4yYy0yLjUsMC00LjksMC03LjQsMGMtMC4zLTAuMS0wLjYtMC4yLTEtMC4yYy04LjgtMC42LTE3LjItMi45LTI1LTcuMkMxNS43LDEwOSw0LjgsOTQuMSwxLDc0LjENCgkJYy0wLjUtMi40LTAuNy00LjktMS03LjNjMC0yLjUsMC00LjksMC03LjRjMC4xLTAuNCwwLjItMC43LDAuMi0xLjFjMC42LTguOCwyLjktMTcuMiw3LjItMjQuOUMxOSwxMi44LDM2LjgsMS42LDYwLjQsMC4xDQoJCUM3MC43LTAuNSw4MC41LDEuNCw4OS43LDZjMjIuNSwxMS4yLDM0LjcsMjkuNCwzNi40LDU0LjVjMC44LDExLjUtMS44LDIyLjQtNy40LDMyLjVjLTkuOCwxNy43LTI0LjgsMjguNS00NC43LDMyLjMNCgkJQzcxLjYsMTI1LjcsNjkuMiwxMjUuOSw2Ni44LDEyNi4yeiBNMTE2LjMsNjMuMkMxMTYuNCwzMy44LDkyLjYsMTAsNjMuMiw5LjlDMzMuOCw5LjgsOS45LDMzLjYsOS45LDYzLjENCgkJQzkuOCw5Mi40LDMzLjYsMTE2LjIsNjMsMTE2LjNDOTIuMywxMTYuNCwxMTYuMyw5Mi42LDExNi4zLDYzLjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjEsMzEuN2M5LjUsMCwxNy45LDcsMTkuNSwxNi4zYzEuNiw5LjctMy45LDE5LTEzLjEsMjJjLTEuMSwwLjQtMS41LDAuOC0xLjQsMmMwLjEsMi4xLDAsNC4yLDAsNi4zDQoJCWMwLDMtMi4xLDUuMi01LDUuMWMtMi44LDAtNC45LTIuMS00LjktNS4xYzAtNCwwLTgsMC0xMS45YzAtMi44LDEuNy00LjgsNC41LTVjMy4zLTAuMyw2LjEtMS4yLDguMS0zLjljMi40LTMuMiwyLjgtNi43LDEtMTAuMw0KCQljLTEuOC0zLjctNS01LjYtOS4yLTUuNWMtNSwwLjItOC43LDMuNy05LjQsOC43Yy0wLjEsMC40LTAuMSwwLjktMC4xLDEuM2MtMC4zLDIuOC0yLjQsNC43LTUuMSw0LjZjLTIuNy0wLjEtNC44LTIuMi00LjctNQ0KCQljMC4yLTcsMy4yLTEyLjUsOS4xLTE2LjRDNTUuNywzMi43LDU5LjIsMzEuNyw2My4xLDMxLjd6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjMsODcuMmMzLjQsMC4xLDYuMSwzLDYsNi40Yy0wLjEsMy40LTMsNi02LjMsNS45Yy0zLjQtMC4xLTYuMS0zLTYtNi40QzU3LjEsODkuNyw1OS45LDg3LjEsNjMuMyw4Ny4yeiIvPg0KPC9nPg0KPC9zdmc+DQo=" 
  size="large" 
  alt="Pregunta"
/>`,
            props: {
                svgData: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNC4yLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0ic3ZnMiIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCgkgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMjYuMiAxMjYuMiINCgkgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI2LjIgMTI2LjI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik02Ni44LDEyNi4yYy0yLjUsMC00LjksMC03LjQsMGMtMC4zLTAuMS0wLjYtMC4yLTEtMC4yYy04LjgtMC42LTE3LjItMi45LTI1LTcuMkMxNS43LDEwOSw0LjgsOTQuMSwxLDc0LjENCgkJYy0wLjUtMi40LTAuNy00LjktMS03LjNjMC0yLjUsMC00LjksMC03LjRjMC4xLTAuNCwwLjItMC43LDAuMi0xLjFjMC42LTguOCwyLjktMTcuMiw3LjItMjQuOUMxOSwxMi44LDM2LjgsMS42LDYwLjQsMC4xDQoJCUM3MC43LTAuNSw4MC41LDEuNCw4OS43LDZjMjIuNSwxMS4yLDM0LjcsMjkuNCwzNi40LDU0LjVjMC44LDExLjUtMS44LDIyLjQtNy40LDMyLjVjLTkuOCwxNy43LTI0LjgsMjguNS00NC43LDMyLjMNCgkJQzcxLjYsMTI1LjcsNjkuMiwxMjUuOSw2Ni44LDEyNi4yeiBNMTE2LjMsNjMuMkMxMTYuNCwzMy44LDkyLjYsMTAsNjMuMiw5LjlDMzMuOCw5LjgsOS45LDMzLjYsOS45LDYzLjENCgkJQzkuOCw5Mi40LDMzLjYsMTE2LjIsNjMsMTE2LjNDOTIuMywxMTYuNCwxMTYuMyw5Mi42LDExNi4zLDYzLjJ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjEsMzEuN2M5LjUsMCwxNy45LDcsMTkuNSwxNi4zYzEuNiw5LjctMy45LDE5LTEzLjEsMjJjLTEuMSwwLjQtMS41LDAuOC0xLjQsMmMwLjEsMi4xLDAsNC4yLDAsNi4zDQoJCWMwLDMtMi4xLDUuMi01LDUuMWMtMi44LDAtNC45LTIuMS00LjktNS4xYzAtNCwwLTgsMC0xMS45YzAtMi44LDEuNy00LjgsNC41LTVjMy4zLTAuMyw2LjEtMS4yLDguMS0zLjljMi40LTMuMiwyLjgtNi43LDEtMTAuMw0KCQljLTEuOC0zLjctNS01LjYtOS4yLTUuNWMtNSwwLjItOC43LDMuNy05LjQsOC43Yy0wLjEsMC40LTAuMSwwLjktMC4xLDEuM2MtMC4zLDIuOC0yLjQsNC43LTUuMSw0LjZjLTIuNy0wLjEtNC44LTIuMi00LjctNQ0KCQljMC4yLTcsMy4yLTEyLjUsOS4xLTE2LjRDNTUuNywzMi43LDU5LjIsMzEuNyw2My4xLDMxLjd6Ii8+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTYzLjMsODcuMmMzLjQsMC4xLDYuMSwzLDYsNi40Yy0wLjEsMy40LTMsNi02LjMsNS45Yy0zLjQtMC4xLTYuMS0zLTYtNi40QzU3LjEsODkuNyw1OS45LDg3LjEsNjMuMyw4Ny4yeiIvPg0KPC9nPg0KPC9zdmc+DQo=",
                size: 'large',
                alt: 'Pregunta'
            }
        },
        {
            name: 'Emoji como icono',
            description: 'Usando emojis como iconos',
            code: `<Icon emoji="🚀" size="2x" />`,
            props: {
                emoji: '🚀',
                size: '2x'
            }
        },
        {
            name: 'Icono con variante de color',
            description: 'Icono con color semántico',
            code: `<Icon name="check-circle" variant="success" size="large" />`,
            props: {
                name: 'check-circle',
                variant: 'success',
                size: 'large'
            }
        },
        {
            name: 'Icono de error',
            description: 'Icono de error con variante',
            code: `<Icon name="exclamation-triangle" variant="error" size="large" />`,
            props: {
                name: 'exclamation-triangle',
                variant: 'error',
                size: 'large'
            }
        },
        {
            name: 'Icono interactivo',
            description: 'Icono con click handler',
            code: `<Icon 
  name="heart" 
  size="large" 
  variant="error"
  onClick={() => alert('❤️ Me gusta!')}
/>`,
            props: {
                name: 'heart',
                size: 'large',
                variant: 'error',
                onClick: () => alert('❤️ Me gusta!')
            }
        },
        {
            name: 'Icono de carga',
            description: 'Icono animado de carga',
            code: `<Icon loading={true} size="large" />`,
            props: {
                loading: true,
                size: 'large'
            }
        },
        {
            name: 'Icono personalizado',
            description: 'Icono con color personalizado',
            code: `<Icon 
  name="star" 
  size="2x" 
  color="#fbbf24"
/>`,
            props: {
                name: 'star',
                size: '2x',
                color: '#fbbf24'
            }
        },
        {
            name: 'Redes sociales',
            description: 'Iconos de redes sociales',
            code: `<Icon name="github" type="fab" size="large" variant="primary" />`,
            props: {
                name: 'github',
                type: 'fab',
                size: 'large',
                variant: 'primary'
            }
        },
        {
            name: 'Navegación',
            description: 'Iconos de navegación',
            code: `<Icon name="arrow-left" size="medium" variant="muted" />`,
            props: {
                name: 'arrow-left',
                size: 'medium',
                variant: 'muted'
            }
        },
        {
            name: 'Estados múltiples',
            description: 'Diferentes estados en un grupo',
            code: `<div style={{display: 'flex', gap: '10px'}}>
  <Icon name="check-circle" variant="success" />
  <Icon name="exclamation-triangle" variant="warning" />
  <Icon name="times-circle" variant="error" />
  <Icon name="info-circle" variant="info" />
</div>`,
            props: {
                name: 'check-circle',
                variant: 'success'
            }
        },
        {
            name: 'Iconos con colores Tailwind',
            description: 'Iconos usando colores Tailwind personalizados',
            code: `<div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
  <Icon name="heart" textColor="red" size="large" />
  <Icon name="star" textColor="yellow" size="large" />
  <Icon name="check" textColor="green" size="large" />
  <Icon name="info-circle" textColor="blue" size="large" />
  <Icon name="warning" textColor="orange" size="large" />
</div>`,
            props: {
                name: 'heart',
                textColor: 'red',
                size: 'large'
            }
        },
        {
            name: 'Tonos específicos',
            description: 'Iconos con tonos específicos de colores',
            code: `<div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
  <Icon name="heart" textColor="red-400" size="large" />
  <Icon name="heart" textColor="red-600" size="large" />
  <Icon name="heart" textColor="red-700" size="large" />
</div>`,
            props: {
                name: 'heart',
                textColor: 'red-600',
                size: 'large'
            }
        }
    ]
};
