// Custom Button:

import React, { useState } from 'react';

const LedButton = ({ children, className, isClicked, onClick, color, wid, hei }) => {

    // Colour value that gets passed in when Button is called:
    const getButtonClass = () => {
        switch (color) {
            case 'orange':
                return isClicked ? 'on-button-orange' : 'off-button';
            case 'blue':
                return isClicked ? 'on-button-blue' : 'off-button';
            case 'green':
                return isClicked ? 'on-button-green' : 'off-button';
            default:
                return 'off-button'; // Default fallback for errors.
        }
    };

    return (
        <button
            className={`
                custom-button
                ${getButtonClass()}
            `}
            onClick={onClick}
            style={{ width: `${wid}px`, height: `${hei}px` }}
        >
            {children}
        </button>
    );
};

export default LedButton;