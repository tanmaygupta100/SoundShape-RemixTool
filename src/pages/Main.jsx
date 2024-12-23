import React, { useState } from 'react';
import Card from '../components/card';
import Button from '../components/button';

const Main = () => {

    // Track button states:
    const [isAClicked, setIsAClicked] = useState(false);
    const [isBClicked, setIsBClicked] = useState(false);
    const [isCClicked, setIsCClicked] = useState(false);

    // Toggle button states:
    const handleAClick = () => setIsAClicked(!isAClicked);
    const handleBClick = () => setIsBClicked(!isBClicked);
    const handleCClick = () => setIsCClicked(!isCClicked);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="flex items-center justify-center
                w-[900px] h-[450px]">
                
                <Button
                    isClicked={isAClicked}
                    onClick={handleAClick}
                    color="orange" // Pass the color to button.js
                />
                <Button
                    isClicked={isBClicked}
                    onClick={handleBClick}
                    color="blue"
                />
                <Button
                    isClicked={isCClicked}
                    onClick={handleCClick}
                    color="green"
                />
            </Card>
        </div>
    );
};

export default Main;