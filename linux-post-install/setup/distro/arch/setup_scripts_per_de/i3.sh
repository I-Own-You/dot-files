# i3
sudo pacman -S btop udiskie udisks2 playerctl polkit-gnome-authentication-agent gnome-keyring xdg-desktop-portal xdg-desktop-portal-gtk xcolor
# styling
sudo pacman -S nwg-look qt5ct qt6ct kvantum kvantum-qt5 mint-themes cachyos/ant-dracula-kvantum-theme-git # styles
# dots
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3" "$HOME/.config/i3"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3/compositors/picom" "$HOME/.config/picom"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3/launchers/rofi" "$HOME/.config/rofi"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3/status-bars/i3blocks" "$HOME/.config/i3blocks"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3/styling/gtk-3.0/settings.ini" "$HOME/.config/gtk-3.0/settings.ini"
