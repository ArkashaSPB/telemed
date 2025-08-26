import { Container } from "react-bootstrap";
import { getServicesItem } from "@/api/serverAPI";
import Kviz from "@/app/services/[code]/quiz/Kviz";
import Link from "next/link";

export default async function QuizPage({ params }) {
    const { code } = params;

    // грузим услугу и её items
    const service = await getServicesItem(code);

    if (!service) {
        return (
            <Container className="py-5">
                <h2>Услуга не найдена</h2>
            </Container>
        );
    }

    return (
        <Container>

            <nav className="breadcrumb-cus" aria-label="breadcrumb">
                <ol>
                    <li><Link href="/">Главная</Link></li>
                    <li><Link href="/services">Виды консультаций</Link> </li>
                    <li aria-current="page">{service.name}</li>
                </ol>
            </nav>
            <h1>{service.name}</h1>
            <Kviz items = {service.items}/>
        </Container>
    );
}