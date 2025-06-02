import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from './Text.jsx';
import {
    getTextClasses,
    isValidVariant,
    isValidSize,
    validateTextProps,
    combineClasses,
    truncateText,
    capitalizeWords,
    countWords
} from './Text.utils.js';

// ===== TESTS DEL COMPONENTE TEXT =====

describe('Text Component', () => {
    // Tests básicos del componente
    test('renders without crashing', () => {
        render(<Text>Hello World</Text>);
        expect(screen.getByTestId('Text')).toBeInTheDocument();
    });

    test('renders children content', () => {
        render(<Text>Hello World</Text>);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    test('applies default classes', () => {
        render(<Text>Test</Text>);
        const element = screen.getByTestId('Text');
        expect(element).toHaveClass('text-component', 'text-default', 'text-medium');
    });

    test('applies variant classes correctly', () => {
        const { rerender } = render(<Text variant="bold">Test</Text>);
        let element = screen.getByTestId('Text');
        expect(element).toHaveClass('text-bold');

        rerender(<Text variant="muted">Test</Text>);
        element = screen.getByTestId('Text');
        expect(element).toHaveClass('text-muted');
    });

    test('applies size classes correctly', () => {
        const { rerender } = render(<Text size="small">Test</Text>);
        let element = screen.getByTestId('Text');
        expect(element).toHaveClass('text-small');

        rerender(<Text size="large">Test</Text>);
        element = screen.getByTestId('Text');
        expect(element).toHaveClass('text-large');
    });

    test('renders as different HTML elements', () => {
        const { rerender } = render(<Text as="h1">Heading</Text>);
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

        rerender(<Text as="p">Paragraph</Text>);
        expect(screen.getByText('Paragraph').tagName).toBe('P');

        rerender(<Text as="span">Span</Text>);
        expect(screen.getByText('Span').tagName).toBe('SPAN');
    });

    test('applies custom className', () => {
        render(<Text className="custom-class">Test</Text>);
        const element = screen.getByTestId('Text');
        expect(element).toHaveClass('custom-class');
    });

    test('passes through additional props', () => {
        render(<Text id="test-id" data-custom="value">Test</Text>);
        const element = screen.getByTestId('Text');
        expect(element).toHaveAttribute('id', 'test-id');
        expect(element).toHaveAttribute('data-custom', 'value');
    });

    test('handles empty children gracefully', () => {
        render(<Text></Text>);
        const element = screen.getByTestId('Text');
        expect(element).toBeInTheDocument();
        expect(element).toBeEmptyDOMElement();
    });

    test('handles number children', () => {
        render(<Text>{42}</Text>);
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    test('combines all props correctly', () => {
        render(
            <Text
                variant="bold"
                size="large"
                as="h2"
                className="custom"
                id="test"
            >
                Complex Test
            </Text>
        );

        const element = screen.getByTestId('Text');
        expect(element.tagName).toBe('H2');
        expect(element).toHaveClass('text-component', 'text-bold', 'text-large', 'custom');
        expect(element).toHaveAttribute('id', 'test');
        expect(element).toHaveTextContent('Complex Test');
    });
});

// ===== TESTS DE LAS FUNCIONES UTILS =====

describe('Text Utils', () => {

    describe('getTextClasses', () => {
        test('returns default classes when no params provided', () => {
            const result = getTextClasses({});
            expect(result).toBe('text-component text-default text-medium');
        });

        test('combines variant and size classes correctly', () => {
            const result = getTextClasses({ variant: 'bold', size: 'large' });
            expect(result).toBe('text-component text-bold text-large');
        });

        test('includes custom className', () => {
            const result = getTextClasses({
                variant: 'muted',
                size: 'small',
                className: 'custom-class'
            });
            expect(result).toBe('text-component text-muted text-small custom-class');
        });

        test('filters out empty values', () => {
            const result = getTextClasses({
                variant: 'bold',
                size: 'medium',
                className: ''
            });
            expect(result).toBe('text-component text-bold text-medium');
        });

        test('handles undefined values gracefully', () => {
            const result = getTextClasses({
                variant: undefined,
                size: null,
                className: 'test'
            });
            expect(result).toBe('text-component text-default text-medium test');
        });
    });

    describe('isValidVariant', () => {
        test('returns true for valid variants', () => {
            expect(isValidVariant('default')).toBe(true);
            expect(isValidVariant('bold')).toBe(true);
            expect(isValidVariant('muted')).toBe(true);
        });

        test('returns false for invalid variants', () => {
            expect(isValidVariant('invalid')).toBe(false);
            expect(isValidVariant('nonexistent')).toBe(false);
        });

        test('returns false for non-string values', () => {
            expect(isValidVariant(null)).toBe(false);
            expect(isValidVariant(undefined)).toBe(false);
            expect(isValidVariant(123)).toBe(false);
            expect(isValidVariant({})).toBe(false);
        });
    });

    describe('isValidSize', () => {
        test('returns true for valid sizes', () => {
            expect(isValidSize('small')).toBe(true);
            expect(isValidSize('medium')).toBe(true);
            expect(isValidSize('large')).toBe(true);
        });

        test('returns false for invalid sizes', () => {
            expect(isValidSize('tiny')).toBe(false);
            expect(isValidSize('huge')).toBe(false);
        });

        test('returns false for non-string values', () => {
            expect(isValidSize(null)).toBe(false);
            expect(isValidSize(undefined)).toBe(false);
            expect(isValidSize(42)).toBe(false);
        });
    });

    describe('validateTextProps', () => {
        test('returns no errors for valid props', () => {
            const result = validateTextProps({
                variant: 'bold',
                size: 'large',
                children: 'Valid text',
                as: 'p'
            });

            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        test('returns warnings for invalid variant', () => {
            const result = validateTextProps({ variant: 'invalid' });
            expect(result.warnings).toContain('Variante "invalid" no es válida. Usando "default".');
        });

        test('returns warnings for invalid size', () => {
            const result = validateTextProps({ size: 'huge' });
            expect(result.warnings).toContain('Tamaño "huge" no es válido. Usando "medium".');
        });

        test('returns warnings for missing children', () => {
            const result = validateTextProps({});
            expect(result.warnings.some(w => w.includes('contenido'))).toBe(true);
        });
    });

    describe('combineClasses', () => {
        test('combines multiple classes', () => {
            const result = combineClasses('class1', 'class2', 'class3');
            expect(result).toBe('class1 class2 class3');
        });

        test('filters out falsy values', () => {
            const result = combineClasses('class1', null, 'class2', undefined, 'class3');
            expect(result).toBe('class1 class2 class3');
        });

        test('handles multiple spaces', () => {
            const result = combineClasses('class1   class2', 'class3');
            expect(result).toBe('class1 class2 class3');
        });
    });

    describe('truncateText', () => {
        test('truncates long text', () => {
            const longText = 'This is a very long text that should be truncated';
            const result = truncateText(longText, 20);
            expect(result).toBe('This is a very lo...');
            expect(result.length).toBeLessThanOrEqual(20);
        });

        test('returns original text if shorter than maxLength', () => {
            const shortText = 'Short text';
            const result = truncateText(shortText, 20);
            expect(result).toBe('Short text');
        });

        test('handles custom ellipsis', () => {
            const text = 'This is a long text';
            const result = truncateText(text, 10, '***');
            expect(result).toEndWith('***');
        });

        test('handles empty or invalid input', () => {
            expect(truncateText('')).toBe('');
            expect(truncateText(null)).toBe('');
            expect(truncateText(undefined)).toBe('');
        });
    });

    describe('capitalizeWords', () => {
        test('capitalizes first letter of each word', () => {
            const result = capitalizeWords('hello world test');
            expect(result).toBe('Hello World Test');
        });

        test('handles single word', () => {
            const result = capitalizeWords('hello');
            expect(result).toBe('Hello');
        });

        test('handles empty string', () => {
            const result = capitalizeWords('');
            expect(result).toBe('');
        });

        test('handles already capitalized text', () => {
            const result = capitalizeWords('Hello World');
            expect(result).toBe('Hello World');
        });
    });

    describe('countWords', () => {
        test('counts words correctly', () => {
            expect(countWords('hello world')).toBe(2);
            expect(countWords('one two three four')).toBe(4);
        });

        test('handles single word', () => {
            expect(countWords('hello')).toBe(1);
        });

        test('handles empty string', () => {
            expect(countWords('')).toBe(0);
            expect(countWords('   ')).toBe(0);
        });

        test('handles multiple spaces', () => {
            expect(countWords('hello    world   test')).toBe(3);
        });

        test('handles invalid input', () => {
            expect(countWords(null)).toBe(0);
            expect(countWords(undefined)).toBe(0);
        });
    });
});
