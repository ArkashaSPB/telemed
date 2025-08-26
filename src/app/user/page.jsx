import React from 'react';
import Link from "next/link";
import {Container} from "react-bootstrap";

const PageUser = () => {
    return (
        <Container>
            <nav className="breadcrumb-cus" aria-label="breadcrumb">

                <ol>
                    <li><Link href="/">Главная</Link></li>
                    <li aria-current="page">Личный кабинет</li>
                </ol>

            </nav>
            <div>
                <Link  href="/user/balans">Баланс</Link>
            </div>
        </Container>
    );
};

export default PageUser;