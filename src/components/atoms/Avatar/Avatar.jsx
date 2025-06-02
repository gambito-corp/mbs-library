import React from 'react';
import PropTypes from 'prop-types';
import { TEMPLATENAME_TYPES, TEMPLATENAME_VARIANTS, TEMPLATENAME_SIZES } from './Avatar.constants.js';
import { getAvatarClasses } from './Avatar.utils.js';
import './Avatar.css';

const Avatar = ({
                          type = 'default',
                          variant = 'default',
                          size = 'medium',
                          className = '',
                          children,
                          ...props
                      }) => {
    // Generar clases CSS usando utilidades
    const avatarClasses = getAvatarClasses({ type, variant, size, className });

    return (
        <div
            className={avatarClasses}
            data-testid="Avatar"
            {...props}
        >
            {children || 'Avatar Component'}
        </div>
    );
};

Avatar.propTypes = {
    type: PropTypes.oneOf(Object.keys(TEMPLATENAME_TYPES)),
    variant: PropTypes.oneOf(Object.keys(TEMPLATENAME_VARIANTS)),
    size: PropTypes.oneOf(Object.keys(TEMPLATENAME_SIZES)),
    className: PropTypes.string,
    children: PropTypes.node
};

Avatar.defaultProps = {
    type: 'default',
    variant: 'default',
    size: 'medium',
    className: ''
};

export default Avatar;
