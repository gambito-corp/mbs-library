import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICON_SIZES, ICON_VARIANTS } from './Icon.constants.js';
import { getIconClasses, isValidIconType, renderCustomIcon } from './Icon.utils.js';
import './Icon.css';

const Icon = ({
                  // FontAwesome props
                  name,
                  icon,
                  type = 'fas', // fas, far, fab, etc.

                  // Custom SVG props
                  svg,
                  svgData, // Para SVG en base64 como el de tu diseñador

                  // Image props
                  src,
                  alt = '',

                  // Emoji/Unicode props
                  emoji,
                  unicode,

                  // Styling props
                  size = 'medium',
                  variant = 'default',
                  color,
                  textColor,
                  className = '',

                  // Interaction props
                  onClick,
                  onMouseEnter,
                  onMouseLeave,
                  disabled = false,
                  loading = false,

                  // Accessibility props
                  ariaLabel,
                  title,
                  role = 'img',

                  ...props
              }) => {
    // Generar clases CSS
    const iconClasses = getIconClasses({ size, variant, className, disabled, loading, textColor  });


    // Determinar qué tipo de icono renderizar
    const getIconType = () => {
        if (loading) return 'loading';
        if (emoji) return 'emoji';
        if (unicode) return 'unicode';
        if (svgData) return 'svgData';
        if (svg) return 'svg';
        if (src) return 'image';
        if (name || icon) return 'fontawesome';
        return 'default';
    };

    const iconType = getIconType();

    // Renderizar según el tipo
    const renderIcon = () => {
        switch (iconType) {
            case 'loading':
                return (
                    <div className="icon-loading animate-spin">
                        <FontAwesomeIcon icon="spinner" />
                    </div>
                );

            case 'emoji':
                return (
                    <span className="icon-emoji" role="img" aria-label={ariaLabel || alt}>
                        {emoji}
                    </span>
                );

            case 'unicode':
                return (
                    <span className="icon-unicode" role="img" aria-label={ariaLabel || alt}>
                        {String.fromCharCode(unicode)}
                    </span>
                );

            case 'svgData':
                return (
                    <img
                        className="icon-svg-data"
                        src={svgData}
                        alt={alt}
                        aria-label={ariaLabel}
                        title={title}
                    />
                );

            case 'svg':
                return renderCustomIcon(svg, { ariaLabel, title, alt });

            case 'image':
                return (
                    <img
                        className="icon-image"
                        src={src}
                        alt={alt}
                        aria-label={ariaLabel}
                        title={title}
                    />
                );

            case 'fontawesome':
                const faIcon = icon || [type, name];
                return (
                    <FontAwesomeIcon
                        icon={faIcon}
                        className="icon-fontawesome"
                        title={title}
                    />
                );

            default:
                return (
                    <span className="icon-default" role="img" aria-label="Icon">
                        ⚡
                    </span>
                );
        }
    };

    // Estilos dinámicos
    const dynamicStyles = {
        color: color,
        cursor: onClick && !disabled ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1,
        ...props.style
    };

    return (
        <span
            className={iconClasses}
            style={dynamicStyles}
            onClick={!disabled ? onClick : undefined}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-testid="Icon"
            data-icon-type={iconType}
            role={role}
            aria-label={ariaLabel}
            title={title}
            {...props}
        >
            {renderIcon()}
        </span>
    );
};

Icon.propTypes = {
    // FontAwesome
    name: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.oneOf(['fas', 'far', 'fab', 'fal', 'fad']),

    // Custom SVG
    svg: PropTypes.string,
    svgData: PropTypes.string,

    // Image
    src: PropTypes.string,
    alt: PropTypes.string,

    // Emoji/Unicode
    emoji: PropTypes.string,
    unicode: PropTypes.number,

    // Styling
    size: PropTypes.oneOf(Object.keys(ICON_SIZES)),
    variant: PropTypes.oneOf(Object.keys(ICON_VARIANTS)),
    color: PropTypes.string,
    textColor : PropTypes.string,
    className: PropTypes.string,

    // Interaction
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,

    // Accessibility
    ariaLabel: PropTypes.string,
    title: PropTypes.string,
    role: PropTypes.string
};

Icon.defaultProps = {
    type: 'fas',
    size: 'medium',
    variant: 'default',
    alt: '',
    disabled: false,
    loading: false,
    role: 'img'
};

export default Icon;
