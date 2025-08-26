import React from 'react';
import CircleProgressAnimated from "@/app/_components/CircleProgressAnimated";

const PageContact = () => {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div>
                    <CircleProgressAnimated
                        size={260}
                        strokeWidth={14}
                        color="#1e7b7b"
                        trackColor="#dde7ea"
                        duration={2500}   // 2.5 сек от 0 до 100
                        loop={true}       // крутится бесконечно
                    />
                </div>
            </div>
        </div>
    );
};

export default PageContact;