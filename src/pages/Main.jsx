import React, { useState } from 'react';
import Card from '../components/card';
import Button from '../components/button';

const Main = () => {

    const [isAClicked, setIsAClicked] = useState(false);  // Song Play
    const [isBClicked, setIsBClicked] = useState(false);  // Song Pause
    const [isCClicked, setIsCClicked] = useState(false);  // Song Skip
  
    // Handle Button Clicks
    const handleAClick = () => {
        setIsAClicked(!isAClicked);
            if (!isAClicked) {
            console.log("Song is playing");
        } else {
            console.log("Song is not playing");
        }
    };
  
    const handleBClick = () => {
        setIsBClicked(!isBClicked);
            if (!isBClicked) {
            console.log("Song is paused");
        } else {
            console.log("Song is not paused");
        }
    };
  
    const handleCClick = () => {
        setIsCClicked(!isCClicked);
            if (!isCClicked) {
            console.log("Song skipped");
        } else {
            console.log("Song not skipped");
        }
    };

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