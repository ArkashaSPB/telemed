"use client";

import { Modal, Button } from "react-bootstrap";
import { useUIStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import BlockInput from "@/app/_components/forms/BlockInput";

export default function GlobalModal() {
    const { isModalOpen, closeModal } = useUIStore();
    const { setUser } = useUserStore();
    const handleSubmit = () => {
        // тут можно вместо "захардкоженного" id взять данные из формы
        setUser({ id: 1, name: "Kristina" });
        closeModal();
    };

    return (
        <Modal
            show={isModalOpen}
            onHide={closeModal}
            centered
            contentClassName="form-modal"
        >
            <Modal.Header closeButton />
            <Modal.Body>
                <h2 className="text-center">Авторизация</h2>
                <p>Любой логин и пароль</p>
                <div className="d-flex gap-3 flex-column">
                    <BlockInput name="Логин" placeholder="Логин" />
                    <BlockInput name="Пароль" placeholder="Пароль" />
                    <Button variant="primary" onClick={handleSubmit}>
                        <span>Отправить</span>
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
