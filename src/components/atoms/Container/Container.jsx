import React from 'react';
import PropTypes from 'prop-types';
import { CONTAINER_VARIANTS, CONTAINER_SIZES } from './Container.constants.js';
import { getContainerClasses } from './Container.utils.js';
import './Container.css';

const Container = ({
                       children,
                       variant = 'default',
                       size = 'medium',
                       maxWidth = 'full',
                       padding = 'medium',
                       margin = 'none',
                       centered = false,
                       fluid = false,
                       shadow = 'none',
                       border = 'none',
                       rounded = 'none',
                       background = 'transparent',
                       className = '',
                       as = 'div',
                       ...props
                   }) => {
    // Generar clases CSS usando utilidades
    const containerClasses = getContainerClasses({
        variant,
        size,
        maxWidth,
        padding,
        margin,
        centered,
        fluid,
        shadow,
        border,
        rounded,
        background,
        className
    });

    // Crear el elemento dinámicamente
    const Component = as;

    return (
        <Component
            className={containerClasses}
            data-testid="Container"
            {...props}
        >
            {children}
        </Component>
    );
};

Container.propTypes = {
    children: PropTypes.node,
    variant: PropTypes.oneOf(Object.keys(CONTAINER_VARIANTS)),
    size: PropTypes.oneOf(Object.keys(CONTAINER_SIZES)),
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full', 'none']),
    padding: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'xlarge']),
    margin: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'xlarge', 'auto']),
    centered: PropTypes.bool,
    fluid: PropTypes.bool,
    shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl']),
    border: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'dashed', 'dotted']),
    rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']),
    background: PropTypes.oneOf(['transparent', 'white', 'gray', 'primary', 'secondary', 'accent']),
    className: PropTypes.string,
    as: PropTypes.oneOf(['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav'])
};

Container.defaultProps = {
    variant: 'default',
    size: 'medium',
    maxWidth: 'full',
    padding: 'medium',
    margin: 'none',
    centered: false,
    fluid: false,
    shadow: 'none',
    border: 'none',
    rounded: 'none',
    background: 'transparent',
    className: '',
    as: 'div'
};

export default Container;
