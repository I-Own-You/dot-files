#!/usr/bin/env bash
set -e

mkdir -p "$HOME/.config" "$HOME/Pictures"

echo  "[*] Cloning repositories..."

git clone https://github.com/I-Own-You/dot-files.git "$HOME/dot-files"
git clone https://github.com/I-Own-You/nvim.git "$HOME/.config/nvim"
git clone https://github.com/I-Own-You/wallpapers.git "$HOME/Pictures/wallpapers"

git clone --depth=1 https://github.com/mattmc3/antidote.git ${ZDOTDIR:-~}/.antidote

echo "[*] Installing packages with apt...."

paru git zsh btop neovim discord zoxide yazi zip wget qbittorrent golang eza bat git-delta jq ipyhton fzf ripgrep npm github-cli glab ctags fd p7zip unrar unzip vlc spotify obs-studio keepassxc keyd krita rnote syncthing uv wezterm neovide xclip playerctl brightnessctl rofi xrandr feh dunst redshift dex mkfifo polybar flameshot i3lock nmcli nmtui bluez blueman

sudo systemctl enable --now bluetooth
systemctl —user enable syncthing.service
systemctl —user start syncthing.service

echo "[*] Setting up dotfiles..."

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

sudo systemctl enable keyd
sudo systemctl start keyd

echo "[*] Done!"
