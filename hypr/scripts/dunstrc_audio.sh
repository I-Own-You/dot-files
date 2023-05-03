mute () {
    killall dunst;
    wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle 

    audio_state=$(wpctl get-volume @DEFAULT_AUDIO_SINK@)

    if [[ $audio_state == *" [MUTED]"* ]]; then
        dunstify "Sound: OFF" 
    else
        dunstify "Sound: ON"
    fi
}

power_up () {
    killall dunst;

    wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 10%+

    audio_state=$(wpctl get-volume @DEFAULT_AUDIO_SINK@)

    dunstify "Volum: $audio_state" 
}

power_down () {
    killall dunst;

    wpctl set-volume -l 1.5 @DEFAULT_AUDIO_SINK@ 10%-

    audio_state=$(wpctl get-volume @DEFAULT_AUDIO_SINK@)

    dunstify "Volum: $audio_state" 
}

if [[ "$1" == "mute" ]]; then
    mute
elif [[ "$1" == "power_up" ]]; then
    power_up
elif [[ "$1" == "power_down" ]]; then
    power_down
fi
