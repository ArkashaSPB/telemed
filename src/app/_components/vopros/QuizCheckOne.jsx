import React from 'react';
import { FormCheck } from "react-bootstrap";

const QuizCheckOne = ({ q, answers, setValue }) => {
    const hasOptions = Array.isArray(q.options) && q.options.length > 0;

    // 1) Варианты есть -> радио (выбор одного)
    if (hasOptions) {
        return (
            <div className="d-flex flex-column gap-2">
                {q.options.map((opt, i) => (
                    <div key={i} className="quiz-fon">
                        <label className="d-flex align-items-center gap-2 justify-content-between">
                            <span>{opt.label}</span>
                            <FormCheck
                                className="padding-quiz"
                                type="radio"
                                name={q.id}
                                checked={answers[q.id] === opt.value}
                                onChange={() => setValue(q.id, opt.value, 'checkbox-one')}
                            />
                        </label>
                    </div>
                ))}
            </div>
        );
    }

    // 2) Вариантов нет -> одиночный чекбокс (булево)
    return (
        <div className="quiz-fon">
            <label className="d-flex align-items-center gap-2 justify-content-between">
                <span>{q.label}</span>
                <FormCheck
                    className="padding-quiz"
                    type="checkbox"
                    checked={!!answers[q.id]}
                    onChange={(e) => setValue(q.id, e.target.checked, 'checkbox-one')}
                />
            </label>
        </div>
    );
};

export default QuizCheckOne;
