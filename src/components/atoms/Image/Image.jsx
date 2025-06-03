import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon.jsx';
import Text from '../Text/Text.jsx';
import Badge from '../Badge/Badge.jsx';
import {
    getImageBEMClasses,
    getImageContainerBEMClasses,
    getStatusIndicatorBEMClasses,
    getFallbackBEMClasses,
    getInitials,
    isValidImageUrl,
    getStatusColor
} from './Image.utils.js';

const Image = ({
                   // Imagen
                   src,
                   alt = '',
                   srcSet,
                   sizes,

                   // Variantes y estados
                   variant = 'thumbnail',
                   size = 'medium',
                   shape = 'rounded',

                   // Avatar específico
                   status, // online, offline, away, busy
                   name, // Para generar iniciales
                   badge, // Badge component

                   // Fallback
                   fallback = 'placeholder',
                   fallbackIcon = 'user',

                   // Estados visuales
                   loading = false,
                   lazy = true,
                   hover = false,

                   // Eventos
                   onClick,
                   onLoad,
                   onError,

                   // Estilos
                   className = '',

                   ...props
               }) => {
    const [imageState, setImageState] = useState({
        loaded: false,
        error: false,
        loading: lazy
    });

    const [imageSrc, setImageSrc] = useState(lazy ? null : src);

    // Lazy loading effect
    useEffect(() => {
        if (!lazy || !src) return;

        const img = new window.Image();
        img.onload = () => {
            setImageSrc(src);
            setImageState(prev => ({ ...prev, loading: false, loaded: true }));
            onLoad?.();
        };
        img.onerror = () => {
            setImageState(prev => ({ ...prev, loading: false, error: true }));
            onError?.();
        };
        img.src = src;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, lazy, onLoad, onError]);

    // Handle image load for non-lazy images
    const handleImageLoad = () => {
        setImageState(prev => ({ ...prev, loaded: true, loading: false }));
        onLoad?.();
    };

    const handleImageError = () => {
        setImageState(prev => ({ ...prev, error: true, loading: false }));
        onError?.();
    };

    // Determinar si mostrar la imagen o fallback
    const shouldShowImage = () => {
        if (lazy) {
            return imageSrc && imageState.loaded && !imageState.error;
        }
        return src && !imageState.error;
    };

    // Renderizar fallback
    const renderFallback = () => {
        const fallbackClasses = getFallbackBEMClasses(fallback);

        switch (fallback) {
            case 'initials':
                return (
                    <div className={fallbackClasses}>
                        <Text size={size === 'xs' ? 'xs' : size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'xl' ? 'xl' : 'base'}>
                            {getInitials(name || alt)}
                        </Text>
                    </div>
                );

            case 'icon':
                const iconSize = size === 'xs' ? 'xs' : size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium';
                return (
                    <div className={fallbackClasses}>
                        <Icon
                            name={fallbackIcon}
                            size={iconSize}
                            className="text-gray-400"
                        />
                    </div>
                );

            case 'skeleton':
                return <div className={fallbackClasses}></div>;

            case 'placeholder':
            default:
                return (
                    <div className={fallbackClasses}>
                        <Icon
                            name="image"
                            size={size === 'xs' ? 'xs' : size === 'small' ? 'small' : 'medium'}
                            className="text-gray-400"
                        />
                    </div>
                );
        }
    };

    // Renderizar status indicator (solo para avatars)
    const renderStatusIndicator = () => {
        if (variant !== 'avatar' || !status) return null;

        const statusClasses = getStatusIndicatorBEMClasses(status, size);
        const statusColor = getStatusColor(status);

        return (
            <div
                className={statusClasses}
                style={{ backgroundColor: statusColor }}
                aria-label={`Estado: ${status}`}
            />
        );
    };

    // Renderizar badge
    const renderBadge = () => {
        if (!badge) return null;

        return (
            <div className="image__badge">
                {badge}
            </div>
        );
    };

    // Clases CSS
    const containerClasses = getImageContainerBEMClasses(!!badge || !!status);
    const imageClasses = getImageBEMClasses({
        variant,
        size,
        shape: variant === 'avatar' ? 'circle' : shape,
        loading: imageState.loading || loading,
        error: imageState.error,
        hover,
        className
    });

    // Props de la imagen
    const imageProps = {
        className: imageClasses,
        alt,
        onClick,
        'data-testid': 'Image',
        'data-variant': variant,
        'data-size': size,
        'data-shape': variant === 'avatar' ? 'circle' : shape,
        'data-loading': imageState.loading || loading,
        'data-error': imageState.error,
        ...props
    };

    if (!lazy) {
        imageProps.onLoad = handleImageLoad;
        imageProps.onError = handleImageError;
    }

    if (srcSet) imageProps.srcSet = srcSet;
    if (sizes) imageProps.sizes = sizes;

    return (
        <div className={containerClasses}>
            {shouldShowImage() ? (
                <img
                    src={imageSrc || src}
                    {...imageProps}
                />
            ) : (
                <div {...imageProps}>
                    {renderFallback()}
                </div>
            )}

            {renderStatusIndicator()}
            {renderBadge()}
        </div>
    );
};

Image.propTypes = {
    // Imagen
    src: PropTypes.string,
    alt: PropTypes.string,
    srcSet: PropTypes.string,
    sizes: PropTypes.string,

    // Variantes y estados
    variant: PropTypes.oneOf(['avatar', 'thumbnail', 'hero', 'gallery', 'product']),
    size: PropTypes.oneOf(['xs', 'small', 'medium', 'large', 'xl']),
    shape: PropTypes.oneOf(['circle', 'rounded', 'square']),

    // Avatar específico
    status: PropTypes.oneOf(['online', 'offline', 'away', 'busy']),
    name: PropTypes.string,
    badge: PropTypes.node,

    // Fallback
    fallback: PropTypes.oneOf(['initials', 'icon', 'placeholder', 'skeleton']),
    fallbackIcon: PropTypes.string,

    // Estados visuales
    loading: PropTypes.bool,
    lazy: PropTypes.bool,
    hover: PropTypes.bool,

    // Eventos
    onClick: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,

    // Estilos
    className: PropTypes.string
};

export default Image;
