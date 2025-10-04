#!/bin/bash

LAN_IF="enp8s0"
WIFI_IF="wlan0"

LAN_STATE=$(nmcli device status | grep "^$LAN_IF" | awk '{print $3}')

if [ "$LAN_STATE" == "connected" ]; then
    echo " LAN"
else
    WIFI_STATE=$(nmcli device status | grep "^$WIFI_IF" | awk '{print $3}')
    if [ "$WIFI_STATE" == "connected" ]; then
        # Wi-Fi connected
        SSID=$(nmcli -t -f active,ssid dev wifi | grep '^yes' | cut -d: -f2)
        SIGNAL=$(nmcli -t -f active,signal dev wifi | grep '^yes' | cut -d: -f2)
        echo " $SSID ($SIGNAL%)"
    else
        echo ""
    fi
fi

