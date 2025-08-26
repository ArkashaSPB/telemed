import React from 'react';

const HtmlContent = ({ content, className = "" }) => {
    // Функция для декодирования HTML entities без использования DOM
    const decodeHtmlEntities = (text) => {
        if (!text) return '';
        
        return text
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, ' ');
    };

    // Декодируем HTML entities
    const decodedContent = decodeHtmlEntities(content);

    return (
        <div 
            className={`html-content ${className}`}
            dangerouslySetInnerHTML={{ __html: decodedContent }}
        />
    );
};

export default HtmlContent;