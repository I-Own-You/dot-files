#!/usr/bin/env bash
set -e

mkdir -p "$HOME/.config" "$HOME/Pictures"

echo  "[*] Cloning repositories..."

git clone https://github.com/I-Own-You/dot-files.git "$HOME/dot-files"
git clone https://github.com/I-Own-You/nvim.git "$HOME/.config/nvim"
git clone https://github.com/I-Own-You/wallpapers.git "$HOME/Pictures/wallpapers"

echo "[*] Installing packages..."

paru git zsh btop neovim discord zoxide yazi zip wget qbittorent golang eza bat git-delta jq ipyhton fzf ripgrep npm github-cli glab ctags fd p7zip unrar unzip vlc spotify obs-studio keepassxc keyd krita

echo "[*] Installing antidote..."

git clone --depth=1 https://github.com/mattmc3/antidote.git ${ZDOTDIR:-~}/.antidote

echo "[*] Setting up dotfiles..."

ln -sf "$HOME/dot-files/dot-files/.zprofile" "$HOME/.zprofile"
ln -sf "$HOME/dot-files/dot-files/.zshrc" "$HOME/.zshrc"
ln -sf "$HOME/dot-files/dot-files/.zsh_plugins.txt" "$HOME/.zsh_plugins.txt"
ln -sf "$HOME/dot-files/dot-files/.gitconfig" "$HOME/.gitconfig"
ln -sf "$HOME/dot-files/cli-tools/yazi" "$HOME/.config/yazi"
ln -sf "$HOME/dot-files/terminals/wezterm" "$HOME/.config/wezterm"

sudo ln -sf "$HOME/dot-files/keybindings-related/keyd/default.conf" /etc/keyd/default.conf

echo "[*] Done!"
