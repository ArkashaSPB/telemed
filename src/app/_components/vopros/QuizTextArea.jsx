'use client';
import React from 'react';

export default function QuizTextarea({ q, value = '', onChange }) {
    return (
        <div className="d-flex flex-column gap-2">
      <textarea
          className="quiz-textarea"
          rows={q.rows || 4}
          placeholder={q.placeholder || ''}
          value={value}
          onChange={(e) => onChange(e.target.value)}
      />
        </div>
    );
}
