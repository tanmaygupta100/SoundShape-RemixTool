import React, { useState } from 'react';
import Card from '../components/card';
import LedButton from '../components/LedButton';
import RegButton from '../components/RegButton';
import { ArrowPathIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, BackwardIcon, ForwardIcon, PlayPauseIcon } from '@heroicons/react/16/solid';
import Trackbar from '../components/Trackbar';
import Slider from '../components/Slider';

const Main = () => {

    /* ------------ HANDLING UPLOAD LOGIC: ------------ */
    const [trackName, setTrackName] = useState(""); // Only saves track name.
    const [errorMessage, setErrorMessage] = useState("");
    const [audioFile, setAudioFile] = useState(null); // Audio file saving.
    
    const handleUpload = (file) => {
        if (!file) return;

        // Check if file type is not an MP3:
        if (file.type !== "audio/mp3") {
                    setErrorMessage("Only MP3 files are allowed.");
        }

        setErrorMessage(""); // Clearing any previous error messages.

        // Clear and replace an existing track if upload button is pressed again:
        if (audioFile || trackName) {
            setAudioFile(null);
            setTrackName("");
            console.log('File replaced with new upload');
        }
        
        // Creating new Audio object from uploaded file:
        const audio = new Audio(URL.createObjectURL(file));
            /*
                URL.createObjectURL(file) - Generates a temporary URL (blob URL) pointing to uploaded file.
                    The URL is binary data representing the file to be accesses by the browser.
                new Audio(blobURL) - Creates an HTMLAudioElement to play audio and even extract metadata.
            */
        audio.onloadedmetadata = () => {
            if (audio.duration > 300)
                setErrorMessage("Audio must be less than 5 minutes long.");
            else {
                setTrackName(file.name.replace(".mp3", ""));
                setAudioFile(audio); // Saves the Audio object.
                setErrorMessage("");
            }
        };
    };

    const playTrack = () => {
        if(!audioFile) {
            console.log("No audio.");
            return;
        }

        if (audioFile.paused) {
            audioFile.play(); // If paused, start playing.
            console.log("Audio playing.");
        }
        else {
            audioFile.pause(); // If playing, pause.
            console.log("Audio paused.");
        }
    };


    /* ------------ HANDLING UPLOAD LOGIC: ------------ */
    /* TODO: Add logic for resetting sliders and buttons */
    const clearTrack = () => {
        setTrackName("Reset");
        setTimeout( () => setTrackName(""), 1000 ); // Clear message after 1 second.
        setErrorMessage("");

        // If audio file exists in the audioFile variable:
        if (audioFile) {
            audioFile.pause(); // Stop playback.
            URL.revokeObjectURL(audioFile.src); // Releases memroy for the blob URL.
            setAudioFile(null); // Clears the Audio object.
        }
    }


    /* ------------ HANDLING LED BUTTON LOGIC: ------------ */
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

                {/* Top Left - Text */}
                <div className="absolute top-4 left-4 opacity-90 text-xs italic flex flex-col whitespace-normal">
                    RETROFICATION<br/>
                    SDSH-2.0<br/>
                    AUD-RMXR
                </div>

                {/* Top Right - Logo */}
                <div className="absolute top-4 right-4">
                    <div
                        className="relative w-12 h-12 bg-gradient-to-r from-pink-600 to-yellow-600 rounded-full"
                        style={{ boxShadow: 'inset 0px 0px 4px rgba(0, 0, 0, 0.9)' }}
                    >
                        {/* Horizontal lines: */}
                        <div className="absolute top-[55%] left-0 w-full h-1 bg-cusBg"></div>
                        <div className="absolute top-[72%] left-0 w-full h-1 bg-cusBg"></div>
                        <div className="absolute top-[86%] left-0 w-full h-1 bg-cusBg"></div>
                    </div>
                </div>

                {/* SDSH HEADER: */}
                <h1
                    className="heading-font text-xl opacity-90
                        absolute left-1/2 top-3 transform -translate-x-1/2 flex flex-col items-center"
                >
                    SOUNDSHAPE
                </h1>

                {/* SPEED button: */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                    <p className="mr-11 mb-1 opacity-90 font-semibold">SPEED</p>
                    <LedButton
                        isClicked={isAClicked}
                        onClick={handleAClick}
                        color="red" // Pass the color to button.js
                        wid={100} hei={100}
                        className='flex items-end justify-end'
                    />
                </div>
                {/* SPEED SLIDER: */}
                <div className="absolute left-4 bottom-24">
                    <Slider
                            min={-3} max={3} step={1} init={0}
                    />
                </div>
                <div
                    className="absolute left-36 bottom-5 flex flex-col items-end text-cusTxt opacity-60"
                    style={{ gap: `2.5rem`, transform: 'translateX(-0.5rem) translateY(-0.1rem)' }}
                >
                    <p>3</p>
                    <p>0</p>
                    <p>-3</p>
                </div>

                {/* REVERB button: */}
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                    <p className="mr-11 mb-1 opacity-90 font-semibold">REVERB</p>
                    <LedButton
                        isClicked={isBClicked}
                        onClick={handleBClick}
                        color="yellow"
                        wid={100} hei={100}
                    />
                </div>
                {/* REVERB SLIDER: */}
                <div className="absolute right-4 bottom-24">
                    <Slider
                            min={0} max={6} step={1} init={0}
                    />
                </div>
                <div
                    className="absolute right-36 bottom-6 flex flex-col items-end text-cusTxt opacity-60"
                    style={{ gap: `2.5rem`, transform: 'translateX(0.5rem) translateY(0.1rem)' }}
                >
                    <p>6</p>
                    <p>3</p>
                    <p>0</p>
                </div>
                
                {/* WHITE NOISE button: */}
                <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 flex flex-col items-center">
                    <p className="mb-1 opacity-90 font-semibold">WHITE NOISE</p>
                    <LedButton
                        isClicked={isCClicked}
                        onClick={handleCClick}
                        color="orange"
                        wid={100} hei={100}
                    />
                </div>

                {/* PLAY/PAUSE button: */}
                <div className="absolute left-1/2 top-48 transform -translate-x-1/2 flex flex-col items-center">
                    <RegButton
                        shape="dia"
                        wid={60} hei={60}
                        onClick={playTrack}
                    >
                        <PlayPauseIcon
                            className="text-cusTxt transform rotate-[-45deg]" width={40} opacity={0.8}
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
                            className="text-cusTxt" width={25} opacity={0.8}
                        />
                    </RegButton>
                    {/* Backward: */}
                    <RegButton
                        shape='cir'
                        wid={50} hei={50}
                    >
                        <ForwardIcon
                            className="text-cusTxt" width={25} opacity={0.8}
                        />
                    </RegButton>
                </div>

                {/* RELOAD & DOWNLOAD buttons: */}
                <div className="absolute left-1/2 top-64 transform -translate-x-1/2 flex flex-row items-center gap-x-28">
                    {/* Reload: */}
                    <RegButton
                        shape='sqr'
                        wid={40} hei={40}
                        onClick={clearTrack}
                    >
                        <ArrowPathIcon
                            className="text-cusTxt" width={25} opacity={0.8}
                        />
                    </RegButton>
                    {/* Download: */}
                    <RegButton
                        shape='sqr'
                        wid={40} hei={40}
                    >
                        <ArrowDownTrayIcon
                            className="text-cusTxt" width={25} opacity={0.8}
                        />
                    </RegButton>
                </div>

                {/* UPLOAD button and TRACKBAR: */}
                <div className="absolute left-1/2 top-14 transform -translate-x-1/2 flex flex-row items-center gap-x-3">
                    {/* UPLOAD: */}
                    <RegButton
                        shape='sqr'
                        wid={40} hei={40}
                        onClick={() => {
                            console.log("Upload button clicked");
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'audio/mp3';
                            input.onchange = (e) => handleUpload(e.target.files[0]);
                            input.click();
                        }}
                    >
                        <ArrowUpTrayIcon
                            className="text-cusTxt" width={25} opacity={0.8}
                        />
                    </RegButton>
                    {/* TRACKBAR: */}
                    <Trackbar
                        wid={500} hei={60}
                    >
                        <p className="track-font ml-3 text-4xl text-shadow"
                        >
                            {trackName.length > 25 ? trackName.slice(0,24) + '...' : trackName}
                        </p>
                    </Trackbar>
                </div>


                {/* ----------- ERROR message: ----------- */}
                {errorMessage && (
                    // If error exists, then display the div:
                    <div className= "absolute left-1/2 top-[90%] transform -translate-x-1/2 text-red-500 text-sm"
                    >
                        {errorMessage}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Main;