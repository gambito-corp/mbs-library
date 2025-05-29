import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = ({
                   type = 'info',
                   message,
                   title,
                   dismissible = false,
                   onDismiss,
                   icon = true,
                   size = 'medium',
                   variant = 'filled',
                   className = '',
                   children,
                   ...props
               }) => {
    // Configuración de tipos con iconos de Font Awesome
    const typeConfig = {
        error: {
            filled: 'bg-red-100 border border-red-400 text-red-700',
            outlined: 'border-2 border-red-400 text-red-700 bg-transparent',
            solid: 'bg-red-500 text-white border border-red-500',
            icon: 'exclamation-triangle'
        },
        success: {
            filled: 'bg-green-100 border border-green-400 text-green-700',
            outlined: 'border-2 border-green-400 text-green-700 bg-transparent',
            solid: 'bg-green-500 text-white border border-green-500',
            icon: 'check'
        },
        warning: {
            filled: 'bg-yellow-100 border border-yellow-400 text-yellow-700',
            outlined: 'border-2 border-yellow-400 text-yellow-700 bg-transparent',
            solid: 'bg-yellow-500 text-white border border-yellow-500',
            icon: 'exclamation-triangle'
        },
        info: {
            filled: 'bg-blue-100 border border-blue-400 text-blue-700',
            outlined: 'border-2 border-blue-400 text-blue-700 bg-transparent',
            solid: 'bg-blue-500 text-white border border-blue-500',
            icon: 'info-circle'
        }
    };

    // Configuración de tamaños
    const sizeConfig = {
        small: 'px-3 py-2 text-sm',
        medium: 'px-4 py-3 text-base',
        large: 'px-6 py-4 text-lg'
    };

    if (!message && !children) return null;

    const baseClasses = 'rounded-lg font-semibold flex items-start gap-3 relative transition-all duration-200';
    const typeClasses = typeConfig[type]?.[variant] || typeConfig.info.filled;
    const sizeClasses = sizeConfig[size];

    return (
        <div
            className={`${baseClasses} ${typeClasses} ${sizeClasses} ${className}`}
            role="alert"
            {...props}
        >
            {icon && (
                <span className="flex-shrink-0 mt-0.5">
          <FontAwesomeIcon
              icon={typeConfig[type].icon}
              className="w-4 h-4"
          />
        </span>
            )}

            <div className="flex-1">
                {title && (
                    <div className="font-bold mb-1">
                        {title}
                    </div>
                )}
                <div>
                    {message || children}
                </div>
            </div>

            {dismissible && (
                <button
                    onClick={onDismiss}
                    className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity p-1 rounded"
                    aria-label="Cerrar alerta"
                >
                    <FontAwesomeIcon icon="times" className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

Alert.propTypes = {
    type: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
    message: PropTypes.string,
    title: PropTypes.string,
    dismissible: PropTypes.bool,
    onDismiss: PropTypes.func,
    icon: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    variant: PropTypes.oneOf(['filled', 'outlined', 'solid']),
    className: PropTypes.string,
    children: PropTypes.node
};

export default Alert;
