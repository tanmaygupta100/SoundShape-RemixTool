import tkinter as tk
import pygame

# Importing buttons:
from load_audio import load_audio
from play_pause import play_pause
from effects import toggle_reverb, toggle_white_noise, toggle_reverb_slowdown, toggle_reverb_spedup

# Initializing pygame mixer:
pygame.mixer.init()

def create_gui():
    root = tk.Tk()
    root.title("SoundShape")
    root.geometry("500x400")
    root.config(bg="#1e1e2f")  # Dark background

    # Fonts and styling
    button_font = ("Courier", 14, "bold")
    text_color = "#000000"  # Black text color

    # Initial shared state
    state = {
        "playing": False,
        "reverb": False,
        "reverb_slowdown": False,
        "reverb_spedup": False,
        "track": None,
        "speed": 1.0,
        "current_position": 0,
        "white_noise_channel": None,
    }

    # Toggle play/pause button label
    def toggle_play_pause():
        if state["playing"]:
            play_pause_button.config(text=">")
        else:
            play_pause_button.config(text="||")
        play_pause(state)

    # Button creation helper
    def create_button(text, command):
        return tk.Button(
            root,
            text=text,
            command=command,
            font=button_font,
            fg=text_color,
            relief="flat",
            height=2,
            width=20,
        )

    # Buttons and layout
    tk.Label(root, text="SoundShape", font=("Courier", 24, "bold"), fg="#ffffff", bg="#1e1e2f").pack(pady=20)  # Title in white

    create_button("Load Song", lambda: load_audio(state)).pack(pady=10)

    play_pause_button = tk.Button(
        root,
        text=">",
        command=toggle_play_pause,
        font=button_font,
        fg=text_color,
        relief="flat",
        height=2,
        width=5,
    )
    play_pause_button.pack(pady=10)

    speed_frame = tk.Frame(root, bg="#1e1e2f")
    create_button("Speed Up", lambda: toggle_reverb_spedup(state)).pack(
        side="right", padx=5, in_=speed_frame
    )
    create_button("Slow Down", lambda: toggle_reverb_slowdown(state)).pack(
        side="left", padx=5, in_=speed_frame
    )
    speed_frame.pack(pady=10)

    create_button("Reverberate", lambda: toggle_reverb(state)).pack(pady=10)
    create_button("White Noise", lambda: toggle_white_noise(state)).pack(pady=10)

    root.mainloop()

if __name__ == "__main__":
    create_gui()
