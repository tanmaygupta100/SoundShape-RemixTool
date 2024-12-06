# Placeholder:
def speed_up(state):
    state["speed_factor"] += 0.1
    print(f"Speed increased to {state['speed_factor']}x")

def slow_down(state):
    state["speed_factor"] -= 0.1
    print(f"Speed decreased to {state['speed_factor']}x")