import React from 'react';
import PropTypes from 'prop-types';
import { TEMPLATENAME_TYPES, TEMPLATENAME_VARIANTS, TEMPLATENAME_SIZES } from './TemplateName.constants.js';
import { getTemplateNameClasses } from './TemplateName.utils.js';
import './TemplateName.css';

const TemplateName = ({
                          type = 'default',
                          variant = 'default',
                          size = 'medium',
                          className = '',
                          children,
                          ...props
                      }) => {
    // Generar clases CSS usando utilidades
    const templateNameClasses = getTemplateNameClasses({ type, variant, size, className });

    return (
        <div
            className={templateNameClasses}
            data-testid="TemplateName"
            {...props}
        >
            {children || 'TemplateName Component'}
        </div>
    );
};

TemplateName.propTypes = {
    type: PropTypes.oneOf(Object.keys(TEMPLATENAME_TYPES)),
    variant: PropTypes.oneOf(Object.keys(TEMPLATENAME_VARIANTS)),
    size: PropTypes.oneOf(Object.keys(TEMPLATENAME_SIZES)),
    className: PropTypes.string,
    children: PropTypes.node
};

TemplateName.defaultProps = {
    type: 'default',
    variant: 'default',
    size: 'medium',
    className: ''
};

export default TemplateName;
