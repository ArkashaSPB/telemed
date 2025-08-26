import {Container} from "react-bootstrap";
import Link from "next/link";

export default function NotFound() {
    return (
        <Container>

            <div className="not-found">
                <div className="not-found__left">
                    <h2>404</h2>
                    <p className="not-found__top">Упс,  что-то пошло не так</p>
                    <p className="not-found__body">Запрашиваемая страница сломалась или была перенесена.
                        Вы можете вернуться назад или перейти на <Link href="/">На главную</Link></p>
                </div>
                <div className="not-found__right">
                    <img src="/404.png" alt="404" />
                </div>

            </div>
        </Container>

    );
}