#!/bin/bash

echo "Installing required Python libraries on Mac..."

# Install libraries:
pip install pygame
pip install numpy

# Note: tkinter is part of the Python standard library
# For Mac, tkinter can be installed with Python through Homebrew if missing:
# brew install python-tk

echo "Installation complete!"