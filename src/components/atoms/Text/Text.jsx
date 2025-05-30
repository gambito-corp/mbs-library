import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TEXT_VARIANTS, TEXT_SIZES } from './Text.constants.js';
import { getTextClasses } from './Text.utils.js';
import './Text.css';

const Text = ({
                  children,
                  text,
                  animated = false,
                  animationType = 'typewriter',
                  speed = 50,
                  onComplete,
                  className = '',
                  cursorChar = '|',
                  showCursor = true,
                  autoStart = true,
                  loop = false,
                  pauseOnHover = false,
                  variant = 'default',
                  size = 'medium',
                  as = 'span',
                  htmlStyles = false,
                  ...props
              }) => {
    // Estados para animación (solo si animated=true)
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    // Determinar el contenido a mostrar
    const content = text || children || "";
    const safeContent = String(content);

    // Generar clases CSS usando utilidades
    const textClasses = getTextClasses({ variant, size, className, animated });

    // ✅ FUNCIÓN MEMOIZADA CON useCallback
    const buildPartialHTML = useCallback((originalHTML, targetLength) => {
        if (!htmlStyles) return originalHTML.substring(0, targetLength);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHTML;

        let currentLength = 0;
        const result = document.createElement('div');

        const processNode = (node, container) => {
            if (currentLength >= targetLength) return false;

            if (node.nodeType === Node.TEXT_NODE) {
                const textContent = node.textContent;
                const remainingLength = targetLength - currentLength;

                if (textContent.length <= remainingLength) {
                    container.appendChild(node.cloneNode(true));
                    currentLength += textContent.length;
                } else {
                    const partialText = textContent.substring(0, remainingLength);
                    const textNode = document.createTextNode(partialText);
                    container.appendChild(textNode);
                    currentLength += partialText.length;
                    return false;
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const clonedElement = node.cloneNode(false);
                container.appendChild(clonedElement);

                for (let child of node.childNodes) {
                    if (!processNode(child, clonedElement)) break;
                }
            }

            return true;
        };

        for (let child of tempDiv.childNodes) {
            if (!processNode(child, result)) break;
        }

        return result.innerHTML;
    }, [htmlStyles]);

    // ✅ LÓGICA DE ANIMACIÓN CON DEPENDENCIA CORREGIDA
    useEffect(() => {
        if (!animated) return;

        if (!isPaused && currentIndex < safeContent.length) {
            timeoutRef.current = setTimeout(() => {
                if (htmlStyles) {
                    const partialHTML = buildPartialHTML(safeContent, currentIndex + 1);
                    setDisplayedText(partialHTML);
                } else {
                    setDisplayedText(prev => prev + safeContent[currentIndex]);
                }
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeoutRef.current);
        } else if (currentIndex >= safeContent.length && onComplete) {
            onComplete();

            if (loop) {
                setTimeout(() => {
                    setDisplayedText('');
                    setCurrentIndex(0);
                }, 1000);
            }
        }
    }, [animated, currentIndex, safeContent, speed, isPaused, onComplete, loop, htmlStyles, buildPartialHTML]);

    // Reset cuando cambia el contenido
    useEffect(() => {
        if (animated) {
            setDisplayedText('');
            setCurrentIndex(0);
        }
    }, [safeContent, animated]);

    // Handlers para interacción
    const handleMouseEnter = () => {
        if (pauseOnHover && animated) setIsPaused(true);
    };

    const handleMouseLeave = () => {
        if (pauseOnHover && animated) setIsPaused(false);
    };

    // Crear el elemento dinámicamente
    const Component = as;

    // ✅ RENDERIZADO CONDICIONAL
    const renderContent = () => {
        if (!animated) {
            // Texto estático normal
            if (htmlStyles) {
                return <span dangerouslySetInnerHTML={{ __html: safeContent }} />;
            }
            return safeContent;
        } else {
            // Texto animado
            return (
                <>
                    {htmlStyles ? (
                        <span dangerouslySetInnerHTML={{ __html: displayedText }} />
                    ) : (
                        displayedText
                    )}
                    {showCursor && (
                        <span className="text-cursor animate-pulse text-current ml-1">
                            {cursorChar}
                        </span>
                    )}
                </>
            );
        }
    };

    return (
        <Component
            className={textClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            data-testid="Text"
            data-animated={animated}
            {...props}
        >
            {renderContent()}
        </Component>
    );
};

Text.propTypes = {
    children: PropTypes.node,
    text: PropTypes.string,
    animated: PropTypes.bool, // ✅ NUEVA PROP
    animationType: PropTypes.oneOf(['typewriter', 'fade', 'slide']),
    speed: PropTypes.number,
    onComplete: PropTypes.func,
    className: PropTypes.string,
    cursorChar: PropTypes.string,
    showCursor: PropTypes.bool,
    autoStart: PropTypes.bool,
    loop: PropTypes.bool,
    pauseOnHover: PropTypes.bool,
    variant: PropTypes.oneOf(Object.keys(TEXT_VARIANTS)),
    size: PropTypes.oneOf(Object.keys(TEXT_SIZES)),
    textColor: PropTypes.string,
    as: PropTypes.oneOf(['span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'label']),
    htmlStyles: PropTypes.bool
};

Text.defaultProps = {
    animated: false, // ✅ Por defecto NO animado
    animationType: 'typewriter',
    speed: 50,
    className: '',
    cursorChar: '|',
    showCursor: true,
    autoStart: true,
    loop: false,
    pauseOnHover: false,
    variant: 'default',
    size: 'medium',
    textColor: 'black',
    as: 'span',
    htmlStyles: false
};

export default Text;
