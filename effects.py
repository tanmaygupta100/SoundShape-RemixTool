import pygame

def toggle_reverb(state):
    state["reverb"] = not state["reverb"]
    print(f"Reverb {'enabled' if state['reverb'] else 'disabled'}")

def toggle_white_noise(state):
    if state["white_noise_channel"] is None:
        state["white_noise_channel"] = pygame.mixer.Sound("white_noise.mp3")
        state["white_noise_channel"].play(loops=-1)  # loop white noise
        print("White noise enabled")
    else:
        state["white_noise_channel"].stop()
        state["white_noise_channel"] = None
        print("White noise disabled")