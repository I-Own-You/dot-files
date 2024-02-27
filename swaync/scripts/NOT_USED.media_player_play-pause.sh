#!/bin/bash

playerctl play-pause
notify-send "$(playerctl status)"

# delete network-manager-applet package
