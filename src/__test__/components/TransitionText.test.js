import React from 'react';
import { render, screen, act } from '@testing-library/react';
import TransitionText from '../../components/TransitionText';
import '@testing-library/jest-dom';

jest.useFakeTimers();

describe('TransitionText Component', () => {
    afterEach(() => {
        jest.clearAllTimers();
    });

    test('initially shows runic text', () => {
        render(
            <TransitionText
                runic="ᚱᚢᚾᛋᚲᚱᛁᚾ"
                english="RUNSKRIN"
            />
        );

        const runicElement = screen.getByText('ᚱᚢᚾᛋᚲᚱᛁᚾ');
        expect(runicElement).toHaveClass('opacity-100');
    });

    test('transitions text after delay', () => {
        render(
            <TransitionText
                runic="ᚱᚢᚾᛋᚲᚱᛁᚾ"
                english="RUNSKRIN"
            />
        );

        const initialRunicElement = screen.getByText('ᚱᚢᚾᛋᚲᚱᛁᚾ');
        expect(initialRunicElement).toHaveClass('opacity-100');

        // Use act to wrap the timer advancement
        act(() => {
            jest.advanceTimersByTime(1500);
        });

        const finalRunicElement = screen.getByText('ᚱᚢᚾᛋᚲᚱᛁᚾ');
        expect(finalRunicElement).toHaveClass('opacity-0');
    });

    test('applies custom className', () => {
        const { container } = render(
            <TransitionText
                runic="ᚱᚢᚾᛋᚲᚱᛁᚾ"
                english="RUNSKRIN"
                className="custom-class"
            />
        );

        const wrapperDiv = container.firstChild;
        expect(wrapperDiv).toHaveClass('relative', 'custom-class');
    });

    test('handles centered prop', () => {
        render(
            <TransitionText
                runic="ᚱᚢᚾᛋᚲᚱᛁᚾ"
                english="RUNSKRIN"
                centered={true}
            />
        );

        const textElement = screen.getByText('ᚱᚢᚾᛋᚲᚱᛁᚾ');
        expect(textElement).toHaveClass('absolute', 'top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
    });
});