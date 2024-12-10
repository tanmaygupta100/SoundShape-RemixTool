#!/bin/bash

echo "Installing required Python libraries on Raspberry Pi..."

# Install system dependencies for sounddevice
sudo apt install -y libportaudio2

# Install libraries via pip
pip install pygame
pip install numpy

# Note: tkinter is pre-installed with Python on Raspberry Pi
# If tkinter is missing, install it via apt:
sudo apt install -y python3-tk

echo "Installation complete!"