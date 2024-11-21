import React from 'react';
import { render, screen } from '@testing-library/react';
import Shield from '../../components/Shield';
import '@testing-library/jest-dom';

describe('Shield Component', () => {
    test('renders with default variant', () => {
        render(
            <Shield>
                <p>Test Content</p>
            </Shield>
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('renders with title', () => {
        render(
            <Shield title="TEST TITLE">
                <p>Test Content</p>
            </Shield>
        );

        expect(screen.getByText('TEST TITLE')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('applies different variants correctly', () => {
        const { rerender, container } = render(
            <Shield variant="gold">
                <p>Gold Variant</p>
            </Shield>
        );

        expect(container.firstChild).toHaveClass('relative');
        expect(screen.getByText('Gold Variant')).toBeInTheDocument();

        rerender(
            <Shield variant="frost">
                <p>Frost Variant</p>
            </Shield>
        );

        expect(container.firstChild).toHaveClass('relative');
        expect(screen.getByText('Frost Variant')).toBeInTheDocument();
    });

    test('applies custom className', () => {
        const { container } = render(
            <Shield className="custom-class">
                <p>Test Content</p>
            </Shield>
        );

        expect(container.firstChild).toHaveClass('custom-class');
    });
});