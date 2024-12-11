import pygame
from pydub import AudioSegment
import numpy as np

# Apply a reverb effect by adding delayed audio with reduced volume
def apply_reverb(audio, delay_ms=300, decay=0.5, repetitions=1):
    output = audio
    for i in range(repetitions):
        delay = AudioSegment.silent(duration=delay_ms)  # Create silence for delay
        delayed_audio = audio - (i * decay)  # Decrease volume for each repetition
        output = output.overlay(delayed_audio, position=i * delay_ms)  # Overlay delayed audio
    return output

# Slow down the audio by adjusting its frame rate
def slow_down_audio(audio, speed_factor=0.8):
    slowed_audio = audio._spawn(audio.raw_data, overrides={
        "frame_rate": int(audio.frame_rate * speed_factor)  # Adjust frame rate for slowdown
    })
    slowed_audio = slowed_audio.set_frame_rate(audio.frame_rate)  # Normalize back to original frame rate
    return slowed_audio

# Speed up the audio by adjusting its frame rate
def speed_up_audio(audio, speed_factor=1.2):
    spedup_audio = audio._spawn(audio.raw_data, overrides={
        "frame_rate": int(audio.frame_rate * speed_factor)  # Adjust frame rate for speedup
    })
    spedup_audio = spedup_audio.set_frame_rate(audio.frame_rate)  # Normalize back to original frame rate
    return spedup_audio

# Toggle reverb without changing the playback speed
def toggle_reverb(state):
    if not state["playing"]:
        print("Can't toggle reverb. Song is not playing.")
        return

    state["reverb"] = not state["reverb"]

    if state["reverb"]:
        print("Reverb enabled")

        if state["track"]:  # Ensure a track is loaded
            # Pause the song if it's currently playing
            if state["playing"]:
                pygame.mixer.music.pause()
                state["playing"] = False

            current_pos = pygame.mixer.music.get_pos()  # Track the current position

            # Load the track and apply reverb
            audio = AudioSegment.from_file(state["track"])
            audio_with_reverb = apply_reverb(audio)

            # Convert audio to pygame compatible format
            audio_samples = np.array(audio_with_reverb.get_array_of_samples())
            audio_samples = audio_samples.astype(np.float32) / 32768.0  # Normalize to float
            audio_samples = (audio_samples * 32767).astype(np.int16)  # Convert back to int16

            # Save the modified audio to a temporary file
            temp_file = "temp_reverb_sound.wav"
            audio_with_reverb.export(temp_file, format="wav")

            # Load and play the modified audio
            pygame.mixer.music.load(temp_file)
            pygame.mixer.music.play()

            # Set the playback position to the previous point
            pygame.mixer.music.set_pos(current_pos / 800.0)  # Convert to seconds
            state["playing"] = True

    else:
        print("Reverb disabled")

        if state["playing"]:
            pygame.mixer.music.pause()
            state["playing"] = False

            current_pos = pygame.mixer.music.get_pos()

            # Re-load the original track (without reverb)
            pygame.mixer.music.load(state["track"])
            pygame.mixer.music.play()
            pygame.mixer.music.set_pos(current_pos / 800.0)
            state["playing"] = True

# Toggle reverb with slowdown effect
def toggle_reverb_slowdown(state):
    if not state["playing"]:
        print("Can't toggle reverb with slowdown. Song is not playing.")
        return

    state["reverb_slowdown"] = not state["reverb_slowdown"]

    if state["reverb_slowdown"]:
        print("Reverb with slowdown enabled")

        if state["track"]:  # Ensure a track is loaded
            # Pause the song if it's currently playing
            if state["playing"]:
                pygame.mixer.music.pause()
                state["playing"] = False

            current_pos = pygame.mixer.music.get_pos()  # Track the current position

            # Load the track, slow it down, and apply reverb
            audio = AudioSegment.from_file(state["track"])
            slowed_audio = slow_down_audio(audio)
            audio_with_reverb = apply_reverb(slowed_audio)

            # Convert audio to pygame compatible format
            audio_samples = np.array(audio_with_reverb.get_array_of_samples())
            audio_samples = audio_samples.astype(np.float32) / 32768.0
            audio_samples = (audio_samples * 32767).astype(np.int16)

            # Save the modified audio to a temporary file
            temp_file = "temp_reverb_sound_slowed.wav"
            audio_with_reverb.export(temp_file, format="wav")

            # Load and play the modified audio
            pygame.mixer.music.load(temp_file)
            pygame.mixer.music.play()

            # Adjust the playback position considering the slowdown
            adjusted_pos = current_pos / 1000.0 / 0.8  # Slowdown factor is 0.8
            pygame.mixer.music.set_pos(adjusted_pos)
            state["playing"] = True

    else:
        print("Reverb with slowdown disabled")

        if state["playing"]:
            pygame.mixer.music.pause()
            state["playing"] = False

            current_pos = pygame.mixer.music.get_pos()

            # Re-load the original track (without reverb)
            pygame.mixer.music.load(state["track"])
            pygame.mixer.music.play()
            adjusted_pos = current_pos / 1000.0 / 0.8
            pygame.mixer.music.set_pos(adjusted_pos)
            state["playing"] = True

# Toggle reverb with sped-up audio effect
def toggle_reverb_spedup(state):
    if not state["playing"]:
        print("Can't toggle reverb with sped-up audio. Song is not playing.")
        return

    state["reverb_spedup"] = not state["reverb_spedup"]

    if state["reverb_spedup"]:
        print("Reverb with sped-up audio enabled")

        if state["track"]:  # Ensure a track is loaded
            # Pause the song if it's currently playing
            if state["playing"]:
                pygame.mixer.music.pause()
                state["playing"] = False

            current_pos = pygame.mixer.music.get_pos()  # Track the current position

            # Load the track, speed it up, and apply reverb
            audio = AudioSegment.from_file(state["track"])
            spedup_audio = speed_up_audio(audio)
            audio_with_reverb = apply_reverb(spedup_audio)

            # Convert audio to pygame compatible format
            audio_samples = np.array(audio_with_reverb.get_array_of_samples())
            audio_samples = audio_samples.astype(np.float32) / 32768.0
            audio_samples = (audio_samples * 32767).astype(np.int16)

            # Save the modified audio to a temporary file
            temp_file = "temp_reverb_sound_spedup.wav"
            audio_with_reverb.export(temp_file, format="wav")

            # Load and play the modified audio
            pygame.mixer.music.load(temp_file)
            pygame.mixer.music.play()

            # Adjust the playback position considering the speedup
            adjusted_pos = current_pos / 1000.0 / 1.2  # Speedup factor is 1.2
            pygame.mixer.music.set_pos(adjusted_pos)
            state["playing"] = True

    else:
        print("Reverb with sped-up audio disabled")

        if state["playing"]:
            pygame.mixer.music.pause()
            state["playing"] = False

            current_pos = pygame.mixer.music.get_pos()

            # Re-load the original track (without reverb)
            pygame.mixer.music.load(state["track"])
            pygame.mixer.music.play()
            adjusted_pos = current_pos / 1000.0 / 1.2
            pygame.mixer.music.set_pos(adjusted_pos)
            state["playing"] = True

# Toggle white noise
def toggle_white_noise(state):
    if state["white_noise_channel"] is None:
        state["white_noise_channel"] = pygame.mixer.Sound("white_noise.mp3")
        state["white_noise_channel"].play(loops=-1)  # Play white noise in a loop
        print("White noise enabled")
    else:
        state["white_noise_channel"].stop()
        state["white_noise_channel"] = None
        print("White noise disabled")