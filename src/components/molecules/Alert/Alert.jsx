import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';
import Icon from '../../atoms/Icon/Icon.jsx';
import Text from '../../atoms/Text/Text.jsx';
import Container from "../../atoms/Container/Container";

const Alert = ({
                   type,
                   icon,
                   title,
                   message,
                   linkText,
                   linkUrl,
                   linkTarget = '_blank',
                   padding = 'medium',
                   shadow = 'md',
               }) => {
    const getIconForType = (alertType) => {
        const iconMap = {
            info: 'info-circle',
            success: 'check-circle',
            warning: 'exclamation-triangle',
            error: 'times-circle'
        };
        return iconMap[alertType] || 'info-circle';
    };

    const iconName = icon || getIconForType(type);

    // ✅ SOLUCIÓN: Usar array de elementos JSX en lugar de concatenación
    const renderMessage = () => {
        if (linkText && linkUrl && typeof linkText === 'string' && typeof linkUrl === 'string') {
            return (
                <Text>
                    {message}{' '}
                    <a
                        href={linkUrl}
                        target={linkTarget}
                        rel="noopener noreferrer"
                        style={{
                            color: 'inherit',
                            textDecoration: 'underline',
                            fontWeight: '600'
                        }}
                    >
                        {linkText}
                    </a>
                </Text>
            );
        }

        return message ? <Text>{message}</Text> : null;
    };

    return (
        <>
            <br/><br/><br/><br/>
            <Container
                className={type ? `alert--${type}` : ''}
                variant="card"
                padding={padding}
                shadow={shadow}
                fitContent={true}
                centered={true}
            >
                <Icon name={iconName} variant={type} size="large" />
                &nbsp;
                {title && typeof title === 'string' && <Text variant="bold">{title}</Text>}
                {renderMessage()}
            </Container>
        </>
    );
};

Alert.propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    icon: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    linkText: PropTypes.string,
    linkUrl: PropTypes.string,
    linkTarget: PropTypes.string,
    padding: PropTypes.string,
    shadow: PropTypes.string,
};

export default Alert;
