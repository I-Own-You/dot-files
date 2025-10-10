#!/bin/bash

get_cpu_times() {
    # Read CPU line from /proc/stat
    read -r _ user nice system idle iowait irq softirq steal _ < /proc/stat

    total=$((user + nice + system + idle + iowait + irq + softirq + steal))
    used=$((user + nice + system + irq + softirq + steal))

    echo "$used $total"
}

# Get thresholds and settings from env vars or use defaults
warn="${WARN_PERCENT:-50}"
crit="${CRIT_PERCENT:-80}"
label="${LABEL:- }"
delay="${REFRESH_TIME:-1}"

# Read initial CPU stats
read -r prev_used prev_total <<< "$(get_cpu_times)"

while true; do
    sleep "$delay"
    read -r curr_used curr_total <<< "$(get_cpu_times)"

    used_diff=$((curr_used - prev_used))
    total_diff=$((curr_total - prev_total))

    if [ "$total_diff" -eq 0 ]; then
        percent=0
    else
        percent=$((100 * used_diff / total_diff))
    fi

    # Set color based on usage
    if [ "$percent" -ge "$crit" ]; then
        color="#E06C75"  # muted rose red (critical)
    elif [ "$percent" -ge "$warn" ]; then
        color="#E5C07B"  # warm golden yellow (warning)
    else
        color="#61AFEF"  # soft sky blue (normal)
    fi

    echo "$label<span color=\"$color\">${percent}%</span>"

    prev_used=$curr_used
    prev_total=$curr_total
done
