'use client';
import React, {useState} from 'react';
import BlockInput from "@/app/_components/forms/BlockInput";
import PhoneInput from "@/app/_components/forms/PhoneInput";
import {Button, FormCheck, FormControl} from "react-bootstrap";
import { useRouter } from "next/navigation";
const FormServices = ({code}) => {

    const [phone, setPhone] = useState('+7 ');
    const router = useRouter();
    const handleStart = () => {
        router.push(`/services/${code}/quiz`);

    };
    return (
        <div className="d-flex flex-column gap-3">
            <BlockInput name="Имя"  placeholder="Иван Николаевич"/>
            <BlockInput name="Почта"  placeholder="Иван Николаевич"/>
            <PhoneInput name="Телефон"   value={phone} onDigitsChange={(d) => setPhone('+7 ' + d)}/>
            <div className="sog-form-service">
                <div className="sog-form-service__left">
                    <div className="sog-form-service__button">
                        <Button onClick={handleStart}><span>Начать</span></Button>
                    </div>
                </div>
                <div className="sog-form-service__right">
                    <FormCheck type="checkbox"></FormCheck>
                    <div className="info-check" >Нажимая на кнопку, вы соглашаетесь на обработку персональных данных и условия использования сервиса</div>
                </div>
            </div>
        </div>
    );
};

export default FormServices;