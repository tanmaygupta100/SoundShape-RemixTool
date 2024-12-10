import pygame
from pydub import AudioSegment
import numpy as np
import io

# Apply a reverb effect by delaying copies of the audio and decreasing their volume each time.
def apply_reverb(audio, delay_ms=100, decay=0.5, repetitions=3):
    output = audio
    for i in range(repetitions):
        delay = AudioSegment.silent(duration=delay_ms)  # Delay (silence).
        delayed_audio = audio - (i * decay)  # Decrease volume for each repetition.
        output = output.overlay(delayed_audio, position=i * delay_ms)  # Overlay the delayed audio.
    return output

def toggle_reverb(state):
    # Check if the song is playing before enabling reverb:
    if not state["playing"]:
        print("Can't toggle reverb. Song is not playing.")
        return

    state["reverb"] = not state["reverb"]

    if state["reverb"]:
        print("Reverb enabled (simulated reverb effect)")

        if state["track"]:  # Check if a track is loaded.
            # Pause the original song if it's playing:
            if state["playing"]:
                pygame.mixer.music.pause()
                state["playing"] = False

            # Track the current position:
            current_pos = pygame.mixer.music.get_pos()

            # Load the track and apply the reverb effect:
            audio = AudioSegment.from_file(state["track"])

            # Apply the reverb (simulated using delay):
            audio_with_reverb = apply_reverb(audio)

            # Convert the audio to a format that pygame.mixer can play:
            audio_samples = np.array(audio_with_reverb.get_array_of_samples())
            audio_samples = audio_samples.astype(np.float32) / 32768.0  # Normalize to float.
            audio_samples = (audio_samples * 32767).astype(np.int16)  # Convert back to int16 for playback.

            # Save audio to temporary file for pygame to play:
            temp_file = "temp_reverb_sound.wav"
            audio_with_reverb.export(temp_file, format="wav")

            # Play the reverb effect using pygame.mixer:
            pygame.mixer.music.load(temp_file)
            pygame.mixer.music.play()

            # Start playing from the current position where it was paused:
            pygame.mixer.music.set_pos(current_pos / 1000.0)  # Convert to seconds.
            state["playing"] = True

    else:
        print("Reverb disabled")

        if state["playing"]:
            pygame.mixer.music.pause()
            state["playing"] = False

            # Track the current position when reverb is disabled.
            current_pos = pygame.mixer.music.get_pos()

            # Re-load the original track (without reverb)
            pygame.mixer.music.load(state["track"])
            pygame.mixer.music.play()
            pygame.mixer.music.set_pos(current_pos / 1000.0)  # Convert to seconds.
            state["playing"] = True

def toggle_white_noise(state):
    if state["white_noise_channel"] is None:
        state["white_noise_channel"] = pygame.mixer.Sound("white_noise.mp3")
        state["white_noise_channel"].play(loops=-1)  # Loop white noise.
        print("White noise enabled")
    else:
        state["white_noise_channel"].stop()
        state["white_noise_channel"] = None
        print("White noise disabled")