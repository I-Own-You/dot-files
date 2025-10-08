#!/bin/bash

# Infinite loop to listen to i3 events
i3-msg -t subscribe '[ "mode" ]' | while read -r line; do
    # Extract the mode name using jq
    mode=$(echo "$line" | jq -r '.change')
    
    # If default mode, show empty string
    if [ "$mode" = "default" ]; then
        echo ""
    else
        echo "|$mode|"
    fi
done
