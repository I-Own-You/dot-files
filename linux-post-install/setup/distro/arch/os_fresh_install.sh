#!/usr/bin/env bash
set -e

mkdir -p "$HOME/.config" "$HOME/Pictures" "$HOME/from_source" "$HOME/sync_files" "$HOME/Apps"

echo  "[*] Clone repos..."
git clone https://github.com/I-Own-You/dot-files.git "$HOME/dot-files"
git clone https://github.com/I-Own-You/nvim.git "$HOME/.config/nvim"
git clone https://github.com/I-Own-You/wallpapers.git "$HOME/Pictures/wallpapers"

echo  "[*] Install pacman packages..."
# cli
sudo pacman -S git zsh unrar unzip xclip keyd nvim zoxide yazi go eza bat git-delta fzf ripgrep npm github-cli glab p7zip fd uv btop udiskie udisks2 playerctl
# desktop
sudo pacman -S keepassxc vlc syncthing wezterm discord obs-studio qbittorrent krita flameshot blueman copyq
# styles
sudo pacman -S lxappearance qt5ct qt6ct kvantum kvantum-qt5 mint-themes cachyos/ant-dracula-kvantum-theme-git

echo  "[*] Install aur packages..."
paru google-chrome devtoys xnviewmp

echo  "[*] Download antidote zsh plugin..."
git clone --depth=1 https://github.com/mattmc3/antidote.git ${ZDOTDIR:-~}/.antidote

echo "[*] Symlink dots..."
ln -sf "$HOME/dot-files/dot-files/.zprofile" "$HOME/.zprofile"
ln -sf "$HOME/dot-files/dot-files/.zshrc" "$HOME/.zshrc"
ln -sf "$HOME/dot-files/dot-files/.zsh_plugins.txt" "$HOME/.zsh_plugins.txt"
ln -sf "$HOME/dot-files/dot-files/.gitconfig" "$HOME/.gitconfig"
ln -sf "$HOME/dot-files/cli-tools/yazi" "$HOME/.config/yazi"
ln -sf "$HOME/dot-files/terminals/wezterm" "$HOME/.config/wezterm"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3" "$HOME/.config/i3"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3/compositors/picom" "$HOME/.config/picom"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3/launchers/rofi" "$HOME/.config/rofi"
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/i3/status-bars/i3blocks" "$HOME/.config/i3blocks"
sudo ln -sf "$HOME/dot-files/keybindings-related/keyd/default.conf" /etc/keyd/default.conf

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

echo "[*] Install apps from off sites..."
# telegram

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

# swappness set to 10
