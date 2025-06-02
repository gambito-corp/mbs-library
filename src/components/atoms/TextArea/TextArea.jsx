import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx';
import Text from '../Text/Text.jsx';

const TextArea = ({
                      // Contenido
                      value,
                      defaultValue,
                      placeholder = '',

                      // Variante y tamaño
                      variant = 'default',
                      size = 'medium',

                      // Estados
                      disabled = false,
                      readOnly = false,
                      required = false,
                      error,
                      success,
                      helperText,

                      // Iconos con callbacks (heredado del Input)
                      iconLeft,
                      iconRight,
                      onIconLeftClick,
                      onIconRightClick,

                      // ✅ CARACTERÍSTICAS ESPECÍFICAS DE TEXTAREA
                      rows = 3,                    // Filas por defecto
                      cols,                        // Columnas (opcional)
                      resize = 'vertical',         // none, horizontal, vertical, both
                      autoGrow = false,           // Crecimiento automático
                      maxRows = 10,               // Máximo de filas para autoGrow
                      minRows = 2,                // Mínimo de filas para autoGrow

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
    // ✅ Estados para autoGrow
    const [currentRows, setCurrentRows] = useState(rows);
    const textareaRef = useRef(null);

    // Clases de tamaño
    const sizeClasses = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-3 py-2 text-base',
        large: 'px-4 py-3 text-lg'
    };

    // Clases de variante/estado (heredadas del Input)
    const variantClasses = {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        success: 'border-green-500 bg-green-50 focus:border-green-600 focus:ring-2 focus:ring-green-100',
        error: 'border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-100',
        warning: 'border-yellow-500 bg-yellow-50 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-100'
    };

    // ✅ Clases de resize
    const resizeClasses = {
        none: 'resize-none',
        horizontal: 'resize-x',
        vertical: 'resize-y',
        both: 'resize'
    };

    // Determinar variante basada en props
    const currentVariant = error ? 'error' : success ? 'success' : variant;

    // ✅ LÓGICA DE AUTO-GROW
    const adjustHeight = () => {
        if (!autoGrow || !textareaRef.current) return;

        const textarea = textareaRef.current;
        textarea.style.height = 'auto';

        const scrollHeight = textarea.scrollHeight;
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const newRows = Math.min(Math.max(Math.ceil(scrollHeight / lineHeight), minRows), maxRows);

        setCurrentRows(newRows);
        textarea.style.height = `${scrollHeight}px`;
    };

    // Efecto para autoGrow
    useEffect(() => {
        if (autoGrow) {
            adjustHeight();
        }
    }, [value, autoGrow]);

    // Calcular padding para iconos
    const getPaddingClasses = () => {
        const basePadding = sizeClasses[size];
        let leftPadding = '';
        let rightPadding = '';

        if (iconLeft) {
            leftPadding = size === 'small' ? 'pl-8' : size === 'large' ? 'pl-12' : 'pl-10';
        }

        if (iconRight) {
            rightPadding = size === 'small' ? 'pr-8' : size === 'large' ? 'pr-12' : 'pr-10';
        }

        if (iconLeft && iconRight) {
            const bothPadding = size === 'small' ? 'px-8' : size === 'large' ? 'px-12' : 'px-10';
            return `py-${basePadding.split(' ')[1].split('-')[1]} ${bothPadding}`;
        }

        if (leftPadding || rightPadding) {
            const verticalPadding = basePadding.split(' ').find(c => c.startsWith('py-'));
            return `${verticalPadding} ${leftPadding} ${rightPadding}`.trim();
        }

        return basePadding;
    };

    // Renderizar label (heredado del Input)
    const renderLabel = () => {
        if (!label) return null;

        return (
            <Text
                as="label"
                htmlFor={id}
                size="small"
                variant="bold"
                className="block mb-1"
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Text>
        );
    };

    // Renderizar iconos (heredado del Input)
    const renderIcon = (iconName, position, onClick) => {
        if (!iconName) return null;

        const iconSize = size === 'small' ? 'xs' : size === 'large' ? 'medium' : 'small';
        const positionClass = position === 'left' ? 'left-3 top-4' : 'right-3 top-4';

        return (
            <Icon
                name={iconName}
                size={iconSize}
                onClick={onClick}
                className={`
                    absolute ${positionClass}
                    ${onClick ? 'text-gray-600 cursor-pointer hover:text-blue-500' : 'text-gray-400 pointer-events-none'}
                    transition-colors duration-200
                `}
            />
        );
    };

    // Renderizar mensaje (heredado del Input)
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

    // ✅ Renderizar contador de caracteres
    const renderCharacterCount = () => {
        if (!maxLength) return null;

        const currentLength = value ? value.length : 0;
        const isNearLimit = currentLength > maxLength * 0.8;
        const isOverLimit = currentLength > maxLength;

        return (
            <Text
                size="xs"
                className={`mt-1 text-right block ${
                    isOverLimit ? 'text-red-500' :
                        isNearLimit ? 'text-yellow-500' :
                            'text-gray-400'
                }`}
            >
                {currentLength}{maxLength && `/${maxLength}`}
            </Text>
        );
    };

    // Manejar cambios con autoGrow
    const handleChange = (e) => {
        if (onChange) {
            onChange(e);
        }

        if (autoGrow) {
            // Usar setTimeout para que el DOM se actualice primero
            setTimeout(adjustHeight, 0);
        }
    };

    return (
        <div className={`textarea-container ${fullWidth ? 'w-full' : 'inline-block'}`}>
            {renderLabel()}

            <div className="relative">
                <textarea
                    ref={textareaRef}
                    id={id}
                    name={name}
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
                    rows={autoGrow ? currentRows : rows}
                    cols={cols}
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    className={`
                        textarea-field w-full border rounded-lg transition-all duration-200 focus:outline-none
                        ${getPaddingClasses()}
                        ${sizeClasses[size].split(' ').find(c => c.startsWith('text-'))}
                        ${variantClasses[currentVariant]}
                        ${resizeClasses[resize]}
                        ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white'}
                        ${readOnly ? 'bg-gray-50 cursor-default' : ''}
                        ${autoGrow ? 'overflow-hidden' : ''}
                        ${className}
                    `}
                    style={{
                        minHeight: autoGrow ? `${minRows * 1.5}rem` : undefined,
                        maxHeight: autoGrow ? `${maxRows * 1.5}rem` : undefined,
                        lineHeight: '1.5'
                    }}
                    aria-invalid={!!error}
                    aria-describedby={
                        error ? `${id}-error` :
                            helperText ? `${id}-helper` : undefined
                    }
                    {...props}
                />

                {/* Renderizar iconos */}
                {renderIcon(iconLeft, 'left', onIconLeftClick)}
                {renderIcon(iconRight, 'right', onIconRightClick)}
            </div>

            {/* Mensajes y contador */}
            <div className="flex justify-between items-start mt-1">
                <div className="flex-1">
                    {renderMessage()}
                </div>
                <div className="flex-shrink-0 ml-2">
                    {renderCharacterCount()}
                </div>
            </div>
        </div>
    );
};

TextArea.propTypes = {
    // Contenido
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,

    // Variante y tamaño
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
    iconLeft: PropTypes.string,
    iconRight: PropTypes.string,
    onIconLeftClick: PropTypes.func,
    onIconRightClick: PropTypes.func,

    // ✅ ESPECÍFICOS DE TEXTAREA
    rows: PropTypes.number,
    cols: PropTypes.number,
    resize: PropTypes.oneOf(['none', 'horizontal', 'vertical', 'both']),
    autoGrow: PropTypes.bool,
    maxRows: PropTypes.number,
    minRows: PropTypes.number,

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

export default TextArea;
