// src/app/_components/Footer.js
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer__bg" />

            <div className="container position-relative">
                        <div className="footer-logo">
                            <Link href="/">
                                <img src="/logo2.png" alt="Здравотех"   />
                            </Link>
                        </div>


                        <div className="footer-grid">
                            <div className="footer-grid__one">
                                <div className="d-flex flex-column  gap-1 gap-lg-4 color-footer-niz">
                                    <div>© 2015-2025 ЗдравоТех. Все права защищены</div>
                                    <div>
                                        ООО {"Здравотех"}  <br/>ИНН 7734666622
                                    </div>
                                </div>

                            </div>
                            <div className="footer-grid__to">
                                <div className="d-flex flex-column gap-1 gap-lg-3 align-items-sm-center align-items-md-start footer-text-bold">
                                    <div className="pb-3 pb-xl-0">Обработка заявок 24/7</div>
                                    <div>info@zdravotech.ru</div>
                                    <div><a href="tel:88009999999">8 (800) 999-99-99</a></div>
                                    <div>пн-вс с 8:00 до 20:00</div>
                                </div>
                            </div>

                            <div className="footer-grid__thri">
                                <div className="d-flex gap-4 flex-column ">
                                    <div><a className="link-footer" href="#">Политика конфиденциальности</a></div>
                                    <div><a  className="link-footer"  href="#">Политика в отношении обработки персональных данных</a></div>
                                </div>
                            </div>

                            <div className="footer-grid__for">
                                <div className="d-flex gap-4 flex-column ">
                                    <div><a  className="link-footer" href="#">Условия использования сервиса</a></div>
                                    <div><a  className="link-footer" href="#">Согласие на обработку персональных данных</a></div>
                                </div>

                            </div>
                        </div>



            </div>

            {/* Нижняя плашка */}
            <div className="site-footer__bar">
                <div className="text-center py-2 bg-footer-niz">
                    <span className="art-link">Создание сайта — <a href="https://artfactor.ru" >АртФактор</a></span>
                </div>
            </div>
        </footer>
    );
}
