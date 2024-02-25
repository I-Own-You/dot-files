#!/bin/bash

wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle
current_volume=$(wpctl get-volume @DEFAULT_AUDIO_SINK@)
if [[ $current_volume =~ \[MUTED\] ]]; then
  notify-send "Audio: Off"
else
  notify-send "Audio: Onn"
fi
