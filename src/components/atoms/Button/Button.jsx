import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants.js';
import { getButtonBEMClasses, getContrastTextColor } from './Button.utils.js';
import Icon from '../Icon/Icon.jsx';
import Text from '../Text/Text.jsx';
import './Button.css';

const Button = ({
                    // Contenido
                    children,

                    // Tipo y variante
                    type = 'button',
                    variant = 'primary',
                    color,
                    textColor,

                    // Tamaño
                    size = 'medium',

                    // Iconos
                    icon,
                    iconPosition = 'left',
                    iconSize,
                    iconColor,

                    // Estados
                    loading = false,
                    disabled = false,

                    // Layout
                    fullWidth = false,

                    // Elemento HTML
                    as = 'button',
                    href,
                    target,

                    // Eventos
                    onClick,
                    onMouseEnter,
                    onMouseLeave,
                    onFocus,
                    onBlur,

                    // Estilos
                    className = '',

                    // Props adicionales
                    ...props
                }) => {
    // Generar clases BEM
    const buttonClasses = getButtonBEMClasses({
        variant,
        size,
        fullWidth,
        disabled,
        loading,
        hasIcon: !!icon,
        iconPosition,
        color,
        className
    });

    // Determinar color de texto automático
    const autoTextColor = textColor || getContrastTextColor(variant, color);

    // Determinar el elemento a renderizar
    const Component = as === 'link' ? 'a' : as;

    // Props específicas según el elemento
    const elementProps = {
        ...(Component === 'a' && { href, target }),
        ...(Component === 'button' && { type, disabled: disabled || loading }),
        onClick: !disabled && !loading ? onClick : undefined,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        className: buttonClasses,
        'data-testid': 'Button',
        'aria-disabled': disabled || loading,
        'aria-busy': loading,
        ...props
    };

    // Renderizar icono
    const renderIcon = () => {
        if (loading) {
            return (
                <Icon
                    name="spinner"
                    size={iconSize || getIconSizeFromButtonSize(size)}
                    className="button__icon button__icon--loading"
                    color={iconColor || autoTextColor}
                    ariaLabel="Cargando"
                />
            );
        }

        if (icon) {
            return (
                <Icon
                    name={icon}
                    size={iconSize || getIconSizeFromButtonSize(size)}
                    className="button__icon"
                    color={iconColor || autoTextColor}
                />
            );
        }

        return null;
    };

    // Renderizar texto
    const renderText = (content) => {
        return (
            <Text
                size={getTextSizeFromButtonSize(size)}
                className="button__text"
                textColor={autoTextColor}
            >
                {content}
            </Text>
        );
    };

    // Renderizar contenido del botón
    const renderContent = () => {
        const iconElement = renderIcon();
        const textContent = loading ? 'Cargando...' : children;
        const hasText = textContent && typeof textContent !== 'undefined';

        // Solo icono (sin texto)
        if (iconElement && !hasText) {
            return iconElement;
        }

        // Solo texto (sin icono)
        if (!iconElement && hasText) {
            return renderText(textContent);
        }

        // Icono + texto
        if (iconElement && hasText) {
            const textElement = renderText(textContent);

            switch (iconPosition) {
                case 'top':
                    return (
                        <>
                            {iconElement}
                            {textElement}
                        </>
                    );
                case 'bottom':
                    return (
                        <>
                            {textElement}
                            {iconElement}
                        </>
                    );
                case 'right':
                    return (
                        <>
                            {textElement}
                            {iconElement}
                        </>
                    );
                case 'left':
                default:
                    return (
                        <>
                            {iconElement}
                            {textElement}
                        </>
                    );
            }
        }

        // Fallback
        return textContent;
    };

    return (
        <Component {...elementProps}>
            {renderContent()}
        </Component>
    );
};

// Funciones auxiliares
const getIconSizeFromButtonSize = (size) => {
    switch (size) {
        case 'xs':
            return 'xs';
        case 'small':
            return 'small';
        case 'large':
            return 'medium';
        case 'xlarge':
            return 'large';
        case 'game':
            return 'small';
        case 'medium':
        default:
            return 'small';
    }
};

const getTextSizeFromButtonSize = (size) => {
    switch (size) {
        case 'xs':
            return 'xs';
        case 'small':
            return 'small';
        case 'large':
            return 'medium';
        case 'xlarge':
            return 'large';
        case 'game':
            return 'small';
        case 'medium':
        default:
            return 'small';
    }
};

Button.propTypes = {
    // Contenido
    children: PropTypes.node,

    // Tipo y variante
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(Object.keys(BUTTON_VARIANTS)),
    color: PropTypes.string, // ✅ QUITAR restricción de valores específicos
    textColor: PropTypes.string, // ✅ Permitir cualquier string

    // Tamaño
    size: PropTypes.oneOf(Object.keys(BUTTON_SIZES)),

    // Iconos
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,

    // Estados
    loading: PropTypes.bool,
    disabled: PropTypes.bool,

    // Layout
    fullWidth: PropTypes.bool,

    // Elemento HTML
    as: PropTypes.oneOf(['button', 'a', 'link', 'div']),
    href: PropTypes.string,
    target: PropTypes.string,

    // Eventos
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    // Estilos
    className: PropTypes.string
};

export default Button;
