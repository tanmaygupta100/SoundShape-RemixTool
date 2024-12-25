import React, { useState } from 'react';
import Card from '../components/card';
import LedButton from '../components/LedButton';
import RegButton from '../components/RegButton';
import { ArrowDownTrayIcon} from '@heroicons/react/24/outline';
import { ArrowPathIcon, BackwardIcon, ForwardIcon, PlayPauseIcon } from '@heroicons/react/16/solid';

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
            <Card className="relative w-[900px] h-[500px]">

                {/* SDSH HEADER: */}
                <h1
                    className="heading-font text-xl opacity-80
                        absolute left-1/2 top-3 transform -translate-x-1/2 flex flex-col items-center"
                >
                    SOUNDSHAPE
                </h1>

                {/* SPEED button: */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                    <p className="mr-11 mb-1 opacity-80 font-semibold">SPEED</p>
                    <LedButton
                        isClicked={isAClicked}
                        onClick={handleAClick}
                        color="orange" // Pass the color to button.js
                        wid={100} hei={100}
                        className='flex items-end justify-end'
                    />
                </div>

                {/* REVERB button: */}
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                    <p className="mr-11 mb-1 opacity-80 font-semibold">REVERB</p>
                    <LedButton
                        isClicked={isBClicked}
                        onClick={handleBClick}
                        color="green"
                        wid={100} hei={100}
                    />
                </div>
                {/* WHITE NOISE button: */}
                <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex flex-col items-center">
                    <p className="mb-1 opacity-80 font-semibold">WHITE NOISE</p>
                    <LedButton
                        isClicked={isCClicked}
                        onClick={handleCClick}
                        color="blue"
                        wid={100} hei={100}
                    />
                </div>

                {/* PLAY/PAUSE button: */}
                <div className="absolute left-1/2 top-48 transform -translate-x-1/2 flex flex-col items-center">
                    <RegButton
                        shape="dia"
                        wid={60} hei={60}
                    >
                        <PlayPauseIcon
                            className="text-cusTxt transform rotate-[-45deg]" width={40} opacity={0.6}
                        />
                    </RegButton>
                </div>

                {/* FORWARD/BACKWARD buttons: */}
                <div className="absolute left-1/2 top-36 transform -translate-x-1/2 flex flex-row items-center gap-x-32">
                    {/* Forward: */}
                    <RegButton
                        shape='cir'
                        wid={50} hei={50}
                    >
                        <BackwardIcon
                            className="text-cusTxt" width={25} opacity={0.6}
                        />
                    </RegButton>
                    {/* Backward: */}
                    <RegButton
                        shape='cir'
                        wid={50} hei={50}
                    >
                        <ForwardIcon
                            className="text-cusTxt" width={25} opacity={0.6}
                        />
                    </RegButton>
                </div>

                {/* RELOAD & DOWNLOAD buttons: */}
                <div className="absolute left-1/2 top-64 transform -translate-x-1/2 flex flex-row items-center gap-x-28">
                    {/* Reload: */}
                    <RegButton
                        shape='sqr'
                        wid={40} hei={40}
                    >
                        <ArrowPathIcon
                            className="text-cusTxt" width={25} opacity={0.6}
                        />
                    </RegButton>
                    {/* Download: */}
                    <RegButton
                        shape='sqr'
                        wid={40} hei={40}
                    >
                        <ArrowDownTrayIcon
                            className="text-cusTxt" width={25} opacity={0.7}
                        />
                    </RegButton>
                </div>
            </Card>
        </div>
    );
};

export default Main;