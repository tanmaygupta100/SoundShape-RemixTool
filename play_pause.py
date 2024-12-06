import pygame

def play_pause(state):
    if state["track"] is None:
        print("No track loaded!")
        return

    if state["playing"]:
        pygame.mixer.music.pause()
        state["playing"] = False
        print("Paused track.")
    else:
        if pygame.mixer.music.get_pos() == -1: # song not started
            pygame.mixer.music.play() #start from the beginning
            print("Playing track from the beginning.")
        else:
            pygame.mixer.music.unpause() # resume from pause
            print("Resumed track.")
        state["playing"] = True