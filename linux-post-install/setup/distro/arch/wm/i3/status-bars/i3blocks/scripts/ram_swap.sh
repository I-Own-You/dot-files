#!/bin/bash

# Get swap info in kB
read -r _ swap_total_kb _ < <(grep SwapTotal /proc/meminfo)
read -r _ swap_free_kb _ < <(grep SwapFree /proc/meminfo)

# If no swap is configured
if [ "$swap_total_kb" -eq 0 ]; then
    echo "No Swap"
    exit 0
fi

# Calculate used swap
swap_used_kb=$((swap_total_kb - swap_free_kb))

# Convert to GiB (rounded to 1 decimal)
swap_total_gib=$(awk "BEGIN {printf \"%.1f\", $swap_total_kb/1024/1024}")
swap_used_gib=$(awk "BEGIN {printf \"%.1f\", $swap_used_kb/1024/1024}")

# Calculate percentage used
percent=$(awk "BEGIN {printf \"%d\", ($swap_used_kb/$swap_total_kb)*100}")

# Output
echo "${swap_used_gib}G / ${swap_total_gib}G (${percent}%)"
