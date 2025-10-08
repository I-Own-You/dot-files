#!/usr/bin/env bash
set -e

mkdir -p "$HOME/.config" "$HOME/Pictures" "$HOME/from_source" "$HOME/sync_files"

echo  "[*] Clone repos..."
git clone https://github.com/I-Own-You/dot-files.git "$HOME/dot-files"
git clone https://github.com/I-Own-You/nvim.git "$HOME/.config/nvim"
git clone https://github.com/I-Own-You/wallpapers.git "$HOME/Pictures/wallpapers"

echo  "[*] Install pacman packages..."
paru git zsh unrar unzip keepassxc vlc syncthing xclip keyd nvim neovide zoxide yazi go eza bat git-delta fzf ripgrep npm github-cli glab p7zip fd uv wezterm discord obs-studio qbittorrent krita wl-clipboard
echo  "[*] Install aur packages..."
paru google-chrome devtoys xnviewmp

echo  "[*] Download antidote zsh plugin..."
git clone --depth=1 https://github.com/mattmc3/antidote.git ${ZDOTDIR:-~}/.antidote

echo "[*] Create sym links..."
ln -sf "$HOME/dot-files/dot-files/.zprofile" "$HOME/.zprofile"
ln -sf "$HOME/dot-files/dot-files/.zshrc" "$HOME/.zshrc"
ln -sf "$HOME/dot-files/dot-files/.zsh_plugins.txt" "$HOME/.zsh_plugins.txt"
ln -sf "$HOME/dot-files/dot-files/.gitconfig" "$HOME/.gitconfig"
ln -sf "$HOME/dot-files/cli-tools/yazi" "$HOME/.config/yazi"
ln -sf "$HOME/dot-files/terminals/wezterm" "$HOME/.config/wezterm"
ln -sf "$HOME/dot-files/linux-styling/wm/i3" "$HOME/.config/i3"
ln -sf "$HOME/dot-files/linux-styling/compositors/picom" "$HOME/.config/picom"
ln -sf "$HOME/dot-files/linux-styling/launchers/rofi" "$HOME/.config/rofi" # if this does not work, go to their github, grab the repo, use ./setup.sh and customize .config/rofi
ln -sf "$HOME/dot-files/linux-styling/status-bars/polybar" "$HOME/.config/polybar"

sudo ln -sf "$HOME/dot-files/keybindings-related/keyd/default.conf" /etc/keyd/default.conf

echo "[*] Systemctl services..."
# bluetooth
sudo systemctl enable --now bluetooth
# syncthin
sudo systemctl enable syncthing@$(whoami).service
sudo systemctl start syncthing@$(whoami).service
# keyd
sudo systemctl enable --now keyd

echo "[*] Install apps from off sites..."
# telegram

echo "[*] Side packages in case you need them..."
# easyeffects (plugins for pipewire apps, audio manager)
# lsp-plugins (for easyeffects)
# calf (for easy effects)
# zam-plugins (for easy effects)

echo "[*] Drivers in case you need the..."
broadcom-bt-firmware

echo "[*] Nvidia setup..."
# dont forget to move to lts cachy os kernel
sudo pacman -Syu
sudo pacman -S nvidia-390xx-dkms nvidia-390xx-utils nvidia-390xx-settings
sudo pacman -S linux-headers dkms base-devel
sudo pacman -S nvidia-prime
sudo modprobe nvidia

echo "[*] Git config..."
ssh-keygen -t ed25519 -C "your_email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
ssh -T git@gitlab.com
ssh -T git@github.com

echo "[*] Gnome extensions..."
https://extensions.gnome.org/extension/19/user-themes/
https://extensions.gnome.org/extension/5090/space-bar/
https://extensions.gnome.org/extension/973/switcher/
https://extensions.gnome.org/extension/3843/just-perfection/
https://extensions.gnome.org/extension/615/appindicator-support/
https://extensions.gnome.org/extension/3396/color-picker/
https://extensions.gnome.org/extension/16/auto-move-windows/
https://extensions.gnome.org/extension/307/dash-to-dock/
https://extensions.gnome.org/extension/779/clipboard-indicator/
