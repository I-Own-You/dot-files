#!/usr/bin/env bash
set -e

mkdir -p "$HOME/.config" "$HOME/Pictures" "$HOME/from_source" "$HOME/sync_files" "$HOME/Apps"
sudo mkdir -p /etc/keyd

echo  "[*] Clone repos..."
git clone https://github.com/I-Own-You/dot-files.git "$HOME/dot-files"
git clone https://github.com/I-Own-You/nvim.git "$HOME/.config/nvim"
git clone https://github.com/I-Own-You/wallpapers.git "$HOME/Pictures/wallpapers"

echo "[*] Symlink dots..."
ln -sf "$HOME/dot-files/dot-files/.zprofile" "$HOME/.zprofile"
ln -sf "$HOME/dot-files/dot-files/.zshrc" "$HOME/.zshrc"
ln -sf "$HOME/dot-files/dot-files/.zsh_plugins.txt" "$HOME/.zsh_plugins.txt"
ln -sf "$HOME/dot-files/dot-files/.gitconfig" "$HOME/.gitconfig"
ln -sf "$HOME/dot-files/cli-tools/yazi" "$HOME/.config/yazi"
ln -sf "$HOME/dot-files/terminals/alacritty" "$HOME/.config/alacritty"
ln -sf "$HOME/dot-files/terminals/wezterm" "$HOME/.config/wezterm"
sudo ln -sf "$HOME/dot-files/keybindings-related/keyd/default.conf" /etc/keyd/default.conf

echo  "[*] Install pacman packages..."
sudo pacman -S git zsh unrar unzip zip xclip keyd nvim neovide zoxide yazi eza bat git-delta fzf ripgrep npm github-cli glab p7zip fd uv nwg-look tree-sitter tree-sitter-cli grim flameshot mission-center keepassxc vlc syncthing wezterm discord obs-studio qbittorrent krita qt5ct qt6ct qt5-wayland qt6-wayland kvantum kvantum-qt5 kvantum-qt6
paru google-chrome xnviewmp spotify vicinae-bin

echo "[*] Install apps from off sites..."
# telegram

# gnome
sudo pacman -S dconf-editor gnome-tweaks gdm-settings 
# gsettings
gsettings set org.gnome.desktop.wm.preferences resize-with-right-button true
# extension
https://extensions.gnome.org/extension/19/user-themes/
https://extensions.gnome.org/extension/5090/space-bar/
https://extensions.gnome.org/extension/973/switcher/ # only if not using vicinae
https://extensions.gnome.org/extension/3843/just-perfection/
https://extensions.gnome.org/extension/615/appindicator-support/
https://extensions.gnome.org/extension/3396/color-picker/
https://extensions.gnome.org/extension/16/auto-move-windows/
https://extensions.gnome.org/extension/307/dash-to-dock/
https://extensions.gnome.org/extension/779/clipboard-indicator/ # only if not using vicinae
https://extensions.gnome.org/extension/7406/spotify-controls/
# dots
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/hyprland/flameshot" "$HOME/.config/flameshot"

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

# hyprland
sudo pacman -S btop udiskie udisks2 playerctl polkit-kde-agent xdg-desktop-portal xdg-desktop-portal-gtk xdg-desktop-portal-hyprland swaync nmrs overskride grim flameshot polkit-gnome hyprpaper waypaper hyprpicker dolphin nautilus hyprlock hyprsunset mission-center
# styling
sudo pacman -S qt5ct qt6ct kvantum kvantum-qt5 nwg-look qt5-wayland qt6-wayland
# dots
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/hyprland/hypr" "$HOME/.config/hypr"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/hyprland/swaync" "$HOME/.config/swaync"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/hyprland/flameshot" "$HOME/.config/flameshot"

echo  "[*] Download antidote zsh plugin..."
git clone --depth=1 https://github.com/mattmc3/antidote.git ${ZDOTDIR:-~}/.antidote

echo "[*] Drivers in case you need the..."
broadcom-bt-firmware

echo "[*] Systemctl services..."
# bluetooth
sudo systemctl enable --now bluetooth
# syncthin
sudo systemctl enable syncthing@$(whoami).service
sudo systemctl start syncthing@$(whoami).service
# keyd
sudo systemctl enable --now keyd

echo "[*] Side packages in case you need them..."
# easyeffects (plugins for pipewire apps, audio manager)
# lsp-plugins (for easyeffects)
# calf (for easy effects)
# zam-plugins (for easy effects)

echo "[*] Git config..."
ssh-keygen -t ed25519 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
ssh -T git@gitlab.com
ssh -T git@github.com
