'use client';
import { useEffect, useRef, useState } from 'react';

export default function CircleProgressAnimated({
                                                   size = 200,           // размер SVG
                                                   strokeWidth = 12,     // толщина дуги
                                                   color = '#257a74',    // цвет прогресса
                                                   trackColor = '#e9eef2',// цвет фона круга
                                                   duration = 3000,      // время от 0 до 100 (мс)
                                                   loop = true           // зациклить 0→100→0→... (если false — остановится на 100)
                                               }) {
    const radius = (size - strokeWidth) / 2;
    const C = 2 * Math.PI * radius;

    const rafRef = useRef(null);
    const startRef = useRef(null);
    const [value, setValue] = useState(0); // 0..100

    useEffect(() => {
        const animate = (t) => {
            if (!startRef.current) startRef.current = t;
            const elapsed = t - startRef.current;

            let progress = Math.min(elapsed / duration, 1); // 0..1
            const val = Math.round(progress * 100);
            setValue(val);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else if (loop) {
                // перезапуск
                startRef.current = null;
                rafRef.current = requestAnimationFrame(animate);
            }
        };

        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [duration, loop]);

    const offset = C - (value / 100) * C;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* круг-трек */}
            <circle
                stroke={trackColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            {/* прогресс */}
            <circle
                stroke={color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                strokeDasharray={C}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 80ms linear' }}
                transform={`rotate(-90 ${size / 2} ${size / 2})`} // старт сверху
            />
            {/* число */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".32em"
                fontSize={size * 0.22}
                fontWeight="700"
                fill={color}
            >
                {value}%
            </text>
        </svg>
    );
}
