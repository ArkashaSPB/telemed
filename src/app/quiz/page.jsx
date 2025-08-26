'use client';
import { useState } from 'react';
import quiz from '../_data/quiz';
import { Container, Button } from 'react-bootstrap';
import QuizRadio from "@/app/_components/vopros/QuizRadio";
import QuizCheck from "@/app/_components/vopros/QuizCheck";
import QuizTextarea from "@/app/_components/vopros/QuizTextArea";
import QuizCheckOne from "@/app/_components/vopros/QuizCheckOne";
import QuizBlocks from "@/app/_components/vopros/QuizBlocks";

// начальные значения для разных типов
const emptyAnswer = (q) => {
    switch (q.type) {
        case 'checkbox': return [];
        case 'checkbox-one': return false;
        case 'number': return '';
        default: return '';
    }
};

// валидация обязательных
const validateStep = (step, answers) => {
    const errors = {};
    step.questions.forEach(q => {
        const val = answers[q.id];
        if (q.required) {
            const isEmpty =
                (q.type === 'checkbox' && (!Array.isArray(val) || val.length === 0)) ||
                (q.type === 'checkbox-one' && !val) ||
                (val === '' || val === null || val === undefined);
            if (isEmpty) errors[q.id] = 'Заполните поле';
        }
        if (q.type === 'number' && val !== '') {
            if (q.min !== undefined && +val < q.min) errors[q.id] = `Минимум ${q.min}`;
            if (q.max !== undefined && +val > q.max) errors[q.id] = `Максимум ${q.max}`;
        }
    });
    return errors;
};

// функция преобразования ответов в красивый массив
const prepareAnswers = (quiz, answers) => {
    const out = [];
    let num = 1;

    quiz.forEach(step => {
        step.questions.forEach(q => {
            const val = answers[q.id];
            let display;

            if (q.type === 'checkbox') {
                const otherKey = `${q.id}__other`;
                display = (val || [])
                    .map(v => {
                        if (v === 'other') {
                            const t = answers[otherKey];
                            return t && String(t).trim() ? `Другое: ${t}` : 'Другое';
                        }
                        return (Array.isArray(q.options)
                            ? q.options.find(o => o.value === v)?.label
                            : null) || v;
                    })
                    .join(', ');
            } else if (q.type === 'checkbox-one' || q.type === 'radio') {
                if (Array.isArray(q.options)) {
                    display = q.options.find(o => o.value === val)?.label || val;
                } else {
                    display = val ? '✅ Согласен' : '❌ Не согласен';
                }
            } else if (q.type === 'chips' && Array.isArray(val)) {
                display = val.join(', ');
            } else {
                display = val;
            }

            out.push({ num: num++, question: q.label || q.title || '(без текста)', answer: display || '—' });
        });
    });

    return out;
};


export default function QuizPage() {
    const [stepIndex, setStepIndex] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    // единое хранилище ответов
    const [answers, setAnswers] = useState(() => {
        const init = {};
        quiz.forEach(s => s.questions.forEach(q => { init[q.id] = emptyAnswer(q); }));
        return init;
    });

    const step = quiz[stepIndex];
    const total = quiz.length;

    const setValue = (qid, value, type) => {
        setAnswers(prev => {
            if (type === 'checkbox') {
                const arr = Array.isArray(prev[qid]) ? [...prev[qid]] : [];
                const idx = arr.indexOf(value);
                if (idx === -1) arr.push(value); else arr.splice(idx, 1);
                return { ...prev, [qid]: arr };
            }

            // текст поля "Другое"
            if (type === 'checkbox__other') {
                const otherKey = `${qid}__other`;
                const arr = Array.isArray(prev[qid]) ? [...prev[qid]] : [];
                const text = String(value ?? '').trim();

                const i = arr.indexOf('other');
                if (text && i === -1) arr.push('other');     // если есть текст – включаем флаг "other"
                if (!text && i !== -1) arr.splice(i, 1);     // если очистили – убираем

                return { ...prev, [qid]: arr, [otherKey]: text };
            }

            return { ...prev, [qid]: value };
        });
    };



    const next = () => {
        const errors = validateStep(step, answers);
        if (Object.keys(errors).length) {
            alert('Заполните обязательные поля');
            return;
        }
        if (step.isLast || stepIndex === total - 1) {
            setSubmitted(true);
            return;
        }
        setStepIndex(i => Math.min(i + 1, total - 1));
    };

    const prev = () => setStepIndex(i => Math.max(i - 1, 0));

    const restart = () => {
        setStepIndex(0);
        setSubmitted(false);
        const init = {};
        quiz.forEach(s => s.questions.forEach(q => { init[q.id] = emptyAnswer(q); }));
        setAnswers(init);
    };

    if (submitted) {
        const result = prepareAnswers(quiz, answers);
        return (
            <Container className="py-5">
                <h2 className="mb-4">Ваши ответы</h2>
                <ul className="list-group mb-4">
                    {result.map(r => (
                        <li key={r.num} className="list-group-item">
                            <strong>{r.num}. {r.question}</strong>
                            <div>{r.answer}</div>
                        </li>
                    ))}
                </ul>
                <Button variant="primary" onClick={restart}>Начать сначала</Button>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <div className="mb-4 d-block d-xl-flex justify-content-between align-items-end">
                <h2 className="mb-1 zag-50">Какая то услуга Какая то услуга Какая то услуга</h2>
                <div className="quiz-step text-end">
                    Вопрос {stepIndex + 1}/{total}
                </div>
            </div>

            <div className="bg-block-quiz">
                <h2 className="mb-1 text-center">{step.title}</h2>

                {step.questions.map(q => (
                    <div key={q.id}>
                        {q.label && <div className="mb-2 fw-semibold">{q.label}</div>}

                        {q.type === 'radio' && (
                            <div className="block-quiz">
                                <QuizRadio q={q} answers={answers} setValue={setValue}/>
                            </div>
                        )}
                        {q.type === 'checkbox' && (
                            <div className="block-quiz">
                                <QuizCheck q={q} answers={answers} setValue={setValue}/>
                            </div>
                        )}
                        {q.type === 'checkbox-one' && (
                            <div className="block-quiz">
                                <QuizCheckOne q={q} answers={answers} setValue={setValue}/>
                            </div>
                        )}
                        {(q.type === 'text' || q.type === 'textarea') && (
                            <div className="block-quiz-text">
                                <QuizTextarea q={q} answers={answers} setValue={setValue}/>
                            </div>
                        )}

                        {q.type === 'chips' && (
                            <QuizBlocks q={q} answers={answers} setValue={setValue}/>
                        )}
                    </div>
                ))}

                <div className="block-quiz">
                    <div className="d-flex justify-content-between mt-4">
                        <Button variant="outline-primary" onClick={prev} disabled={stepIndex === 0}>
                            Назад
                        </Button>
                        <Button
                            variant="primary"
                            onClick={next}
                            disabled={!quiz.length}
                        >
                            {step?.isLast || stepIndex === total - 1 ? 'Отправить' : 'Далее'}
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}
