// Custom Button:

import React, { useState } from 'react';

const Button = ({ children, className, isClicked, onClick }) => {

    return (
        <button className={`
            custom-button
            ${isClicked ? 'on-button-orange' : 'off-button'}
        `}
        onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;