import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Alert from './Alert.jsx';

// Mocks de los átomos
jest.mock('../../atoms/Icon/Icon.jsx', () => {
    return function MockIcon({ name, variant, size }) {
        return (
            <span
                data-testid="mock-icon"
                data-icon-name={name}
                data-variant={variant}
                data-size={size}
            >
                {name}
            </span>
        );
    };
});

jest.mock('../../atoms/Text/Text.jsx', () => {
    return function MockText({ children, variant }) {
        return (
            <span
                data-testid="mock-text"
                data-variant={variant}
            >
                {children}
            </span>
        );
    };
});

jest.mock('../../atoms/Container/Container.jsx', () => {
    return function MockContainer({ children, className, variant, padding, shadow, fitContent, centered }) {
        return (
            <div
                data-testid="mock-container"
                className={className}
                data-variant={variant}
                data-padding={padding}
                data-shadow={shadow}
                data-fit-content={fitContent}
                data-centered={centered}
            >
                {children}
            </div>
        );
    };
});

describe('Alert Component', () => {
    test('renderiza alert básico', () => {
        render(<Alert type="info" title="Test Title" message="Test message" />);

        expect(screen.getByTestId('mock-container')).toBeInTheDocument();
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    test('muestra icono automático según tipo', () => {
        const { rerender } = render(<Alert type="info" message="Info message" />);
        expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-icon-name', 'info-circle');

        rerender(<Alert type="success" message="Success message" />);
        expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-icon-name', 'check-circle');

        rerender(<Alert type="warning" message="Warning message" />);
        expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-icon-name', 'exclamation-triangle');

        rerender(<Alert type="error" message="Error message" />);
        expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-icon-name', 'times-circle');
    });

    test('permite icono personalizado', () => {
        render(<Alert type="info" icon="custom-icon" message="Test" />);
        expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-icon-name', 'custom-icon');
    });

    test('renderiza enlace cuando se proporcionan linkText y linkUrl', () => {
        render(
            <Alert
                type="info"
                message="Check our"
                linkText="documentation"
                linkUrl="https://docs.example.com"
            />
        );

        const link = screen.getByRole('link', { name: 'documentation' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://docs.example.com');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('configura target del enlace correctamente', () => {
        render(
            <Alert
                type="info"
                message="Go to"
                linkText="dashboard"
                linkUrl="/dashboard"
                linkTarget="_self"
            />
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('target', '_self');
    });

    test('no renderiza enlace si falta linkText o linkUrl', () => {
        const { rerender } = render(
            <Alert type="info" message="Test" linkText="link" />
        );
        expect(screen.queryByRole('link')).not.toBeInTheDocument();

        rerender(<Alert type="info" message="Test" linkUrl="/test" />);
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    test('aplica clases CSS según tipo', () => {
        render(<Alert type="error" message="Error message" />);
        expect(screen.getByTestId('mock-container')).toHaveClass('alert--error');
    });

    test('pasa props de padding y shadow al Container', () => {
        render(
            <Alert
                type="info"
                message="Test"
                padding="large"
                shadow="lg"
            />
        );

        const container = screen.getByTestId('mock-container');
        expect(container).toHaveAttribute('data-padding', 'large');
        expect(container).toHaveAttribute('data-shadow', 'lg');
    });

    test('renderiza solo mensaje sin título', () => {
        render(<Alert type="info" message="Only message" />);

        expect(screen.getByText('Only message')).toBeInTheDocument();
        expect(screen.queryByTestId('mock-text')).toBeInTheDocument();
    });

    test('renderiza solo título sin mensaje', () => {
        render(<Alert type="info" title="Only title" />);

        expect(screen.getByText('Only title')).toBeInTheDocument();
    });

    test('maneja tipo undefined con icono por defecto', () => {
        render(<Alert message="Test message" />);
        expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-icon-name', 'info-circle');
    });

    test('aplica variant del tipo al icono', () => {
        render(<Alert type="success" message="Success" />);
        expect(screen.getByTestId('mock-icon')).toHaveAttribute('data-variant', 'success');
    });
});
