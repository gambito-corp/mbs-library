import React, { useState, useEffect, useRef } from 'react';

const AnimatedText = ({
                          text,
                          speed = 50,
                          onComplete,
                          className = '',
                          cursorChar = '|',
                          showCursor = true,
                          autoStart = true,
                          loop = false,
                          pauseOnHover = false
                      }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(autoStart);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (isAnimating && !isPaused && currentIndex < text.length) {
            timeoutRef.current = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeoutRef.current);
        } else if (currentIndex >= text.length) {
            setIsAnimating(false);
            if (onComplete) {
                onComplete();
            }
            if (loop) {
                setTimeout(() => {
                    reset();
                    setIsAnimating(true);
                }, 1000);
            }
        }
    }, [currentIndex, text, speed, onComplete, isAnimating, isPaused, loop]);

    useEffect(() => {
        reset();
        if (autoStart) {
            setIsAnimating(true);
        }
    }, [text, autoStart]);

    const reset = () => {
        setDisplayedText('');
        setCurrentIndex(0);
        setIsAnimating(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const start = () => setIsAnimating(true);
    const pause = () => setIsPaused(true);
    const resume = () => setIsPaused(false);

    const handleMouseEnter = () => {
        if (pauseOnHover) setIsPaused(true);
    };

    const handleMouseLeave = () => {
        if (pauseOnHover) setIsPaused(false);
    };

    return (
        <span
            className={`inline-block ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {displayedText}
            {showCursor && currentIndex < text.length && (
                <span className="animate-pulse text-current">
                    {cursorChar}
                </span>
            )}
        </span>
    );
};

const animatedTextDocs = {
    props: {
        text: {
            type: 'string',
            required: true,
            description: 'El texto que se va a animar'
        },
        speed: {
            type: 'number',
            default: 50,
            description: 'Velocidad de la animación en milisegundos entre caracteres'
        },
        onComplete: {
            type: 'function',
            required: false,
            description: 'Función que se ejecuta cuando termina la animación'
        },
        className: {
            type: 'string',
            default: '',
            description: 'Clases CSS adicionales para el componente'
        },
        cursorChar: {
            type: 'string',
            default: '|',
            description: 'Carácter usado como cursor'
        },
        showCursor: {
            type: 'boolean',
            default: true,
            description: 'Mostrar o ocultar el cursor animado'
        },
        autoStart: {
            type: 'boolean',
            default: true,
            description: 'Iniciar la animación automáticamente'
        },
        loop: {
            type: 'boolean',
            default: false,
            description: 'Repetir la animación continuamente'
        },
        pauseOnHover: {
            type: 'boolean',
            default: false,
            description: 'Pausar la animación al pasar el mouse'
        }
    }
};

export default AnimatedText;
