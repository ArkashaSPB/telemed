'use client';

import { useEffect } from 'react';

export default function AnchorHandler() {
    useEffect(() => {
        // Обрабатываем хэш в URL при загрузке страницы
        const handleHashScroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const element = document.getElementById(hash.replace('#', ''));
                if (element) {
                    // Небольшая задержка для полной загрузки страницы
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        };

        // Выполняем сразу при монтировании
        handleHashScroll();

        // Также слушаем изменения хэша
        window.addEventListener('hashchange', handleHashScroll);

        return () => {
            window.removeEventListener('hashchange', handleHashScroll);
        };
    }, []);

    return null; // Этот компонент ничего не рендерит
}