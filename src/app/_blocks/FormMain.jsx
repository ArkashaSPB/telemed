'use client';
import React, {useState} from 'react';

import BlockInput from "@/app/_components/forms/BlockInput";
import PhoneInput from "@/app/_components/forms/PhoneInput";
import BlockTextArea from "@/app/_components/forms/BlockTextArea";
import {Button, FormCheck} from "react-bootstrap";


const FormMain = () => {


    const [phone, setPhone] = useState('+7 ');
    return (
        <div className="d-flex gap-3 flex-column">
            <BlockInput name="Имя"  placeholder="Иван Николаевич"/>

            <PhoneInput name="Телефон"   value={phone} onDigitsChange={(d) => setPhone('+7 ' + d)}/>

            <BlockInput name="Почта"  placeholder="mail@mail.ru"/>

            <BlockTextArea name="Комментарий"  placeholder="Введите текст"/>

            <div className="block-submit ">
                <div className="block-submit__button"><Button> <span>Отправить</span></Button></div>
                <div className="block-submit__check">
                    <div>
                        <FormCheck/>
                    </div>
                    <div className="info-check">
                        Нажимая на кнопку, вы соглашаетесь на обработку персональных данных и условия использования сервиса
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormMain;