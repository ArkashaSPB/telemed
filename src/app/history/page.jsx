import React from 'react';
import {Container} from "react-bootstrap";
import Link from "next/link";
import services from "@/app/_data/service";
import RigthAuth from "@/app/_components/RigthAuth";
import consultations from "@/app/_data/consultations";

const HistoryPage = () => {
    return (
        <Container>
            <nav className="breadcrumb-cus" aria-label="breadcrumb">
                <ol>
                    <li><Link href="/">Главная</Link></li>
                    <li aria-current="page">История консультаций</li>
                </ol>
            </nav>


            <div className="history-block">
                <div className="history-block__left ">

                    <div className="history-grid-list">

                        <div className="history-grid header-g">
                            <div>Дата</div>
                            <div>Вид консультации</div>
                            <div>Результат</div>
                        </div>

                        {consultations.map((item) => (
                            <div key={item.id} className="history-grid row-g">
                                <div className="cell date">
                                    <div>{item.date}</div>
                                    <div className="muted">{item.time}</div>
                                </div>

                                <div className="cell title">
                                    <div>{item.title}</div>
                                    <div className="muted">{item.code}</div>
                                </div>

                                <div className="cell action">
                                    {item.action === 'result' ? (
                                        <Link href={`/history/${item.id}`} className="history-link">Результат</Link>
                                    ) : (
                                        <Link href={`/quiz/${item.id}`} className="history-link">Продолжить</Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="history-block__right">
                    <RigthAuth />
                </div>
            </div>
        </Container>
    );
};

export default HistoryPage;