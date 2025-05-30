import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_VARIANTS, BUTTON_SIZES } from './Button.constants.js';
import { getButtonClasses } from './Button.utils.js';
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

                    size = 'medium',

                    // Iconos (integración con tu componente Icon)
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
    // Generar clases usando utilidades
    const buttonClasses = getButtonClasses({
        variant,
        size,
        fullWidth,
        disabled,
        loading,
        hasIcon: !!icon,
        color,
        className
    });

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
        ...props
    };

    // Renderizar icono
    const renderIcon = () => {
        if (loading) {
            return (
                <Icon
                    name="spinner"
                    size={iconSize || (size === 'small' ? 'xs' : size === 'large' ? 'medium' : 'small')}
                    className="animate-spin"
                    color={iconColor}
                />
            );
        }

        if (icon) {
            return (
                <Icon
                    name={icon}
                    size={iconSize || (size === 'small' ? 'xs' : size === 'large' ? 'medium' : 'small')}
                    color={iconColor}
                />
            );
        }

        return null;
    };

    // Renderizar contenido del botón
    const renderContent = () => {
        const iconElement = renderIcon();
        const hasText = children && !loading;

        // Solo icono (sin texto)
        if (iconElement && !hasText) {
            return iconElement;
        }

        // Solo texto (sin icono)
        if (!iconElement && hasText) {
            return (
                <Text
                    size={size === 'small' ? 'small' : size === 'large' ? 'medium' : 'small'}
                    className="button-text"
                    textColor={textColor}
                >
                    {children}
                </Text>
            );
        }

        // Icono + texto
        if (iconElement && hasText) {
            return (
                <>
                    {iconPosition === 'left' && iconElement}
                    {iconPosition === 'top' && iconElement}

                    <Text
                        size={size === 'small' ? 'small' : size === 'large' ? 'medium' : 'small'}
                        className="button-text"
                        textColor={textColor}
                    >
                        {loading ? 'Cargando...' : children}
                    </Text>

                    {iconPosition === 'right' && iconElement}
                    {iconPosition === 'bottom' && iconElement}
                </>
            );
        }

        // Fallback
        return children;
    };

    return (
        <Component {...elementProps}>
            {renderContent()}
        </Component>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(Object.keys(BUTTON_VARIANTS)),
    size: PropTypes.oneOf(Object.keys(BUTTON_SIZES)),
    textColor: PropTypes.string, // ✅ NUEVA PROP
    iconColor: PropTypes.string, // ✅ NUEVA PROP
    color: PropTypes.string,
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    iconSize: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    as: PropTypes.oneOf(['button', 'a', 'link', 'div']),
    href: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    className: PropTypes.string
};

Button.defaultProps = {
    type: 'button',
    variant: 'primary',
    size: 'medium',
    iconPosition: 'left',
    loading: false,
    disabled: false,
    fullWidth: false,
    as: 'button',
    className: ''
};

export default Button;
