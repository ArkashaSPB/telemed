import React from 'react';
import {Container} from "react-bootstrap";
import Link from "next/link";
import consultations from "@/app/_data/consultations";
import RigthAuth from "@/app/_components/RigthAuth";

const Page = () => {
    return (


        <Container>

            <nav className="breadcrumb-cus" aria-label="breadcrumb">
                <ol>
                    <li><Link href="/">Главная</Link></li>
                    <li><Link href="/user">Личный кабинет</Link></li>
                    <li aria-current="page">Баланс</li>
                </ol>
            </nav>
            <div className="history-block">
                <div className="history-block__left ">

                    <div>
                        <div className="balans-item">
                            <span>Консультаций на балансе</span>
                            <span>4</span>
                        </div>

                        <div className="balans-item">
                            <span>Получено консультаций</span>
                            <span>4</span>
                        </div>

                        <div className="balans-item">
                            <span>Истрачено консультаций</span>
                            <span>0</span>
                        </div>
                    </div>


                </div>
                <div className="history-block__right">
                    <RigthAuth />
                </div>
            </div>
        </Container>
    );
};

export default Page;