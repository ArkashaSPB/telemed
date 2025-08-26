import React from 'react';
import { FormCheck } from 'react-bootstrap';

const QuizCheck = ({ q, value = [], otherValue = '', onChange }) => {
    const options = Array.isArray(q.options) ? q.options : [];

    const toggle = (opt) => {
        const arr = value.includes(opt)
            ? value.filter(v => v !== opt)
            : [...value, opt];
        const full = otherValue ? [...arr, `Другое - ${otherValue}`] : arr;
        onChange(full);
    };

    const changeOther = (text) => {
        const arr = value.filter(v => !v.startsWith("Другое -"));
        const full = text ? [...arr, `Другое - ${text}`] : arr;
        onChange(full);
    };

    const toggleOther = () => {
        const isOtherSelected = value.some(v => v.startsWith("Другое -"));
        if (isOtherSelected) {
            // Убираем "Другое"
            const arr = value.filter(v => !v.startsWith("Другое -"));
            onChange(arr);
        } else {
            // Добавляем "Другое" с текущим текстом или пустой строкой
            const arr = value.filter(v => !v.startsWith("Другое -"));
            const full = otherValue ? [...arr, `Другое - ${otherValue}`] : [...arr, "Другое - "];
            onChange(full);
        }
    };

    return (
        <div className="width-quiz-block">

            <div className="__form">

                <div className="d-flex gap-2 flex-column">

                {options.map((opt, idx) => {
                    const isOther = opt === 'Другое';
                    const checked = value.includes(opt) || value.some(v => v.startsWith("Другое -"));

                    return (
                        <div key={`${q.id}_${idx}`} className={isOther ? "quiz-block-label-input" : "quiz-block-label"}>
                            <span 
                                className="quiz-label-text"
                                onClick={!isOther ? () => toggle(opt) : toggleOther}
                                style={{ cursor: 'pointer' }}
                            >
                                {opt}
                            </span>
                            {!isOther ? (
                                <FormCheck
                                    className="padding-quiz"
                                    type="checkbox"
                                    checked={value.includes(opt)}
                                    onChange={() => toggle(opt)}
                                />
                            ) : (
                                <FormCheck
                                    className="padding-quiz"
                                    type="checkbox"
                                    checked={value.some(v => v.startsWith("Другое -"))}
                                    onChange={toggleOther}
                                />
                            )}

                            {isOther && value.some(v => v.startsWith("Другое -")) && (
                                <input
                                    type="text"
                                    className="input_other "
                                    placeholder="Укажите"
                                    value={otherValue}
                                    onChange={(e) => changeOther(e.target.value)}
                                />
                            )}
                        </div>
                    );
                })}

            </div>

            </div>

        </div>
    );
};


export default QuizCheck;
