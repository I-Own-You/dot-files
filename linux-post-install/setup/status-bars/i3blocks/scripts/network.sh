#!/bin/bash

# Define icons
LAN_ICON=""
WIFI_ICON=""
DISCON_ICON=""

# Colors
LAN_COLOR="#EBCB8B"
WIFI_COLOR="#81A1C1"
DISCON_COLOR="#BF616A"

# Function to get IP of an interface
get_ip() {
    ip addr show "$1" 2>/dev/null | grep 'inet ' | awk '{print $2}' | cut -d/ -f1
}

# Find WiFi interface(s)
wifi_ifaces=$(ls /sys/class/net/ | while read iface; do
    [ -d "/sys/class/net/$iface/wireless" ] && echo "$iface"
done)

# Check if any WiFi iface is connected
for iface in $wifi_ifaces; do
    ip=$(get_ip "$iface")
    if [ -n "$ip" ]; then
        echo "$WIFI_ICON $ip"
        echo "$WIFI_ICON $ip"
        echo "$WIFI_COLOR"
        exit 0
    fi
done

# No WiFi connected, check for wired interfaces
wired_ifaces=$(ls /sys/class/net/ | while read iface; do
    if [ ! -d "/sys/class/net/$iface/wireless" ]; then
        # Exclude loopback
        [ "$iface" != "lo" ] && echo "$iface"
    fi
done)

for iface in $wired_ifaces; do
    ip=$(get_ip "$iface")
    if [ -n "$ip" ]; then
        echo "$LAN_ICON $ip"
        echo "$LAN_ICON $ip"
        echo "$LAN_COLOR"
        exit 0
    fi
done

# Nothing connected
echo "$DISCON_ICON Disconnected"
echo "$DISCON_ICON Disconnected"
echo "$DISCON_COLOR"
