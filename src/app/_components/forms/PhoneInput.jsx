'use client';
import React, { useState } from 'react';

function parseDigits(str) {
    let d = String(str ?? '').replace(/\D/g, '');
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (d.startsWith('7')) d = d.slice(1);
    return d.slice(0, 10);
}

function formatPhone(d) {
    if (!d) return '';

    let view = '+7';
    if (d.length > 0) view += ' (' + d.slice(0, 3);
    if (d.length > 3) view += ') ' + d.slice(3, 6);
    if (d.length > 6) view += '-' + d.slice(6, 8);
    if (d.length > 8) view += '-' + d.slice(8, 10);
    return view;
}

const PhoneInput = ({ name, placeholder = '+7 (___) ___-__-__', onDigitsChange }) => {
    const [digits, setDigits] = useState('');

    const handleChange = (e) => {
        const input = parseDigits(e.target.value);
        setDigits(input);
        onDigitsChange?.(input);
    };

    const handleKeyDown = (e) => {
        if (['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)) return;
        if (!/\d/.test(e.key)) e.preventDefault();
    };

    return (
        <div className="custom-form">
            {name && <div>{name}</div>}
            <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={formatPhone(digits)}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
        </div>
    );
};

export default PhoneInput;
