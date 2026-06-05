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
ln -sf "$HOME/dot-files/cli-tools/zellij" "$HOME/.config/zellij"
sudo ln -sf "$HOME/dot-files/keybindings-related/keyd/default.conf" /etc/keyd/default.conf

echo  "[*] Install pacman packages..."
sudo pacman -S git zellij zsh unrar unzip zip xclip keyd nvim neovide zoxide yazi eza bat git-delta fzf ripgrep npm github-cli glab p7zip fd uv nwg-look tree-sitter tree-sitter-cli grim flameshot mission-center keepassxc vlc syncthing wezterm discord obs-studio qbittorrent krita qt5ct qt6ct qt5-wayland qt6-wayland kvantum kvantum-qt5 kvantum-qt6 gnome-browser-connector
paru google-chrome xnviewmp spotify vicinae-bin

echo "[*] Install apps from off sites..."
# telegram

# gnome
sudo pacman -S dconf-editor gnome-tweaks gdm-settings 
# gsettings
gsettings set org.gnome.desktop.wm.preferences resize-with-right-button true

gsettings set org.gnome.desktop.wm.preferences button-layout "appmenu:minimize,maximize,close"

gsettings set org.gnome.desktop.peripherals.keyboard delay 200
gsettings set org.gnome.desktop.peripherals.keyboard repeat-interval 20

gsettings set org.gnome.shell.keybindings open-new-window-application-1 "@as []"
gsettings set org.gnome.shell.keybindings open-new-window-application-2 "@as []"
gsettings set org.gnome.shell.keybindings open-new-window-application-3 "@as []"
gsettings set org.gnome.shell.keybindings open-new-window-application-4 "@as []"
gsettings set org.gnome.shell.keybindings open-new-window-application-5 "@as []"
gsettings set org.gnome.shell.keybindings open-new-window-application-6 "@as []"
gsettings set org.gnome.shell.keybindings open-new-window-application-7 "@as []"
gsettings set org.gnome.shell.keybindings open-new-window-application-8 "@as []"
gsettings set org.gnome.shell.keybindings open-new-window-application-9 "@as []"

gsettings set org.gnome.shell.keybindings switch-to-application-1 "@as []"
gsettings set org.gnome.shell.keybindings switch-to-application-2 "@as []"
gsettings set org.gnome.shell.keybindings switch-to-application-3 "@as []"
gsettings set org.gnome.shell.keybindings switch-to-application-4 "@as []"
gsettings set org.gnome.shell.keybindings switch-to-application-5 "@as []"
gsettings set org.gnome.shell.keybindings switch-to-application-6 "@as []"
gsettings set org.gnome.shell.keybindings switch-to-application-7 "@as []"
gsettings set org.gnome.shell.keybindings switch-to-application-8 "@as []"
gsettings set org.gnome.shell.keybindings switch-to-application-9 "@as []"

gsettings set org.gnome.desktop.wm.keybindings toggle-above "['<Super>p']"

gsettings set org.gnome.mutter.keybindings switch-monitor "['XF86Display']"

gsettings set org.freedesktop.ibus.panel.emoji hotkey "@as []"
gsettings set org.freedesktop.ibus.panel.emoji unicode-hotkey "@as []"

gsettings set org.gnome.desktop.peripherals.touchpad middle-click-emulation true
gsettings set org.gnome.desktop.peripherals.mouse middle-click-emulation true

gsettings set org.gnome.settings-daemon.plugins.media-keys increase-text-size "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys decrease-text-size "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys on-screen-keyboard "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys screenreader "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys magnifier "['<Shift><Super>z']"
gsettings set org.gnome.settings-daemon.plugins.media-keys magnifier-zoom-in "['<Shift><Super>a']"
gsettings set org.gnome.settings-daemon.plugins.media-keys magnifier-zoom-out "['<Shift><Super>d']"

gsettings set org.gnome.settings-daemon.plugins.media-keys home "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys calculator "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys email "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys www "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys search "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys control-center "@as []"

