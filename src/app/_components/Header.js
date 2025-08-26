'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import {useState} from "react";
import {useRouter, usePathname} from "next/navigation";
import GlobalModal from "@/app/_components/GlobalModal";
import {useUIStore} from "@/store/uiStore";
import {useUserStore} from "@/store/userStore";

const links = [
    { href: '/about', label: 'О нас' },
    { href: '/services', label: 'Услуги' },
    { href: '#who', label: 'Кому подходит' ,  isAnchor: true },
    { href: '#cooperation', label: 'Сотрудничество', isAnchor: true },
    { href: '#contacts', label: 'Контакты' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const user = useUserStore((state) => state.user);

    const { openModal } = useUIStore();
    
    // Функция плавной прокрутки к якорю
    const scrollToAnchor = (anchorId) => {
        // Убираем # если есть
        const id = anchorId.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Обработчик клика по ссылке
    const handleLinkClick = (link, e) => {
        if (link.isAnchor) {
            e.preventDefault();
            
            // Если мы на главной странице, просто прокручиваем и обновляем URL
            if (pathname === '/') {
                // Обновляем URL с хэшем
                window.history.pushState(null, null, link.href);
                scrollToAnchor(link.href);
            } else {
                // Если на другой странице, используем Next.js router без перезагрузки
                router.push(`/${link.href}`);
            }
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between block-header position-sticky">
                <div className="container top d-flex justify-content-between  align-items-center flex-grow-1 ">
                    <Link href="/" className="logo-main">
                        <img  src={"/logo.png"} alt="Здравотех"/>
                    </Link>
                    <div className="mx-auto d-none d-xl-flex flex-grow-1 justify-content-center">
                        {links.map((l) => (
                            l.isAnchor ? (
                                <a 
                                    key={l.href} 
                                    href={l.href} 
                                    className="main-link"
                                    onClick={(e) => handleLinkClick(l, e)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {l.label}
                                </a>
                            ) : (
                                <Link key={l.href} href={l.href} className="main-link">
                                    {l.label}
                                </Link>
                            )
                        ))}
                    </div>
                    <div className="d-flex align-items-center ">
                        <a href="tel:88009999999" className="phone-main">
                            8 (800) 999-99-99
                        </a>
                        {user  ?
                            <Link href="/user" className="auth-main d-none d-lg-flex gap-2 align-items-center">
                                <Image src="/auth.png" alt="Здравотех" width={32} height={32}/>{user.name}
                            </Link>
                                :
                            <div onClick={openModal} className="auth-main d-none d-lg-flex gap-2 align-items-center">
                                <Image src="/auth.png" alt="Здравотех" width={32} height={32}/>
                                <Link href="/user" className="main-link2">Войти</Link>
                            </div>
                        }
                    </div>

                    <div className="burger-cust" onClick={() => setOpen(true)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                </div>




            </div>


            {/* Offcanvas-меню слева */}
            <Offcanvas show={open} onHide={() => setOpen(false)} placement="end" className="menu-offcanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Меню</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <nav className="d-flex flex-column gap-2">
                        {links.map((l) => (
                            l.isAnchor ? (
                                <a 
                                    key={l.href} 
                                    href={l.href} 
                                    className="nav-link"
                                    onClick={(e) => {
                                        handleLinkClick(l, e);
                                        setOpen(false);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {l.label}
                                </a>
                            ) : (
                                <Link key={l.href} href={l.href} className="nav-link" onClick={() => setOpen(false)}>
                                    {l.label}
                                </Link>
                            )
                        ))}
                    </nav>
                    <hr className="my-3" />
                    <div className="d-grid gap-2">
                        <a href="tel:88009999999" className="btn btn-outline-primary">Позвонить: 8 (800) 999-99-99</a>


                        {/*<Link href="/user" className="btn btn-primary" onClick={() => setOpen(false)}>Войти</Link>*/}
                        <Link href="/user" className="btn btn-primary" onClick={() => setOpen(false)}>Войти</Link>



                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <GlobalModal />

        </>



    );
}
