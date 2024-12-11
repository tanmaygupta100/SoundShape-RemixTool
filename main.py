import tkinter as tk
from tkinter import filedialog
import pygame

# Importing buttons:
from load_audio import load_audio
from play_pause import play_pause
from effects import toggle_reverb, toggle_white_noise, toggle_reverb_slowdown, toggle_reverb_spedup

# Initializing pygame mixer:
pygame.mixer.init()

def create_gui():
    root = tk.Tk() # root window
    root.title("SoundShape")

    # Initial shared state (passed to other functions):
    state = {
        "playing": False,           # Track if the song is playing
        "reverb": False,            # Track if reverb is enabled
        "reverb_slowdown": False,   # Track if slowed reverb is enabled
        "reverb_spedup": False,     # Track if sped up reverb is enabled
        "track": None,              # Store the track filename
        "speed": 1.0,               # Initialize the speed key at normal speed (1x)
        "current_position": 0,      # Current position of the song (in milliseconds)
        "white_noise_channel": None
    }

    # "Load Song" button:
    tk.Button(root, text="Load Song", command=lambda: load_audio(state)).pack()

    # "Play/Pause" button:
    tk.Button(root, text="Play/Pause", command=lambda: play_pause(state)).pack()

    # Speed buttons:
    speed_frame = tk.Frame(root)
    tk.Button(speed_frame, text="Speed Up", command=lambda: toggle_reverb_spedup(state)).pack(side="right")
    tk.Button(speed_frame, text="Slow Down", command=lambda: toggle_reverb_slowdown(state)).pack(side="left")
    speed_frame.pack()

    # Effect buttons:
    tk.Button(root, text="Reverberate", command=lambda: toggle_reverb(state)).pack()
    tk.Button(root, text="White Noise", command=lambda: toggle_white_noise(state)).pack()

    root.mainloop()

if __name__ == "__main__":
    create_gui()