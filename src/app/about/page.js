import {Button, Container} from "react-bootstrap";
import Image from "next/image";

export default function About() {
    return (
        <Container>
            <nav className="breadcrumb-cus" aria-label="breadcrumb">
                <ol>
                    <li><a href="/">Главная</a></li>
                    <li aria-current="page">О нас</li>
                </ol>
            </nav>

            <h1>О нас</h1>

            <div className="bg-main-fon-about">
                <div className="about-block content-p">
                    <div>
                        <div className="about-block__left">
                            <p>Наша команда разработала виртуального доктора, чтобы сделать сервис поддержания здоровья доступным каждому. На основе создания данной платформы, нам удалось простым и доступным способом предоставить возможность буквально каждому на основе анализа скрининговых тестов получить информацию о своём здоровье с учётом рекомендаций ведущих мировых и российских медицинских учреждений и лучших профильных специалистов медицины.
                            </p>
                            <h3 className="fw-bold">С заботой о здоровье!</h3>
                            <p>Мы используем накопленные знания и применяем в работе аналитические алгоритмы, основанные на технологиях искусственного интеллекта, способных определить наличие рисков заболеваний и предоставить рекомендации по поддержанию здоровья и улучшения качества жизни.</p>
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-xl-center align-items-md-end  align-items-stretch gap-4">
                                <div className="fw-semibold">По вопросам сотрудничества пишите на почту <a href="#">info@zdravotech.ru</a>  или свяжитесь по форме обратной связи</div>
                                <div className="d-grid d-md-block"><Button className="text-nowrap">Связаться с нами</Button></div>
                            </div>
                        </div>
                    </div>
                    <div className="about-block__right">
                        <img src="/about/1.jpg" alt="Здравотех" />
                    </div>


                </div>


            </div>

        </Container>
    );
}
