'use client';

import { useMemo, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import QuizCheck from "@/app/_components/vopros/QuizCheck";
import QuizRadio from "@/app/_components/vopros/QuizRadio";
import QuizTextarea from "@/app/_components/vopros/QuizTextArea";
import QuizBlocks from "@/app/_components/vopros/QuizBlocks";
import QuizNumber from "@/app/_components/vopros/QuizNumber";
import HtmlContent from "@/app/_components/HtmlContent";


export default function Kviz({ items = [] }) {


    console.log(items)
    const stepCount = items.length;

    // 0-based проще и безопаснее
    const [step, setStep] = useState(0);

    // ответы: { [questionKey]: value } — value может быть строкой, числом, массивом
    const [anketa, setAnketa] = useState([]);
    // безопасно берём текущий элемент
    const current = items[step] || null;

    // универсальная запись ответа
    const setAnswer = (name, value) => {
        setAnketa(prev => ({ ...prev, [name]: value }));
    };

    // для мульти-выбора (чекбоксы)
    const toggleMulti = (name, value) => {
        setAnketa(prev => {
            const arr = Array.isArray(prev[name]) ? prev[name] : [];
            const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
            return { ...prev, [name]: next };
        });
    };

    const nextStep = () => {
        if (step < stepCount - 1) setStep(s => s + 1);
        // если это последний шаг — тут отправка на бэк
        else {
            console.log('ANSWERS:', anketa);
            // submit(anketa)
        }
    };

    const prevStep = () => {
        if (step > 0) setStep(s => s - 1);
    };

    if (!current) {
        return (
            <Container className="py-5">
                <h4>Нет данных для квиза</h4>
            </Container>
        );
    }


    const upsertAnswer = (qName, values) => {
        setAnketa(prev => {
            const i = prev.findIndex(x => x.name === qName);
            if (i === -1) return [...prev, { name: qName, otvet: values }];
            return prev.map((item, idx) =>
                idx === i ? { ...item, otvet: values } : item
            );
        });
    };

    const getVal = (qName) => anketa.find(x => x.name === qName)?.otvet || '';


    // ключ вопроса. выбери единый: id или name
    const qKey = current.id ?? current.name;


    return (
        <div>

            <div className="d-flex justify-content-end align-items-center mb-3 ">
                <div className="text-muted">Вопрос {step + 1} / {stepCount}</div>
            </div>

            <div className="bg-block-quiz">
                <div className="quiz-zag">
                    <h2 className="mb-0">{current.title}</h2>
                    <HtmlContent content={current.text} />

                </div>
                <div className="">
                    {current.type === 'checkbox' && (
                        <QuizCheck
                            q={current}
                            value={anketa.find(x => x.name === current.name)?.otvet || []}
                            otherValue={
                                (anketa.find(x => x.name === current.name)?.otvet || [])
                                    .find(v => v.startsWith("Другое -"))
                                    ?.replace("Другое - ", "") || ""
                            }
                            onChange={(val) => upsertAnswer(current.name, val)}
                        />
                    )}

                    {current.type === 'radio' && (
                        <QuizRadio
                            q={current}
                            value={anketa.find(x => x.name === current.name)?.otvet || ''}
                            onChange={(val) => upsertAnswer(current.name, val)}
                        />
                    )}

                    {current.type === 'textarea' && (
                        <QuizTextarea
                            q={current}
                            value={getVal(current.name)}                 // строка
                            onChange={(text) => upsertAnswer(current.name, text)}
                        />
                    )}


                    {current.type === 'chips' && (
                        <QuizBlocks
                            q={current}
                            value={Number(getVal(current.name)) || 1}        // число
                            onChange={(n) => upsertAnswer(current.name, n)}  // пишем число
                        />
                    )}

                    {current.type === 'number' && (
                        <QuizNumber
                            q={current}
                            value={Number(getVal(current.name)) || 1}        // число
                            onChange={(n) => upsertAnswer(current.name, n)}  // пишем число
                        />
                    )}


                </div>

                <div className="width-quiz-block">
                    <div className="width-quiz-block__buttons">
                        <Button disabled={step === 0} variant="outline-secondary" onClick={prevStep}>Назад</Button>
                        <Button variant="primary" onClick={nextStep}>
                            <span> {step === stepCount - 1 ? 'Отправить' : 'Далее'}</span>
                        </Button>
                    </div>

                </div>
            </div>

            {/* Debug */}
            <pre className="mt-3 p-3 bg-light rounded-3">{JSON.stringify(anketa, null, 2)}</pre>
        </div>
    );
}
