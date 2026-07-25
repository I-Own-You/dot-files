# hyprland
sudo pacman -S btop udiskie udisks2 playerctl xdg-desktop-portal xdg-desktop-portal-gtk xdg-desktop-portal-hyprland swaync nmrs overskride-bin grim flameshot polkit-gnome hyprpaper waypaper hyprpicker dolphin hyprlock hyprsunset mission-center
# styling
sudo pacman -S qt5ct qt6ct kvantum kvantum-qt5 nwg-look qt5-wayland qt6-wayland
# dont forget to make dark in gtk settings + qt5/6 + kvantum 
# dots
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/hyprland/hypr" "$HOME/.config/hypr"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/hyprland/swaync" "$HOME/.config/swaync"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/hyprland/flameshot" "$HOME/.config/flameshot"
