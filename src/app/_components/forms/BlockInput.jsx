'use client';
import React from 'react';

const BlockInput = ({name, placeholder}) => {
    return (
        <div className="custom-form">
            <div>{name}</div>
            <input  type="text" placeholder={placeholder}/>
        </div>
    );
};

export default BlockInput;