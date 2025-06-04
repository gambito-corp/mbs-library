import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
                   // Imagen básica
                   src,
                   alt = '',

                   // Dimensiones
                   w,
                   h,
                   wType = 'px',
                   hType = 'px',

                   // Border radius
                   borderRadius,
                   borderRadiusType = 'px',

                   // Border
                   borderWidth,
                   borderWidthType = 'px',
                   borderStyle = 'solid',
                   borderColor = '#000000',

                   // Shadow
                   shadowOffsetX = 0,
                   shadowOffsetY = 0,
                   shadowBlur = 0,
                   shadowSpread = 0,
                   shadowColor = '#000000',
                   shadowOpacity = 0.3,
                   shadowInset = false,

                   // Object fit
                   objectFit = 'cover',

                   // Lazy loading y performance
                   lazy = true,
                   loading = 'lazy',
                   placeholder = 'blur',
                   quality = 75,

                   // Filtros CSS
                   filter,
                   grayscale = false,
                   sepia = false,
                   brightness = 1,
                   contrast = 1,
                   saturate = 1,

                   // Efectos y transiciones
                   fadeIn = true,
                   fadeInDuration = 300,
                   hoverEffect = 'none',
                   transition = 'all 0.3s ease',

                   // Fallback
                   fallbackSrc,
                   retryAttempts = 3,

                   // Interactividad
                   draggable = false,
                   selectable = false,
                   zoomable = false,

                   // Eventos
                   onClick,
                   onLoad,
                   onError,
                   onLoadStart,
                   onLoadComplete,

                   // Estilos
                   className = '',

                   ...props
               }) => {
    // ✅ Función helper para construir filtros CSS
    const buildFilterString = () => {
        const filters = [];

        if (filter) filters.push(filter);
        if (grayscale) filters.push('grayscale(100%)');
        if (sepia) filters.push('sepia(100%)');
        if (brightness !== 1) filters.push(`brightness(${brightness})`);
        if (contrast !== 1) filters.push(`contrast(${contrast})`);
        if (saturate !== 1) filters.push(`saturate(${saturate})`);

        return filters.length > 0 ? filters.join(' ') : undefined;
    };

    // ✅ Función helper para convertir hex a rgba
    const hexToRgba = (hex, opacity) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    // ✅ Construir estilos PRIMERO
    const imageStyles = {
        width: w ? `${w}${wType}` : undefined,
        height: h ? `${h}${hType}` : undefined,
        borderRadius: borderRadius ? `${borderRadius}${borderRadiusType}` : undefined,
        objectFit: objectFit,
        display: 'block',
        userSelect: selectable ? 'auto' : 'none',
        filter: buildFilterString()
    };

    // ✅ CORREGIDO: Solo agregar transition específica para hover effects
    if (hoverEffect !== 'none') {
        if (hoverEffect === 'zoom' || hoverEffect === 'scale') {
            imageStyles.transition = 'transform 0.3s ease';
        } else if (hoverEffect === 'brightness' || hoverEffect === 'blur') {
            imageStyles.transition = 'filter 0.3s ease';
        } else {
            imageStyles.transition = transition;
        }
    } else {
        imageStyles.transition = transition;
    }

    // Agregar border si se especifica
    if (borderWidth) {
        imageStyles.border = `${borderWidth}${borderWidthType} ${borderStyle} ${borderColor}`;
    }

    // Agregar box-shadow si se especifica
    if (shadowOffsetX || shadowOffsetY || shadowBlur || shadowSpread) {
        const shadowRgba = hexToRgba(shadowColor, shadowOpacity);
        const insetKeyword = shadowInset ? 'inset ' : '';
        imageStyles.boxShadow = `${insetKeyword}${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowSpread}px ${shadowRgba}`;
    }

    // ✅ CORREGIDO: Construir clases CSS con hover effect
    const imageClasses = [
        'image',
        hoverEffect !== 'none' ? `image--hover-${hoverEffect}` : '',
        zoomable ? 'image--zoomable' : '',
        fadeIn ? 'image--fade-in' : '',
        className
    ].filter(Boolean).join(' ');

    // ✅ SOLUCIÓN FINAL: Devolver JSX directamente
    return (
        <img
            src={src}
            alt={alt}
            style={imageStyles}
            className={imageClasses}
            loading={lazy ? loading : 'eager'}
            draggable={draggable}
            onClick={onClick}
            onLoad={onLoad}
            onError={onError}
            onLoadStart={onLoadStart}
            data-testid="Image"
            {...props}
        />
    );
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    w: PropTypes.number,
    h: PropTypes.number,
    wType: PropTypes.oneOf(['px', 'em', 'rem', '%', 'vw', 'vh', 'cm', 'mm', 'in', 'pt', 'pc']),
    hType: PropTypes.oneOf(['px', 'em', 'rem', '%', 'vw', 'vh', 'cm', 'mm', 'in', 'pt', 'pc']),
    borderRadius: PropTypes.number,
    borderRadiusType: PropTypes.oneOf(['px', 'em', 'rem', '%']),
    borderWidth: PropTypes.number,
    borderWidthType: PropTypes.oneOf(['px', 'em', 'rem']),
    borderStyle: PropTypes.oneOf(['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset']),
    borderColor: PropTypes.string,
    shadowOffsetX: PropTypes.number,
    shadowOffsetY: PropTypes.number,
    shadowBlur: PropTypes.number,
    shadowSpread: PropTypes.number,
    shadowColor: PropTypes.string,
    shadowOpacity: PropTypes.number,
    shadowInset: PropTypes.bool,
    objectFit: PropTypes.oneOf(['fill', 'contain', 'cover', 'none', 'scale-down']),
    lazy: PropTypes.bool,
    loading: PropTypes.oneOf(['lazy', 'eager']),
    placeholder: PropTypes.oneOf(['blur', 'empty', 'skeleton']),
    quality: PropTypes.number,
    filter: PropTypes.string,
    grayscale: PropTypes.bool,
    sepia: PropTypes.bool,
    brightness: PropTypes.number,
    contrast: PropTypes.number,
    saturate: PropTypes.number,
    fadeIn: PropTypes.bool,
    fadeInDuration: PropTypes.number,
    hoverEffect: PropTypes.oneOf(['none', 'zoom', 'brightness', 'scale', 'blur']),
    transition: PropTypes.string,
    fallbackSrc: PropTypes.string,
    retryAttempts: PropTypes.number,
    draggable: PropTypes.bool,
    selectable: PropTypes.bool,
    zoomable: PropTypes.bool,
    onClick: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    onLoadStart: PropTypes.func,
    onLoadComplete: PropTypes.func,
    className: PropTypes.string
};

export default Image;
