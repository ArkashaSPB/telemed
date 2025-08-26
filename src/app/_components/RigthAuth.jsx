'use client';
import React from 'react';
import {Button} from "react-bootstrap";
import Link from "next/link";
import {useUserStore} from "@/store/userStore";

const RigthAuth = () => {

    const user = useUserStore((state) => state.user);
    const clearUser = useUserStore((state) => state.clearUser);

    const exitFunc  = () => {
        clearUser()
    }

    return (
        <div className="right-auth">
            <div className="auth-right ">
                <div className="auth-right__left"> <img src="/ico/profile.svg" alt="" />
                    <span>Добрый день, <br/> Кристина</span>
                </div>
                <div onClick={exitFunc}>
                    <img src="/ico/exit.svg" alt="" />
                </div>
            </div>
            <div className="bg-balans">Баланс 5000 ₽</div>
            <div className="d-grid"> <Button><span>Консультация</span></Button></div>
            <div className="d-grid"> <Link href="/history" className=" btn btn-outline-primary">
                <span>История</span></Link></div>
        </div>
    );
};

export default RigthAuth;