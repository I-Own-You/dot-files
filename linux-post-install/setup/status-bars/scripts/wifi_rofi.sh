#!/bin/bash

dir="$HOME/.config/rofi/launchers/type-4"
theme='style-4'

SSID=$(nmcli -t -f SSID dev wifi | rofi -dmenu -p "Wi-Fi" -theme ${dir}/${theme}.rasi)
if [ -n "$SSID" ]; then
    PASS=$(rofi -dmenu -password -p "Password for $SSID" -theme ${dir}/${theme}.rasi)
    nmcli connection add type wifi ifname wlan0 con-name "$SSID" ssid "$SSID" wifi-sec.key-mgmt wpa-psk wifi-sec.psk "$PASS"
    nmcli connection up "$SSID"
fi
