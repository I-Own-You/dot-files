#!/bin/bash

vol=$(amixer get Master | awk -F'[][]' '/%/ { print $2; exit }' | tr -d '%')
mute=$(amixer get Master | grep '\[off\]')
icon=""

[ "$mute" ] && icon=""

# Define thresholds (in %)
warn=70
crit=90

# Decide color based on volume and mute state
if [ "$mute" ]; then
    color="#7B6FA4"  # muted: dark purple (dimmer)
elif [ "$vol" -ge "$crit" ]; then
    color="#E06C75"  # critical: muted rose red
elif [ "$vol" -ge "$warn" ]; then
    color="#E5C38F"  # warning: warm golden yellow (adjusted a bit warmer)
else
    color="#61AFEF"  # okay: soft sky blue
fi

echo "$icon $vol%"
echo "$icon $vol%"
echo "$color"
