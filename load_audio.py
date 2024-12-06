from tkinter import filedialog
import pygame

def load_audio(state):
    filepath = filedialog.askopenfilename()
    if filepath:
        pygame.mixer.music.load(filepath)
        state["track"] = filepath
        print(f"Loaded track: {filepath}")