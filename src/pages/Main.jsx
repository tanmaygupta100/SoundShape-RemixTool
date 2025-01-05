import React, { useState } from 'react';
import Card from '../components/card';
import LedButton from '../components/LedButton';
import RegButton from '../components/RegButton';
import { ArrowPathIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, BackwardIcon, ForwardIcon, PlayPauseIcon } from '@heroicons/react/16/solid';
import Trackbar from '../components/Trackbar';
import Slider from '../components/Slider';

const Main = () => {

    /* ------------ HANDLING UPLOAD LOGIC: ------------ */
    const [audioData, setAudioData] = useState( { myFile: null, myAudio: null, myName: "" } );
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleUpload = (myFile) => {
        if (!myFile) return;

        // Check if file type is not an MP3:
        if (myFile.type !== "audio/mp3") {
            setErrorMessage("Only MP3 files are allowed.");
        }

        setErrorMessage(""); // Clearing any previous error messages.

        // Clear and replace an existing track if upload button is pressed again:
            /* Can't just check for "if (audioData)" because this would check if the object exists,
                regardless of if it's properties are null or not. */
        // More future-proof than this:
            // "if ([audioData.myFile, audioData.myAudio, audioData.myName])"
        if (Object.values(audioData).some(value => value)) {
            setAudioData( { myFile: null, myAudio: null, myName: "" } );
            console.log('File replaced with new upload');
        }
        
        // Creating new Audio object from uploaded file:
        const myAudio = new Audio(URL.createObjectURL(myFile));
            /*
                URL.createObjectURL(file) - Generates a temporary URL (blob URL) pointing to uploaded file.
                    The URL is binary data representing the file to be accesses by the browser.
                new Audio(blobURL) - Creates an HTMLAudioElement to play audio and even extract metadata.
            */
        myAudio.onloadedmetadata = () => {
            if (myAudio.duration > 300)
                setErrorMessage("Audio must be less than 5 minutes long.");
            else {
                setAudioData({
                    myFile: myFile,
                    myAudio: myAudio,
                    myName: myFile.name.replace(/\.mp3$/, "")
                });
                setErrorMessage("");
                console.log(`Uploaded '${myFile.name}'.`);
                    // audioData.myName doesn't work, because it references something not set yet.
            }
        };
    };


    /* ------------ HANDLING PLAYING/PAUSING LOGIC: ------------ */
    const playTrack = () => {
        if(!audioData.myAudio) {
            console.log("No audio.");
            return;
        }

        if (audioData.myAudio.paused) {
            audioData.myAudio.play(); // If paused, start playing.
            console.log("Audio playing.");
        }
        else {
            audioData.myAudio.pause(); // If playing, pause.
            console.log("Audio paused.");
        }
    };


    /* ------------ HANDLING BACKWARD/FORWARD LOGIC: ------------ */
    const changeTime = (direction) => {
        if (!audioData.myAudio) { return }; // Check if data exists.

        // Change time based on given direction by button:
        let newTime = audioData.myAudio.currentTime + (direction === 'backward' ? -5 : 5);
        if (newTime < 0) // Don't let time go below 0.
            newTime = 0;
        if (newTime > audioData.myAudio.duration) // Don't let time exceed end.
            newTime = audioData.myAudio.duration;
        
        audioData.myAudio.currentTime = newTime; // Update to current time.
        console.log(`Audio time adjusted: ${newTime}`);
    };


    /* ------------ HANDLING UPLOAD LOGIC: ------------ */
    /* TODO: Add logic for resetting sliders and buttons */
    const clearTrack = () => {
        setAudioData({ myFile: null, myAudio: null, myName: "" });
        setErrorMessage("");

        // If audio file exists in the audioFile variable:
        if (audioData.myAudio) {
            audioData.myAudio.pause(); // Stop playback.
            URL.revokeObjectURL(audioData.myAudio.src); // Releases memroy for the blob URL.
        }
    };


    /* ------------ HANDLING DOWNLOAD LOGIC: ------------ */
    const downloadTrack = () => {

    }


    /* ------------------------------ HANDLING LED BUTTON LOGIC: ------------------------------ */
    const [isAClicked, setIsAClicked] = useState(false);  // 
    const [isBClicked, setIsBClicked] = useState(false);  // 
    const [whiteNoiseEnabled, setWhiteNoiseEnabled] = useState(false);  // 
  
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

    /* ------ HANDLE WHITE NOISE ------ */
    const handleWhiteNoise = () => {
        const audio = document.getElementById('vinylAudio'); // Get the audio element by ID.
        if (whiteNoiseEnabled) { // Pause if currently playing.
            audio.pause();
            console.log('White noise enabled.');
        } else { // Play if currently paused.
            audio.play();
            console.log('White noise disabled.');
        }
        setWhiteNoiseEnabled(!whiteNoiseEnabled); // Toggle the state.
    };


    /*----------------------------------------------------------------------------------------------------------------------------*/


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
                        isClicked={whiteNoiseEnabled}
                        onClick={handleWhiteNoise}
                        color="orange"
                        wid={100} hei={100}
                    />
                </div>
                <audio id="vinylAudio" loop>
                    <source src="/audio/vinyl_white_noise.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>

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

                {/* BACKWARD/FORWARD buttons: */}
                <div className="absolute left-1/2 top-36 transform -translate-x-1/2 flex flex-row items-center gap-x-32">
                    {/* BACKWARD: */}
                    <RegButton
                        shape='cir'
                        wid={50} hei={50}
                        onClick={ () => changeTime('backward') }
                    >
                        <BackwardIcon
                            className="text-cusTxt" width={25} opacity={0.8}
                        />
                    </RegButton>
                    {/* FORWARD: */}
                    <RegButton
                        shape='cir'
                        wid={50} hei={50}
                        onClick={ () => changeTime('forward') }
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
                            {audioData.myName.length > 25 ? audioData.myName.slice(0,24) + '...' : audioData.myName}
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