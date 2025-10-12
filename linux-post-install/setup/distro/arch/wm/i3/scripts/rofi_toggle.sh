if pgrep -x rofi > /dev/null; then
    pkill -x rofi
else
    /home/mkc/dot-files/linux-post-install/setup/distro/arch/wm/i3/launchers/rofi/launchers/type-4/launcher.sh
fi
