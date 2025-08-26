'use client';
import React, { useState, useEffect } from 'react';

export default function QuizBlocks({ q, value = 1, onChange }) {
    const max = Array.isArray(q.options) ? q.options.length : 1;
    const min = 1;

    const clamp = (n) => Math.min(max, Math.max(min, n));

    // локальное состояние текста
    const [inputVal, setInputVal] = useState(String(value));

    // синхронизация, если value прилетает сверху
    useEffect(() => {
        setInputVal(String(value));
    }, [value]);

    const commit = (val) => {
        let num = Number(val);
        if (isNaN(num)) num = min;
        num = clamp(num);
        onChange(num);          // наверх только число
    };

    return (
        <>
            {q.optionsText && <div className="mb-2">{q.optionsText}</div>}
            {q.subtitle && <div className="text-muted mb-3">{q.subtitle}</div>}

            <div className="zaq-block-chips">Список слов</div>

            <div className="quiz-tablet mb-4">
                {(q.options || []).map((opt, i) => (
                    <div key={i}>
                        {typeof opt === 'string' ? opt : (opt?.label ?? String(opt))}
                    </div>
                ))}
            </div>

            <div className="text-center mx-auto block-block">
                <div className="mb-2 fw-semibold">
                    Пересчитайте количество слов и напишите в поле
                </div>

                <div className="d-flex align-items-center justify-content-center gap-3 mb-2">
                    <button
                        className="circle-btn left"
                        onClick={() => commit(value - 1)}
                        disabled={value <= min}
                    />

                    <input
                        type="number"
                        min={min}
                        max={max}
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}   // только текст
                        onBlur={() => commit(inputVal)}                 // при уходе фокуса пишем наверх
                        className="quiz-input-number"
                    />

                    <button
                        className="circle-btn"
                        onClick={() => commit(value + 1)}
                        disabled={value >= max}
                    />
                </div>

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => commit(e.target.value)}
                    className="form-range"
                />
            </div>
        </>
    );
}
