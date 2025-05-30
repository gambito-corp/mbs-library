import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ALERT_TYPES, ALERT_VARIANTS, ALERT_SIZES } from './Alert.constants.js';
import { getAlertClasses, getAlertIcon } from './Alert.utils.js';
import './Alert.css';

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
    // Validación temprana
    if (!message && !children) return null;

    // Generar clases CSS usando utilidades
    const alertClasses = getAlertClasses({ type, variant, size, className });
    const iconName = getAlertIcon(type);

    return (
        <div
            className={alertClasses}
            role="alert"
            data-testid="Alert"
            aria-live="polite"
            {...props}
        >
            {icon && (
                <span className="flex-shrink-0 mt-0.5" aria-hidden="true">
                    <FontAwesomeIcon
                        icon={iconName}
                        className="w-4 h-4"
                    />
                </span>
            )}

            <div className="flex-1">
                {title && (
                    <div className="font-bold mb-1" role="heading" aria-level="3">
                        {title}
                    </div>
                )}
                <div className="alert-message">
                    {message || children}
                </div>
            </div>

            {dismissible && (
                <button
                    onClick={onDismiss}
                    className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-1"
                    aria-label="Cerrar alerta"
                    type="button"
                >
                    <FontAwesomeIcon icon="times" className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

Alert.propTypes = {
    type: PropTypes.oneOf(Object.keys(ALERT_TYPES)),
    variant: PropTypes.oneOf(Object.keys(ALERT_VARIANTS)),
    size: PropTypes.oneOf(Object.keys(ALERT_SIZES)),
    message: PropTypes.string,
    title: PropTypes.string,
    dismissible: PropTypes.bool,
    onDismiss: PropTypes.func,
    icon: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
};

Alert.defaultProps = {
    type: 'info',
    variant: 'filled',
    size: 'medium',
    dismissible: false,
    icon: true,
    className: ''
};

export default Alert;
