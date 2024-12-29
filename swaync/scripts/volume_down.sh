#!/bin/bash

wpctl set-volume @DEFAULT_AUDIO_SINK@ 10%-
current_volume=$(wpctl get-volume @DEFAULT_AUDIO_SINK@)

notify-send "$current_volume"
