import tkinter as tk
from tkinter import filedialog
import pygame

# Importing buttons:
from load_audio import load_audio
from play_pause import play_pause
from speed_control import speed_up, slow_down
from effects import toggle_reverb, toggle_white_noise

# Initializing pygame mixer:
pygame.mixer.init()

def create_gui():
    root = tk.Tk() # root window
    root.title("Audio Player")

    # Initial shared state (passed to other functions):
    state = {"track": None, "playing": False, "speed_factor": 1.0, "reverb": False, "white_noise_channel": None}

    # "Load Song" button:
    tk.Button(root, text="Load Song", command=lambda: load_audio(state)).pack()

    # "Play/Pause" button:
    tk.Button(root, text="Play/Pause", command=lambda: play_pause(state)).pack()

    # Speed buttons:
    speed_frame = tk.Frame(root)
    tk.Button(speed_frame, text="Speed Up", command=lambda: speed_up(state)).pack(side="left")
    tk.Button(speed_frame, text="Slow Down", command=lambda: slow_down(state)).pack(side="left")
    speed_frame.pack()

    # Effect buttons:
    tk.Button(root, text="Reverberate", command=lambda: toggle_reverb(state)).pack()
    tk.Button(root, text="White Noise", command=lambda: toggle_white_noise(state)).pack()

    root.mainloop()

if __name__ == "__main__":
    create_gui()