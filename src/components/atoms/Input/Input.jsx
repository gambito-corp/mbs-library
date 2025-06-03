import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx';
import Text from '../Text/Text.jsx';

const Input = ({
                   // Contenido
                   value,
                   defaultValue,
                   placeholder = '',

                   // Tipo y variante
                   type = 'text',
                   variant = 'default',
                   size = 'medium',

                   // Estados
                   disabled = false,
                   readOnly = false,
                   required = false,
                   error,
                   success,
                   helperText,

                   // Iconos con callbacks
                   icon,
                   iconLeft,
                   iconRight,
                   iconPosition = 'left',

                   // Callbacks para iconos
                   onIconClick,
                   onIconLeftClick,
                   onIconRightClick,

                   // Password toggle
                   showPasswordToggle = false,

                   // Label
                   label,

                   // Layout
                   fullWidth = true,

                   // Eventos
                   onChange,
                   onBlur,
                   onFocus,
                   onKeyDown,

                   // HTML attributes
                   id,
                   name,
                   autoComplete,
                   autoFocus,
                   maxLength,
                   minLength,

                   // Estilos
                   className = '',

                   ...props
               }) => {
    // Estado interno para toggle de contraseña
    const [showPassword, setShowPassword] = useState(false);
    const [currentType, setCurrentType] = useState(type);

    // Efecto para manejar cambios de tipo
    React.useEffect(() => {
        if (showPasswordToggle && type === 'password') {
            setCurrentType(showPassword ? 'text' : 'password');
        } else {
            setCurrentType(type);
        }
    }, [type, showPassword, showPasswordToggle]);

    // Clases de tamaño
    const sizeClasses = {
        small: 'px-3 py-1.5 text-sm h-8',
        medium: 'px-3 py-2 text-base h-10',
        large: 'px-4 py-3 text-lg h-12'
    };

    // Clases de variante/estado
    const variantClasses = {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        success: 'border-green-500 bg-green-50 focus:border-green-600 focus:ring-2 focus:ring-green-100',
        error: 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-100',
        warning: 'border-yellow-500 bg-yellow-50 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100'
    };

    // Determinar variante basada en props
    const currentVariant = error ? 'error' : success ? 'success' : variant;

    // Lógica para iconos con callbacks
    const getIconConfig = () => {
        let leftIconConfig = null;
        let rightIconConfig = null;

        // Configurar icono izquierdo
        if (iconLeft) {
            leftIconConfig = {
                name: iconLeft,
                onClick: onIconLeftClick,
                clickable: !!onIconLeftClick
            };
        } else if (icon && iconPosition === 'left') {
            leftIconConfig = {
                name: icon,
                onClick: onIconClick,
                clickable: !!onIconClick
            };
        }

        // Configurar icono derecho
        if (iconRight) {
            rightIconConfig = {
                name: iconRight,
                onClick: onIconRightClick,
                clickable: !!onIconRightClick
            };
        } else if (icon && iconPosition === 'right') {
            rightIconConfig = {
                name: icon,
                onClick: onIconClick,
                clickable: !!onIconClick
            };
        }

        // Auto-configurar toggle de contraseña
        if (showPasswordToggle && type === 'password') {
            const passwordToggleConfig = {
                name: showPassword ? 'eye-slash' : 'eye',
                onClick: () => setShowPassword(!showPassword),
                clickable: true
            };

            // Si no hay icono derecho, usar para toggle
            if (!rightIconConfig) {
                rightIconConfig = passwordToggleConfig;
            }
        }

        return { leftIconConfig, rightIconConfig };
    };

    const { leftIconConfig, rightIconConfig } = getIconConfig();

    // Calcular padding dinámico
    const getPaddingClasses = () => {
        const basePadding = sizeClasses[size];
        let leftPadding = '';
        let rightPadding = '';

        if (leftIconConfig) {
            leftPadding = size === 'small' ? 'pl-8' : size === 'large' ? 'pl-12' : 'pl-10';
        }

        if (rightIconConfig) {
            rightPadding = size === 'small' ? 'pr-8' : size === 'large' ? 'pr-12' : 'pr-10';
        }

        if (leftIconConfig && rightIconConfig) {
            const bothPadding = size === 'small' ? 'px-8' : size === 'large' ? 'px-12' : 'px-10';
            return `py-${basePadding.split(' ')[1].split('-')[1]} ${bothPadding}`;
        }

        if (leftPadding || rightPadding) {
            const verticalPadding = basePadding.split(' ').find(c => c.startsWith('py-'));
            return `${verticalPadding} ${leftPadding} ${rightPadding}`.trim();
        }

        return basePadding;
    };

    // Renderizar icono con callback
    const renderIconWithCallback = (iconConfig, position) => {
        if (!iconConfig) return null;

        const iconSize = size === 'small' ? 'xs' : size === 'large' ? 'medium' : 'small';
        const positionClass = position === 'left' ? 'left-3' : 'right-3';

        return (
            <Icon
                name={iconConfig.name}
                size={iconSize}
                onClick={iconConfig.clickable ? iconConfig.onClick : undefined}
                className={`
                    absolute ${positionClass} top-1/2 transform -translate-y-1/2 
                    ${iconConfig.clickable ? 'text-gray-600 cursor-pointer hover:text-blue-500' : 'text-gray-400 pointer-events-none'}
                    transition-colors duration-200
                `}
            />
        );
    };

    // Renderizar mensaje
    const renderMessage = () => {
        const message = error || success || helperText;
        if (!message) return null;

        const messageColor = error ? 'text-red-500' : success ? 'text-green-500' : 'text-gray-500';

        return (
            <Text
                size="xs"
                className={`mt-1 block ${messageColor}`}
            >
                {message}
            </Text>
        );
    };

    return (
        <div className={`input-container ${fullWidth ? 'w-full' : 'inline-block'}`}>
            {/* ✅ LABEL CORREGIDO */}
            {label && (
                <Text
                    as="label"
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Text>
            )}

            {/* ✅ INPUT WRAPPER */}
            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={currentType}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    maxLength={maxLength}
                    minLength={minLength}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    className={`
                        input-field w-full border rounded-lg transition-all duration-200 focus:outline-none
                        ${getPaddingClasses()}
                        ${sizeClasses[size].split(' ').find(c => c.startsWith('text-'))}
                        ${sizeClasses[size].split(' ').find(c => c.startsWith('h-'))}
                        ${variantClasses[currentVariant]}
                        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white'}
                        ${readOnly ? 'bg-gray-50 cursor-default' : ''}
                        ${className}
                    `}
                    aria-invalid={!!error}
                    aria-describedby={
                        error ? `${id}-error` :
                            helperText ? `${id}-helper` : undefined
                    }
                    data-testid={id || 'input-field'}
                    {...props}
                />

                {/* ✅ ICONOS */}
                {renderIconWithCallback(leftIconConfig, 'left')}
                {renderIconWithCallback(rightIconConfig, 'right')}
            </div>

            {/* ✅ MENSAJE */}
            {renderMessage()}
        </div>
    );
};

Input.propTypes = {
    // Contenido
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,

    // Tipo y variante
    type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search']),
    variant: PropTypes.oneOf(['default', 'success', 'error', 'warning']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),

    // Estados
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.string,
    success: PropTypes.string,
    helperText: PropTypes.string,

    // Iconos
    icon: PropTypes.string,
    iconLeft: PropTypes.string,
    iconRight: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),

    // Callbacks
    onIconClick: PropTypes.func,
    onIconLeftClick: PropTypes.func,
    onIconRightClick: PropTypes.func,
    showPasswordToggle: PropTypes.bool,

    // Label
    label: PropTypes.string,

    // Layout
    fullWidth: PropTypes.bool,

    // Eventos
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,

    // HTML attributes
    id: PropTypes.string,
    name: PropTypes.string,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,

    // Estilos
    className: PropTypes.string
};

export default Input;
