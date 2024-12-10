import pygame
from pydub import AudioSegment
import numpy as np
import io

def apply_reverb(audio, delay_ms=100, decay=0.5, repetitions=3):
    """
    Apply a simple reverb effect by delaying copies of the audio and decreasing their volume each time.
    """
    output = audio
    for i in range(repetitions):
        delay = AudioSegment.silent(duration=delay_ms)  # Delay (silence)
        delayed_audio = audio - (i * decay)  # Decrease volume for each repetition
        output = output.overlay(delayed_audio, position=i * delay_ms)  # Overlay the delayed audio
    return output

def toggle_reverb(state):
    state["reverb"] = not state["reverb"]
    
    if state["reverb"]:
        print("Reverb enabled (simulated reverb effect)")

        if state["track"]:  # Ensure a track is loaded
            # Load the track with PyDub
            audio = AudioSegment.from_file(state["track"])

            # Apply the reverb (simulated using delay)
            audio_with_reverb = apply_reverb(audio)

            # Convert the audio to a format that pygame.mixer can play
            audio_samples = np.array(audio_with_reverb.get_array_of_samples())
            audio_samples = audio_samples.astype(np.float32) / 32768.0  # Normalize to float
            audio_samples = (audio_samples * 32767).astype(np.int16)  # Convert back to int16 for playback
            
            # Save audio to temporary file for pygame to play
            temp_file = "temp_reverb_sound.wav"
            audio_with_reverb.export(temp_file, format="wav")

            # Play the reverb effect using pygame.mixer
            pygame.mixer.music.load(temp_file)
            pygame.mixer.music.play()

    else:
        print("Reverb disabled")

def toggle_white_noise(state):
    if state["white_noise_channel"] is None:
        state["white_noise_channel"] = pygame.mixer.Sound("white_noise.mp3")
        state["white_noise_channel"].play(loops=-1)  # loop white noise
        print("White noise enabled")
    else:
        state["white_noise_channel"].stop()
        state["white_noise_channel"] = None
        print("White noise disabled")