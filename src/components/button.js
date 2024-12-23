// Custom Button:

import React, { useState } from 'react';

const Button = ({ children, className, isClicked, onClick, color }) => {

    // Colour value that gets passed in when Button is called:
    const colorClass =
        color === 'blue' ? 'on-button-blue' :
        color === 'green' ? 'on-button-green' :
        'on-button-orange'; // Default is orange

    return (
        <button className={`
            custom-button
            ${isClicked ? colorClass : 'off-button'}
        `}
        onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;