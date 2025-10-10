capacity=$(cat /sys/class/power_supply/BAT*/capacity)
status=$(cat /sys/class/power_supply/BAT*/status)

if [ "$status" = "Charging" ]; then
    icon=""
else
    if [ "$capacity" -ge 80 ]; then icon="";
    elif [ "$capacity" -ge 60 ]; then icon="";
    elif [ "$capacity" -ge 40 ]; then icon="";
    elif [ "$capacity" -ge 20 ]; then icon="";
    else icon=""; fi
fi

# Color based on level
if [ "$capacity" -le 20 ]; then
    color="#f38ba8"
elif [ "$capacity" -le 40 ]; then
    color="#fab387"
else
    color="#A0A0A0"
fi

echo "<span color=\"$color\">$icon $capacity%</span>"
