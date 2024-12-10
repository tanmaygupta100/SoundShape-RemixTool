import pygame

def toggle_reverb(state):
    # Toggle reverb effect (delay and volume reduction):
    state["reverb"] = not state["reverb"]
    if state["reverb"]:
        print("Reverb enabled (basic echo effect)")
        # Start a delayed echo effect:
        if state["track"]:  # check if there's a track loaded.
            state["echo_sound"] = pygame.mixer.Sound(state["track"])
            state["echo_sound"].play(maxtime=1000, loops=-1)  # loop the echo sound.

            # Decrease volume gradually for echo effect:
            state["echo_sound"].set_volume(0.3)  # 30% volume for the echo.
    else:
        print("Reverb disabled")
        # Stop the echo sound:
        if "echo_sound" in state and state["echo_sound"]:
            state["echo_sound"].stop()

def toggle_white_noise(state):
    if state["white_noise_channel"] is None:
        state["white_noise_channel"] = pygame.mixer.Sound("white_noise.mp3")
        state["white_noise_channel"].play(loops=-1)  # loop white noise
        print("White noise enabled")
    else:
        state["white_noise_channel"].stop()
        state["white_noise_channel"] = None
        print("White noise disabled")