#!/usr/bin/env bash
set -e

# create folders
mkdir -p "$HOME/.config" "$HOME/Pictures" "$HOME/from_source" "$HOME/sync_files" "$HOME/Apps"
sudo mkdir -p /etc/keyd

# clone repos
git clone https://github.com/I-Own-You/dot-files.git "$HOME/dot-files"
git clone https://github.com/I-Own-You/nvim.git "$HOME/.config/nvim"
git clone https://github.com/I-Own-You/wallpapers.git "$HOME/Pictures/wallpapers"

# symlinks
ln -sf "$HOME/dot-files/dot-files/.zprofile" "$HOME/.zprofile"
ln -sf "$HOME/dot-files/dot-files/.zshrc" "$HOME/.zshrc"
ln -sf "$HOME/dot-files/dot-files/.zsh_plugins.txt" "$HOME/.zsh_plugins.txt"
ln -sf "$HOME/dot-files/dot-files/.gitconfig" "$HOME/.gitconfig"
ln -sf "$HOME/dot-files/cli-tools/yazi" "$HOME/.config/yazi"
ln -sf "$HOME/dot-files/terminals/alacritty" "$HOME/.config/alacritty"
ln -sf "$HOME/dot-files/terminals/wezterm" "$HOME/.config/wezterm"
ln -sf "$HOME/dot-files/cli-tools/zellij" "$HOME/.config/zellij"
ln -sf "$HOME/dot-files/linux-post-install/setup/utility/mime_applications/btop.desktop" "$HOME/.local/share/applications/btop.desktop"
ln -sf "$HOME/dot-files/linux-post-install/setup/utility/mime_applications/google-chrome.desktop" "$HOME/.local/share/applications/google-chrome.desktop"
sudo ln -sf "$HOME/dot-files/keybindings-related/keyd/default.conf" /etc/keyd/default.conf

# install pacman packages
sudo pacman -S 
               # cli
               git zsh zoxide eza bat git-delta fzf ripgrep fd yazi glab github-cli uv uvx nvim helix zellij unrar unzip zip p7zip ffmpeg yt-dlp imagemagick btop nvtop gdu duf iftop bandwhich iotop-c sysstat lnav systemctl-tui ouch just lazygit lazydocker sshs shellcheck direnv dust mpv golangci-lint
               # system pkgs
               paru
               # gui apps
               vlc keepassxc discord obs-studio qbittorrent krita alacritty wezterm neovide
               # daemons
               syncthing keyd
               # deps
               npm tree-sitter tree-sitter-cli
paru 
     # gui apps
     google-chrome-stable-bin xnviewmp spotify vicinae-bin

# install apps from their website
# telegram

# antidote setup
git clone --depth=1 https://github.com/mattmc3/antidote.git ${ZDOTDIR:-~}/.antidote

# drivers you need on my old pc 
broadcom-bt-firmware
# also, disable wifi, it stutters my bluettoth (only on old pc, to be removed)

# systemctl and services setup
# 
# bluetooth
sudo systemctl enable --now bluetooth
# syncthin
sudo systemctl enable syncthing@$(whoami).service
sudo systemctl start syncthing@$(whoami).service
# keyd
sudo systemctl enable --now keyd
# 
update-desktop-database ~/.local/share/applications

# setup virt-manager + qemu + kvm
sudo pacman -S qemu-desktop libvirt virt-manager dnsmasq vde2 openbsd-netcat
paru bridge-utils
sudo systemctl start libvirtd # you need to do this everytime you will use virt-manager
sudo usermod -aG libvirt $USER # exit and enter again into user

# git config
ssh-keygen -t ed25519
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
ssh -T git@gitlab.com
ssh -T git@github.com
