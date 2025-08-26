import React from 'react';
import { FormCheck } from 'react-bootstrap';

function normalizeOptions(options = []) {
    // поддержка: если options = ["Да","Нет"] → сделаем {value,label}
    return options.map(opt =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
    );
}

const QuizRadio = ({ q, value = '', onChange }) => {
    const name = String(q.id ?? q.name ?? 'radio');
    const options = normalizeOptions(q.options);

    return (
        <div className="width-quiz-block">
            <div className="width-quiz-block__form">
                    {options.map((opt, idx) => (
                        <label
                            key={`${name}_${idx}`}
                            className="quiz-block-label"
                        >
                            <span>{opt.label}</span>
                            <FormCheck
                                className="padding-quiz"
                                type="radio"
                                name={name}
                                checked={value === opt.value}
                                onChange={() => onChange(opt.value)}
                            />
                        </label>
                    ))}
            </div>
        </div>
    );
};

export default QuizRadio;
