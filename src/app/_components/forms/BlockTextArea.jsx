'use client';
import React from 'react';

const BlockTextArea = ({name, placeholder}) => {
    return (
        <div className="custom-form">
            <div>{name}</div>
            <textarea placeholder={placeholder}/>
        </div>
    );
};

export default BlockTextArea;