gsettings set org.gnome.desktop.wm.keybindings show-desktop "['<Super>d']"
gsettings set org.gnome.desktop.wm.keybindings move-to-monitor-down "@as []"
gsettings set org.gnome.desktop.wm.keybindings move-to-monitor-left "@as []"
gsettings set org.gnome.desktop.wm.keybindings move-to-monitor-right "@as []"
gsettings set org.gnome.desktop.wm.keybindings move-to-monitor-up "@as []"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-right "['<Shift><Super>period']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-left "['<Shift><Super>comma']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-last "['<Shift><Super>F12']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-1 "['<Shift><Super>1']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-2 "['<Shift><Super>2']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-3 "['<Shift><Super>3']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-4 "['<Shift><Super>4']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-5 "['<Shift><Super>5']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-6 "['<Shift><Super>6']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-7 "['<Shift><Super>7']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-8 "['<Shift><Super>8']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-9 "['<Shift><Super>9']"
gsettings set org.gnome.desktop.wm.keybindings move-to-workspace-10 "['<Shift><Super>0']"
gsettings set org.gnome.desktop.wm.keybindings switch-applications "['<Alt>Tab']"
gsettings set org.gnome.desktop.wm.keybindings switch-applications-backward "['<Shift><Alt>Tab']"
gsettings set org.gnome.desktop.wm.keybindings switch-panels "@as []"
gsettings set org.gnome.desktop.wm.keybindings switch-panels-backward "@as []"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-1 "['<Super>1']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-2 "['<Super>2']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-3 "['<Super>3']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-4 "['<Super>4']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-5 "['<Super>5']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-6 "['<Super>6']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-7 "['<Super>7']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-8 "['<Super>8']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-9 "['<Super>9']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-10 "['<Super>0']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-right "['<Super>period']"
gsettings set org.gnome.desktop.wm.keybindings switch-to-workspace-left "['<Super>comma']"
gsettings set org.gnome.desktop.wm.keybindings switch-windows "@as []"
gsettings set org.gnome.desktop.wm.keybindings switch-windows-backward "@as []"
gsettings set org.gnome.desktop.wm.keybindings cycle-windows "['<Super>n']"
gsettings set org.gnome.desktop.wm.keybindings cycle-windows-backward "['<Shift><Super>n']"
gsettings set org.gnome.desktop.wm.keybindings cycle-group "['<Super>m']"
gsettings set org.gnome.desktop.wm.keybindings cycle-group-backward "['<Shift><Super>m']"
gsettings set org.gnome.desktop.wm.keybindings switch-group "['<Super>Tab']"
gsettings set org.gnome.desktop.wm.keybindings switch-group-backward "['<Shift><Super>Tab']"

gsettings set org.gnome.shell.keybindings focus-active-notification "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys screensaver "['<Super>Backspace']"
gsettings set org.gnome.shell.keybindings toggle-quick-settings "@as []"
gsettings set org.gnome.mutter.wayland.keybindings restore-shortcuts "@as []"
gsettings set org.gnome.shell.keybindings toggle-application-view "@as []"
gsettings set org.gnome.shell.keybindings toggle-message-tray "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys shutdown "@as []"
gsettings set org.gnome.settings-daemon.plugins.media-keys reboot "@as []"
gsettings set org.gnome.shell.keybindings toggle-overview "@as []"

gsettings set org.gnome.desktop.wm.keybindings activate-window-menu "@as []"
gsettings set org.gnome.desktop.wm.keybindings close "['<Super>c']"
gsettings set org.gnome.desktop.wm.keybindings minimize "['<Super>a']"
gsettings set org.gnome.desktop.wm.keybindings lower "@as []"
gsettings set org.gnome.desktop.wm.keybindings maximize "@as []"
gsettings set org.gnome.desktop.wm.keybindings maximize-horizontally "@as []"
gsettings set org.gnome.desktop.wm.keybindings maximize-vertically "@as []"
gsettings set org.gnome.desktop.wm.keybindings begin-move "@as []"
gsettings set org.gnome.desktop.wm.keybindings raise "@as []"
gsettings set org.gnome.desktop.wm.keybindings raise-or-lower "@as []"
gsettings set org.gnome.desktop.wm.keybindings begin-resize "@as []"
gsettings set org.gnome.desktop.wm.keybindings unmaximize "@as []"
gsettings set org.gnome.desktop.wm.keybindings toggle-fullscreen "['<Super>f']"
gsettings set org.gnome.desktop.wm.keybindings toggle-maximized "['<Super>k']"
gsettings set org.gnome.desktop.wm.keybindings toggle-on-all-workspaces "['<Super>t']"
gsettings set org.gnome.mutter.keybindings toggle-tiled-left "@as []"
gsettings set org.gnome.mutter.keybindings toggle-tiled-right "@as []"
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
https://extensions.gnome.org/extension/8594/vicinae/
https://extensions.gnome.org/extension/3193/blur-my-shell/
# dots
ln -sf "$HOME/dot-files/linux-post-install/setup/distro/arch/wm/hyprland/flameshot" "$HOME/.config/flameshot"
# order to setup:
#                extensions
#                setttings
#                keyboard keymap
#                dconf keymaps
#                gdm settings
#                gnome tweaks
#                customize themes, .etc
# styling
# whitesur from github for gtk install script with "-l" then in tweaks apps
# whitesur from github for kde in folder kvantum then kvantum + qt5/qt6
# 

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
# vicinae
systemctl --user enable vicinae --now

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
