#!/bin/bash

# Check if rofi is already running
if pgrep -x "rofi" > /dev/null
then
    pkill rofi
else
    rofi -show combi -modes combi -combi-modes "window,drun,run"
fi
