#!/bin/bash

# Get memory info in kB
read -r _ total_kb _ < <(grep MemTotal /proc/meminfo)
read -r _ available_kb _ < <(grep MemAvailable /proc/meminfo)

# Calculate used memory in kB
used_kb=$((total_kb - available_kb))

# Convert to GiB (rounded to 1 decimal)
total_gib=$(awk "BEGIN {printf \"%.1f\", $total_kb/1024/1024}")
used_gib=$(awk "BEGIN {printf \"%.1f\", $used_kb/1024/1024}")

# Calculate percentage used
percent=$(awk "BEGIN {printf \"%d\", ($used_kb/$total_kb)*100}")

# Output
echo "${used_gib}G / ${total_gib}G (${percent}%)"
