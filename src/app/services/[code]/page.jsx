
import { Container } from "react-bootstrap";
import services from "../../_data/service";
import Link from "next/link";

import FormServices from "@/app/_blocks/FormServices";
import {getServicesItem} from "@/api/serverAPI";
import Kviz from "@/app/services/[code]/quiz/Kviz";

const url =  process.env.NEXT_PUBLIC_URL;

export async function generateMetadata({ params }) {
    const service = await getServicesItem(params.code);


    if (!service) {
        return {
            title: "Услуга не найдена",
            description: "Такой услуги нет",
        };
    }
    return {
        title: service.name,
        description: service.subtitle ?? service.description?.slice(0, 160) ?? "",
    };
}


const  ServiceDetail = async ({ params }) => {

    const { code } = params;
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

            <div className="services-detail content-p">
                <div className="services-detail__left">
                    <div
                        dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                </div>


                <div>
                    <div className="right-service-block">
                        <div className="right-service-block__images">
                            <img src={url+service.image} alt={service.name}/>
                        </div>
                        <div className="right-service-block__form">
                            <h3>Пройти опрос</h3>
                            <FormServices code={code} />
                        </div>

                    </div>
                </div>

            </div>




        </Container>
    );
};

export default ServiceDetail;
