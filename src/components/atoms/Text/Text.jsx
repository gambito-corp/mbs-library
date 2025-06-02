import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getTextBEMClasses } from './Text.utils.js';
import { TEXT_VARIANTS, TEXT_SIZES, TEXT_COLORS, TEXT_GRADIENTS, TEXT_NEON_COLORS } from './Text.constants.js';
import './Text.css';

const Text = ({
                  children,
                  variant = 'default',
                  size = 'medium',
                  as = 'span',
                  color,
                  gradientFrom,
                  gradientTo,
                  gradientType = 'blue-purple',
                  neonColor = 'cyan',
                  typewriterSpeed = 80,
                  typewriterLoop = false,
                  typewriterPause = 300,
                  htmlContent = false,
                  className = '',
                  ...props
              }) => {
    const Component = as;
    const bemClasses = getTextBEMClasses({ variant, size, color, className });

    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const intervalRef = useRef(null);
    const loopTimeoutRef = useRef(null);
    const mountedRef = useRef(true);

    // Contenido a mostrar
    const content = children || '';
    const textToType = String(content);

    useEffect(() => {
        mountedRef.current = true;

        if (variant !== 'typewriter') {
            clearAllTimers();
            setDisplayedText(textToType);
            return;
        }

        startTypewriter();

        return () => {
            mountedRef.current = false;
            clearAllTimers();
        };
    }, [variant, textToType, typewriterSpeed, typewriterLoop, typewriterPause, htmlContent]);
    useEffect(() => {
        return () => {
            mountedRef.current = false;
            clearAllTimers();
        };
    }, []);

    const getCustomGradientStyle = () => {
        if (variant === 'gradient' || variant === 'gradient-animated') {
            let fromColor, toColor;

            if (gradientFrom && gradientTo) {
                fromColor = gradientFrom;
                toColor = gradientTo;
            } else if (TEXT_GRADIENTS[gradientType]) {
                fromColor = TEXT_GRADIENTS[gradientType].from;
                toColor = TEXT_GRADIENTS[gradientType].to;
            } else {
                fromColor = '#3b82f6';
                toColor = '#8b5cf6';
            }

            return {
                background: `linear-gradient(135deg, ${fromColor}, ${toColor})`,
                backgroundSize: variant === 'gradient-animated' ? '300% 300%' : '100% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 600,
                display: 'inline-block'
            };
        }
        return {};
    };
    const getCustomNeonStyle = () => {
        if (variant === 'neon') {
            const neonColorValue = TEXT_NEON_COLORS[neonColor]?.color || '#00ffff';

            return {
                color: neonColorValue,
                textShadow: `
                    0 0 5px ${neonColorValue},
                    0 0 10px ${neonColorValue},
                    0 0 15px ${neonColorValue},
                    0 0 20px ${neonColorValue},
                    0 0 35px ${neonColorValue}
                `,
                fontWeight: 600,
                display: 'inline-block',
                animation: 'neonPulse 2s ease-in-out infinite alternate'
            };
        }
        return {};
    };
    const clearAllTimers = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (loopTimeoutRef.current) {
            clearTimeout(loopTimeoutRef.current);
            loopTimeoutRef.current = null;
        }
    };
    const startTypewriter = () => {
        clearAllTimers();

        setDisplayedText('');
        setIsTyping(true);

        let localIndex = 0;

        const typeNextCharacter = () => {
            if (!mountedRef.current) return;

            if (localIndex < textToType.length) {
                if (htmlContent) {
                    const partialHTML = buildPartialHTML(textToType, localIndex + 1);
                    setDisplayedText(partialHTML);
                } else {
                    setDisplayedText(textToType.substring(0, localIndex + 1));
                }

                localIndex++;
                intervalRef.current = setTimeout(typeNextCharacter, typewriterSpeed);
            } else {
                setIsTyping(false);

                if (typewriterLoop && mountedRef.current) {
                    loopTimeoutRef.current = setTimeout(() => {
                        if (mountedRef.current) {
                            startTypewriter();
                        }
                    }, typewriterPause);
                }
            }
        };

        typeNextCharacter();
    };
    const buildPartialHTML = (originalHTML, targetLength) => {
        if (!htmlContent) {
            return originalHTML.substring(0, targetLength);
        }

        // Si no hay contenido, devolver vacío
        if (!originalHTML || targetLength <= 0) {
            return '';
        }

        // Si el target es mayor o igual al contenido, devolver todo
        if (targetLength >= originalHTML.length) {
            return originalHTML;
        }

        try {
            // Crear un elemento temporal para procesar el HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = originalHTML;

            let currentLength = 0;
            const result = document.createElement('div');

            const processNode = (node, container) => {
                if (currentLength >= targetLength) return false;

                if (node.nodeType === Node.TEXT_NODE) {
                    const textContent = node.textContent || '';
                    const remainingLength = targetLength - currentLength;

                    if (textContent.length <= remainingLength) {
                        container.appendChild(document.createTextNode(textContent));
                        currentLength += textContent.length;
                    } else {
                        const partialText = textContent.substring(0, remainingLength);
                        container.appendChild(document.createTextNode(partialText));
                        currentLength += partialText.length;
                        return false;
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const clonedElement = document.createElement(node.tagName.toLowerCase());

                    // Copiar atributos
                    for (let i = 0; i < node.attributes.length; i++) {
                        const attr = node.attributes[i];
                        clonedElement.setAttribute(attr.name, attr.value);
                    }

                    container.appendChild(clonedElement);

                    // Procesar hijos
                    for (let child of node.childNodes) {
                        if (!processNode(child, clonedElement)) break;
                    }
                }

                return currentLength < targetLength;
            };

            // Procesar todos los nodos hijos
            for (let child of tempDiv.childNodes) {
                if (!processNode(child, result)) break;
            }

            return result.innerHTML;
        } catch (error) {
            console.error('Error procesando HTML:', error);
            // Fallback: devolver texto plano
            return originalHTML.substring(0, targetLength);
        }
    };

    const customStyle = {
        ...getCustomGradientStyle(),
        ...getCustomNeonStyle()
    };

    const renderContent = () => {
        if (variant === 'typewriter') {
            return (
                <>
                    {htmlContent ? (
                        <span dangerouslySetInnerHTML={{ __html: displayedText }} />
                    ) : (
                        displayedText
                    )}
                    {isTyping && (
                        <span className="typewriter-cursor">|</span>
                    )}
                </>
            );
        }

        // Para variantes normales
        if (htmlContent) {
            return <span dangerouslySetInnerHTML={{ __html: textToType }} />;
        }

        return textToType;
    };


    return (
        <Component
            className={bemClasses}
            style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
            data-testid="Text"
            {...props}
        >
            {renderContent()}
        </Component>
    );
};

Text.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
        'default', 'bold', 'bolder', 'tiny', 'light', 'cursiva',
        'subrayado', 'muted', 'gradient', 'gradient-animated', 'neon', 'typewriter'
    ]),
    size: PropTypes.oneOf(['xs', 'small', 'medium', 'large', 'xlarge', '2xl']),
    color: PropTypes.oneOf([
        'default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'white', 'black'
    ]),
    gradientFrom: PropTypes.string,
    gradientTo: PropTypes.string,
    gradientType: PropTypes.string,
    neonColor: PropTypes.oneOf(['cyan', 'pink', 'green', 'orange', 'purple', 'yellow', 'red', 'blue']),
    typewriterSpeed: PropTypes.number,
    typewriterLoop: PropTypes.bool,
    typewriterPause: PropTypes.number,
    htmlContent: PropTypes.bool,
    as: PropTypes.oneOf(['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'label']),
    className: PropTypes.string
};

export default Text;
