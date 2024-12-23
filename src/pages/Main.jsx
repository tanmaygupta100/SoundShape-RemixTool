import React, { useState } from 'react';
import Card from '../components/card';
import Button from '../components/button';

const Main = () => {

    const [isBClicked, setIsBClicked] = useState(false); // Track button state.
    const handleBClick = () => {
        setIsBClicked(!isBClicked); // Toggle state of button.
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="flex items-center justify-center
                w-[900px] h-[450px]">
                <Button
                    isClicked={isBClicked} onClick={handleBClick}
                    className
                />
            </Card>
        </div>
    );
};

export default Main;