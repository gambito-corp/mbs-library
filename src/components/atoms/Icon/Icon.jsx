import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICON_SIZES, ICON_VARIANTS } from './Icon.constants.js';
import { getIconClasses, renderCustomIcon } from './Icon.utils.js';
import './Icon.css';

const Icon = ({
                  name,
                  icon,
                  type = 'fas',
                  svg,
                  svgData,
                  src,
                  alt = '',
                  emoji,
                  unicode,
                  size = 'medium',
                  variant = 'default',
                  color,
                  textColor,
                  className = '',
                  onClick,
                  onMouseEnter,
                  onMouseLeave,
                  disabled = false,
                  loading = false,
                  ariaLabel,
                  title,
                  role = 'img',
                  ...props
              }) => {
    const iconClasses = getIconClasses({ size, variant, className, disabled, loading, textColor });

    let iconType = 'default';
    if (loading) iconType = 'loading';
    else if (emoji) iconType = 'emoji';
    else if (unicode) iconType = 'unicode';
    else if (svgData) iconType = 'svgData';
    else if (svg) iconType = 'svg';
    else if (src) iconType = 'image';
    else if (name || icon) iconType = 'fontawesome';

    const renderIcon = () => {
        switch (iconType) {
            case 'loading':
                return (
                    <span className="icon-loading animate-spin">
                        <FontAwesomeIcon icon="spinner" />
                    </span>
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
                if (typeof svg === 'string') {
                    return (
                        <span
                            className="icon-svg-custom"
                            data-testid="custom-svg"
                            dangerouslySetInnerHTML={{ __html: svg }}
                            aria-label={ariaLabel}
                            title={title}
                        />
                    );
                }
                return svg;
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

    const dynamicStyles = {
        color,
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
    name: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    type: PropTypes.oneOf(['fas', 'far', 'fab', 'fal', 'fad']),
    svg: PropTypes.string,
    svgData: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    emoji: PropTypes.string,
    unicode: PropTypes.number,
    size: PropTypes.oneOf(Object.keys(ICON_SIZES)),
    variant: PropTypes.oneOf(Object.keys(ICON_VARIANTS)),
    color: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    ariaLabel: PropTypes.string,
    title: PropTypes.string,
    role: PropTypes.string
};

export default Icon;
