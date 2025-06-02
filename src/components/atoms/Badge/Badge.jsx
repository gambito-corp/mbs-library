import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx';
import Text from '../Text/Text.jsx';

const Badge = ({
                   // Contenido
                   children,
                   count,

                   // Variantes y estados
                   variant = 'default',
                   size = 'medium',
                   shape = 'rounded', // rounded, pill, square

                   // Iconos
                   icon,
                   iconPosition = 'left',

                   // Funcionalidad
                   dismissible = false,
                   onDismiss,

                   // Posicionamiento (para badges overlay)
                   positioned = false,
                   position = 'top-right', // top-right, top-left, bottom-right, bottom-left

                   // Estados visuales
                   dot = false,        // Badge tipo punto
                   invisible = false,  // Ocultar badge
                   showZero = false,   // Mostrar cuando count es 0
                   max = 99,          // Valor máximo para count

                   // Eventos
                   onClick,

                   // Estilos
                   className = '',

                   ...props
               }) => {
    // Determinar el contenido a mostrar
    const getDisplayContent = () => {
        if (dot) return null;
        if (count !== undefined) {
            if (count === 0 && !showZero) return null;
            return count > max ? `${max}+` : count;
        }
        return children;
    };

    // Determinar si el badge debe ser invisible
    const shouldBeInvisible = () => {
        if (invisible) return true;
        if (count !== undefined && count === 0 && !showZero) return true;
        if (!children && count === undefined && !dot) return true;
        return false;
    };

    // Clases de variante
    const variantClasses = {
        default: 'bg-gray-100 text-gray-800 border border-gray-200',
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-black',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-400 text-white',
        light: 'bg-gray-50 text-gray-700 border border-gray-200',
        dark: 'bg-gray-800 text-white'
    };

    // Clases de tamaño
    const sizeClasses = {
        small: dot ? 'w-2 h-2' : 'px-1.5 py-0.5 text-xs min-w-[1rem] h-4',
        medium: dot ? 'w-2.5 h-2.5' : 'px-2 py-1 text-xs min-w-[1.25rem] h-5',
        large: dot ? 'w-3 h-3' : 'px-2.5 py-1 text-sm min-w-[1.5rem] h-6'
    };

    // Clases de forma
    const shapeClasses = {
        rounded: 'rounded',
        pill: 'rounded-full',
        square: 'rounded-none'
    };

    // Clases de posición para badges overlay
    const positionClasses = {
        'top-right': 'absolute -top-1 -right-1 transform translate-x-1/2 -translate-y-1/2',
        'top-left': 'absolute -top-1 -left-1 transform -translate-x-1/2 -translate-y-1/2',
        'bottom-right': 'absolute -bottom-1 -right-1 transform translate-x-1/2 translate-y-1/2',
        'bottom-left': 'absolute -bottom-1 -left-1 transform -translate-x-1/2 translate-y-1/2'
    };

    // Renderizar icono
    const renderIcon = () => {
        if (!icon || dot) return null;

        const iconSize = size === 'small' ? 'xs' : size === 'large' ? 'small' : 'xs';

        return (
            <Icon
                name={icon}
                size={iconSize}
                className={`${iconPosition === 'right' ? 'ml-1' : 'mr-1'} flex-shrink-0`}
            />
        );
    };

    // Renderizar botón de cerrar
    const renderDismissButton = () => {
        if (!dismissible) return null;

        const iconSize = size === 'small' ? 'xs' : 'xs';

        return (
            <Icon
                name="times"
                size={iconSize}
                onClick={onDismiss}
                className="ml-1 cursor-pointer hover:opacity-70 flex-shrink-0"
            />
        );
    };

    // Si debe ser invisible, no renderizar nada
    if (shouldBeInvisible()) {
        return null;
    }

    const displayContent = getDisplayContent();

    // Clases CSS combinadas
    const badgeClasses = [
        'badge-component inline-flex items-center justify-center font-medium transition-all duration-200',
        variantClasses[variant],
        sizeClasses[size],
        shapeClasses[shape],
        positioned && positionClasses[position],
        positioned && 'z-10',
        onClick && 'cursor-pointer hover:opacity-80',
        dot && 'rounded-full',
        className
    ].filter(Boolean).join(' ');

    const BadgeElement = (
        <span
            className={badgeClasses}
            onClick={onClick}
            data-testid="Badge"
            data-variant={variant}
            data-size={size}
            data-positioned={positioned}
            data-dot={dot}
            {...props}
        >
            {iconPosition === 'left' && renderIcon()}

            {!dot && displayContent && (
                <Text
                    size={size === 'large' ? 'small' : 'xs'}
                    className="leading-none font-medium"
                >
                    {displayContent}
                </Text>
            )}

            {iconPosition === 'right' && renderIcon()}
            {renderDismissButton()}
        </span>
    );

    // Si es positioned, envolver en contenedor relativo
    if (positioned) {
        return (
            <div className="relative inline-block">
                {BadgeElement}
            </div>
        );
    }

    return BadgeElement;
};

Badge.propTypes = {
    // Contenido
    children: PropTypes.node,
    count: PropTypes.number,

    // Variantes y estados
    variant: PropTypes.oneOf([
        'default', 'primary', 'secondary', 'success',
        'warning', 'error', 'info', 'light', 'dark'
    ]),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    shape: PropTypes.oneOf(['rounded', 'pill', 'square']),

    // Iconos
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),

    // Funcionalidad
    dismissible: PropTypes.bool,
    onDismiss: PropTypes.func,

    // Posicionamiento
    positioned: PropTypes.bool,
    position: PropTypes.oneOf(['top-right', 'top-left', 'bottom-right', 'bottom-left']),

    // Estados visuales
    dot: PropTypes.bool,
    invisible: PropTypes.bool,
    showZero: PropTypes.bool,
    max: PropTypes.number,

    // Eventos
    onClick: PropTypes.func,

    // Estilos
    className: PropTypes.string
};

export default Badge;
