// src/app/history/[id]/page.jsx
import consultations from '@/app/_data/consultations';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from "react";
import {Button, Container} from "react-bootstrap";
import results from '@/app/_data/results';
// серверный компонент (по умолчанию). Если нужен react-bootstrap Container, можно добавить 'use client' и обернуть в div.

export default function HistoryItemPage({ params }) {
    const { id } = params;
    const item = consultations.find(c => String(c.id) === String(id));
    if (!item) return notFound();

    return (
        <Container >
            <nav className="breadcrumb-cus" aria-label="breadcrumb">
                <ol>
                    <li><Link href="/">Главная</Link></li>
                    <li><Link href="/history">История консультаций</Link></li>
                    <li aria-current="page" className="d-none d-md-block" >{item.title}</li>
                </ol>
            </nav>

            <div className="content">
                <h1 className="mb-2">{item.title}</h1>


                {/* Лиды/преамбула */}
                {Array.isArray(results.lead) && (
                    <div className="mb-4 d-flex flex-column gap-2">
                        {results.lead.map((p, i) => <p key={i} className="mb-0">{p}</p>)}
                    </div>
                )}

                {/* Секции */}
                <div className="d-flex flex-column gap-4">
                    {results.sections.map((sec, idx) => {
                        if (sec.type === 'text') {
                            return (
                                <section key={idx}>
                                    {sec.title && <h5 className="mb-2">{sec.title}</h5>}
                                    <p className="mb-0">{sec.body}</p>
                                </section>
                            );
                        }
                        if (sec.type === 'kv') {
                            return (
                                <section key={idx}>
                                    {sec.title && <h5 className="mb-2">{sec.title}</h5>}
                                    <dl className="row mb-0">
                                        {sec.items.map((it, i) => (
                                            <div key={i} className="d-flex gap-2 mb-1">
                                                <dt className="m-0 fw-semibold">{it.label}</dt>
                                                <dd className="m-0">{it.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </section>
                            );
                        }
                        if (sec.type === 'table') {
                            return (
                                <section key={idx}>
                                    {sec.title && <h5 className="mb-3">{sec.title}</h5>}
                                    <div className="mini-table">

                                                {/*{sec.columns.map((c, i) =>*/}
                                                {/*    <div key={i}>{c}</div>*/}
                                                {/*)}*/}

                                                {sec.rows.map((r, i) => (
                                                    <React.Fragment key={i}>
                                                        {r.map((cell, j) => <div key={j}>{cell}</div>)}
                                                    </React.Fragment>
                                                ))}

                                    </div>
                                </section>
                            );
                        }
                        if (sec.type === 'bullets') {
                            return (
                                <section key={idx}>
                                    {sec.title && <h5 className="mb-2">{sec.title}</h5>}
                                    <ul className="mb-0">
                                        {sec.items.map((t, i) => <li key={i}>{t}</li>)}
                                    </ul>
                                </section>
                            );
                        }
                        if (sec.type === 'small') {
                            return <p key={idx} className="text-muted small mb-0">{sec.body}</p>;
                        }
                        return null;
                    })}



            </div>
            </div>


            <div className="mt-4">
                <Button>Закончить</Button>
            </div>
            <div className="end-content"></div>


        </Container>
    );
}

// (необязательно) — чтобы Next заранее знал какие id сгенерировать статически
export async function generateStaticParams() {
    return consultations.map(c => ({ id: String(c.id) }));
}

// (необязательно) — динамический title для вкладки
export async function generateMetadata({ params }) {
    const c = consultations.find(x => String(x.id) === String(params.id));
    return {
        title: c ? `${c.title} — История` : 'Консультация — не найдена'
    };
}
