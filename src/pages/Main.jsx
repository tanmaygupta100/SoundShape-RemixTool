import React, { useState } from 'react';
import Card from '../components/card';
import LedButton from '../components/LedButton';
import RegButton from '../components/RegButton';
import { ArrowDownTrayIcon} from '@heroicons/react/24/outline';

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
            <Card className="flex items-center justify-center space-x-10
                w-[900px] h-[450px]">
                
                <LedButton
                    isClicked={isAClicked}
                    onClick={handleAClick}
                    color="orange" // Pass the color to button.js
                    wid={100} hei={100}
                />
                <LedButton
                    isClicked={isBClicked}
                    onClick={handleBClick}
                    color="blue"
                    wid={100} hei={100}
                />
                <LedButton
                    isClicked={isCClicked}
                    onClick={handleCClick}
                    color="green"
                    wid={100} hei={100}
                />
                <RegButton
                    shape=""
                    wid={100} hei={100}
                >
                    <ArrowDownTrayIcon
                        className="text-cusTxt" width={40} opacity={0.6}
                    />
                </RegButton>

                <RegButton
                    shape='sqr'
                    wid={100} hei={100}
                />
                <RegButton
                    shape='dia'
                    wid={100} hei={100}
                />
            </Card>
        </div>
    );
};

export default Main;