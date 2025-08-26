import {Button, Container} from "react-bootstrap";
import LogoSwiper from "@/app/_components/LogoSwiper";


import FormMain from "@/app/_blocks/FormMain";
import AnchorHandler from "@/app/_components/AnchorHandler";

import Link from "next/link";
import React from "react";

import {getServices} from "@/api/serverAPI";


export const partners = [
    {
        img: '1.jpg',
        title: 'Корпоративный сектор',
        text: 'Компании и корпорации могут использовать такой сервис для проведения профилактических осмотров сотрудников, своевременного выявления возможных заболеваний и повышения общего уровня здоровья коллектива. Это способствует снижению больничных и повышению продуктивности.'
    },
    {
        img: '2.jpg',
        title: 'Медицинские учреждения и клиники',
        text: 'Для автоматизации первичного анализа результатов пациентов, ускорения диагностики и повышения эффективности работы врачей. Виртуальный доктор помогает предварительно оценить состояние пациента перед консультацией специалиста.'
    },
    {
        img: '3.jpg',
        title: 'Страховые компании',
        text: 'Для оценки рисков и проведения предварительного анализа здоровья клиентов при оформлении страховых полисов, что позволяет более точно определять условия страхования.'
    },
    {
        img: '4.jpg',
        title: 'Образовательные учреждения и научные организации',
        text: 'Для проведения исследований в области телемедицины, а также для обучения студентов медицинских специальностей новым технологиям диагностики.'
    },
    // {
    //     img: '5.jpg',
    //     title: 'Государственные службы здравоохранения',
    //     text: 'Для расширения доступа к медицинской помощи в отдалённых регионах, автоматизации массовых профилактических программ и мониторинга здоровья населения.'
    // }
];

export default async function Home() {

  const services = await getServices();

  const url =  process.env.NEXT_PUBLIC_URL;

  return (
    <div  className="">
        <AnchorHandler />
        <main className="container main-block-top">
            <div className="main-block">
                <div className="main-block__content">
                    <div className="main-block__zag">
                        <h1>Забота о Вашем здоровье не требует много времени, с нами это легко и просто</h1>
                    </div>
                    <div className="main-block__text">
                        <p>Наша команда!!! <br/> разработала виртуального доктора, чтобы сделать сервис поддержания здоровья доступным каждому. Наша платформа на основе анализа и тестов позволяет получить информацию о своем здоровье с учетом рекомендаций ведущих мировых и российских медицинских учреждений, а также лучших профильных специалистов медицины.</p>
                        <Link href="/user" className="btn btn-primary mt-4">
                            <span>Личный кабинет</span>
                        </Link>
                    </div>
                </div>
                <div className="main-block__image">
                    <div></div>
                </div>
            </div>
        </main>

        <Container className="service">
            <h2>Наши услуги</h2>
            <div className="bg-main-fon">
                <p className="block-p">
                    Все рекомендации для вашего здоровья. Нам удалось агрегировать емкую и достоверную базу знаний для расшифровки и составления рекомендаций на основе представленных Вами данных анализов и тестов. Теперь можно быстро и легко получить рекомендации, основанные на знаниях и опыта ведущих специалистов.
                </p>
                <div className="maincards maincards-setka-main">
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





        </Container>
        <Container className="service" id="who">
            <h2>Кому подходит</h2>
            <div className="bg-main-fon">
                <p className="block-p">Всем, кто заботится о своём здоровье, благополучии своих родных, близких и любимых людей. Вы можете получить рекомендации по поддержанию здоровья на нашей платформе. Всё, что Вам нужно, это получить результаты анализов и загрузить их на нашу платформу, после чего, на основе проведённой расшифровки, Вам будут предоставлены рекомендации.</p>
                <div className="mainpartner">
                    {partners.map((item, idx) => (
                        <div key={idx} className="mainpartner__block">
                            <div className="mainpartner__img">
                                <img src={'/kto/' + item.img} alt={item.title}/>
                            </div>
                            <div className="mainpartner__title">{item.title}</div>
                            <div className="mainpartner__subtitle">{item.text}</div>
                        </div>
                    ))}
                </div>

            </div>

        </Container>

        <section id="cooperation" className="sot-block-top">
            <Container >
                <div className="sot-block">
                    <div className="sot-block__content">
                        <div className="sot-block__zag mb-4">
                            <h2>Сотрудничество с компанией</h2>
                        </div>
                        <div className="sot-block__text content-p">
                            <p>Телемед откроет перед вами новые возможности для повышения эффективности и доступности медицинской помощи. </p>
                            <p>Наша команда работала над созданием инновационной системы, который объединяет простоту использования и надежность научных данных. Благодаря этому, мы смогли сделать скрининговые тесты максимально доступными для каждого человека, обеспечивая быстрый и точный предварительный анализ состояния здоровья. </p>
                            <p>Использование технологий искусственного интеллекта и обработки больших данных позволяет нашим интеллектуальным помощникам выявлять риски развития различных заболеваний на ранних стадиях, давать персонализированные советы по улучшению образа жизни и направлять пациентов к нужным специалистам для постановки точного диагноза. Совместное сотрудничество с Телемед помогает расширить границы современной медицины, делая ее более доступной, эффективной и ориентированной на потребности каждого клиента. </p>
                            <p>Мы уверены, что наше партнерство откроет новые горизонты в области медицины и улучшит качество жизни миллионов людей.</p>
                            <div className="d-flex flex-column flex-md-row gap-4  flex-nowrap align-items-md-center align-items-stretch my-4">
                                <div>
                                    <b>По вопросам сотрудничества пишите на почту info@zdravotech.ru или свяжитесь по форме обратной связи</b>
                                </div>
                                <div className="d-grid d-md-flex  flex-grow-1">
                                    <Button style={{ whiteSpace: 'nowrap' }}><span>Связаться с нами</span></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sot-block__images"><div></div></div>
                </div>
            </Container>
        </section>

        <section className="partner-top">
            <Container>
                <h2>Партнеры</h2>
                <LogoSwiper/>
            </Container>
        </section>



        <div className="fon-zayavka" id="contacts">
        <Container>
            <div className="zayavka-block">
                        <div className="zayavka-block__text">
                            <h2>Появились вопросы?</h2>
                            <p>Отправьте заявку и мы ответим на все ваши вопросы или свяжитесь с нами по телефону 8 (800) 999-99-99</p>
                        </div>

                        <div className="zayavka-block__form">
                            <FormMain/>
                        </div>
            </div>
        </Container>
    </div>
    </div>
  );
}
