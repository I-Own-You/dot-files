#!/usr/bin/env bash
set -e

mkdir -p "$HOME/.config" "$HOME/Pictures"

echo  "[*] Cloning repositories..."

git clone https://github.com/I-Own-You/dot-files.git "$HOME/dot-files"
git clone https://github.com/I-Own-You/nvim.git "$HOME/.config/nvim"
git clone https://github.com/I-Own-You/wallpapers.git "$HOME/Pictures/wallpapers"

git clone --depth=1 https://github.com/mattmc3/antidote.git ${ZDOTDIR:-~}/.antidote

echo "[*] Installing packages with apt...."

sudo apt install zsh zip fzf unrar unzip keepassxc syncthing

echo "[*] Downloading brew..."

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

echo "[*] Installing packages with brew..."

brew tap wezterm/wezterm-linuxbrew
brew install neovim zoxide yazi golang eza bat git-delta fzf ripgrep npm gh glab p7zip fd uv wezterm

echo "[*] Setting up dotfiles..."

ln -sf "$HOME/dot-files/dot-files/.zprofile" "$HOME/.zprofile"
ln -sf "$HOME/dot-files/dot-files/.zshrc" "$HOME/.zshrc"
ln -sf "$HOME/dot-files/dot-files/.zsh_plugins.txt" "$HOME/.zsh_plugins.txt"
ln -sf "$HOME/dot-files/dot-files/.gitconfig" "$HOME/.gitconfig"
ln -sf "$HOME/dot-files/cli-tools/yazi" "$HOME/.config/yazi"
ln -sf "$HOME/dot-files/terminals/wezterm" "$HOME/.config/wezterm"

sudo ln -sf "$HOME/dot-files/keybindings-related/keyd/default.conf" /etc/keyd/default.conf

echo "[*] Adding all custom application entries..."

mkdir -p "$HOME/.local/share/icons/hicolor/128x128/apps"
cp "$HOME/dot-files/linux-install-todo/desktop.applications/icons/neovide.png"  "$HOME/.local/share/icons/hicolor/128x128/apps/neovide.png"
ln -sf "$HOME/dot-files/linux-install-todo/desktop.applications/neovide.desktop" "$HOME/.local/share/applications/neovide.desktop"
update-desktop-database "$HOME/.local/share/applications/"

echo "[*] Done!"
