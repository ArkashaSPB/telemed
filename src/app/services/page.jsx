import React from "react";
import {Button, Container} from "react-bootstrap";
import Link from "next/link";

import RigthAuth from "@/app/_components/RigthAuth";
import {getServices} from "@/api/serverAPI";

const ServicePage = async  () => {

    const url =  process.env.NEXT_PUBLIC_URL;

    const services = await getServices();
    return (
        <Container>
            <nav className="breadcrumb-cus" aria-label="breadcrumb">
                <ol>
                    <li><Link href="/">Главная</Link></li>
                    <li aria-current="page">Виды консультаций</li>
                </ol>
            </nav>
            <h2>Виды консультаций</h2>
            <div className="service-block">
                <div className="service-block__left ">
                    <div className="service-block__content">
                        <p>Все рекомендации для Вашего здоровья! Нам удалось агрегировать ёмкую и достоверную базу знаний для расшифровки и составления рекомендаций на основе предоставленных Вами данных анализов. Теперь можно быстро и легко получить информацию о своем здоровье.</p>
                    </div>
                    <div className="service-block__cards maincards">
                        {services.map((item) => (
                            <Link
                                href={`/services/${item.code}`}
                                className="maincards__block"
                                key={item.id}
                            >
                                <div className="maincards__image">
                                    <img src={`${url}${item.image}`} alt={item.name} />
                                </div>
                                <h3 className="maincards__title">{item.name}</h3>
                                <p className="maincards__subtitle">{item.subtitle}</p>
                            </Link>
                        ))}
                    </div>

                </div>
                <div className="service-block__right">
                    <RigthAuth />
                </div>

            </div>
        </Container>
    );
};

export default ServicePage;
