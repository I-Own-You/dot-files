#!/bin/bash

wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 10%+
current_volume=$(wpctl get-volume @DEFAULT_AUDIO_SINK@)

notify-send "$current_volume"
