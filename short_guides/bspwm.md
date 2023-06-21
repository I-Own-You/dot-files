#  bspwm/sxhkd cheat sheet

#### Common keys

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Super</kbd> + <kbd>Escape</kbd></td>

<td>sxhkd: reload configuration</td>

</tr>

<tr>

<td><kbd>Super</kbd> + <kbd>Break</kbd></td>

<td>Logoff menu</td>

</tr>

<tr>

<td><kbd>Super</kbd> + <kbd>Q</kbd></td>

<td>close focused window</td>

</tr>

<tr>

<td><kbd>Super</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd></td>

<td>kill focused window</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### Window management

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Super</kbd> <kbd>M</kbd></td>

<td>toggle tiled/monocle mode</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Y</kbd></td>

<td>bring marked window to current receptacle</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>G</kbd></td>

<td>swap focused window with the biggest one on the current desktop</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>T</kbd></td>

<td>tiled mode for focused window</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Shift</kbd> <kbd>T</kbd></td>

<td>pseudo_tiled mode for focused window</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>S</kbd></td>

<td>floating mode for focused window</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>F</kbd></td>

<td>fullscreen mode for focused window</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### Window flags

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>M</kbd></td>

<td>Flag: mark</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>X</kbd></td>

<td>Flag: locked</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>Y</kbd></td>

<td>Flag: sticky</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>Z</kbd></td>

<td>Flag: private</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### Focus

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Super</kbd> { <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd> }</td>

<td>Move focus to {west, south, north, east}</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Shift</kbd> { <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd> }</td>

<td>Move focused window to {west, south, north, east}</td>

</tr>

<tr>

<td><kbd>Super</kbd> { <kbd>P</kbd>, <kbd>B</kbd>, <kbd>Comma</kbd>, <kbd>Period</kbd> }</td>

<td>Path jump {parent, brother, first, second}</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>N</kbd></td>

<td>select next window on active desktop</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Shift</kbd> <kbd>N</kbd></td>

<td>select previous window on active desktop</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>></kbd></td>

<td>select next desktop on active monitor</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd><</kbd></td>

<td>select previous desktop on active monitor</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>O</kbd></td>

<td>focus history: walk backwards</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>I</kbd></td>

<td>focus history: walk forwards</td>

</tr>

<tr>

<td><kbd>Alt</kbd> <kbd>Tab</kbd></td>

<td>select previous active window</td>

</tr>

<tr>

<td><kbd>Alt</kbd> <kbd>Shift</kbd> <kbd>Tab</kbd></td>

<td>select previous active desktop</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### Preselection / Receptacles

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> { <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd> }</td>

<td>preselect: {west, south, north, east}</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>Space</kbd></td>

<td>remove preselection for active window</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>Space</kbd></td>

<td>remove preselection for active desktop</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### Window size/position

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Ctrl</kbd> <kbd>Alt</kbd> { <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd> }</td>

<td>resize active window outwards {west, south, north, east}</td>

</tr>

<tr>

<td><kbd>Ctrl</kbd> <kbd>Alt</kbd> <kbd>Shift</kbd> { <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd> }</td>

<td>resize active window inwards {west, south, north, east}</td>

</tr>

<tr>

<td><kbd>Ctrl</kbd> <kbd>Alt</kbd> { , , , }</td>

<td>move current window (floating mode only)</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### Desktop management

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Super</kbd> { <kbd>^</kbd>, <kbd>0-9</kbd>, <kbd>ß</kbd>, <kbd>´</kbd> }</td>

<td>select desktop {0-12}</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Shift</kbd> { <kbd>^</kbd>, <kbd>0-9</kbd>, <kbd>ß</kbd>, <kbd>´</kbd> }</td>

<td>move active window to desktop {0-12}</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> { <kbd>^</kbd>, <kbd>0-9</kbd>, <kbd>ß</kbd>, <kbd>´</kbd> }</td>

<td>swap active destop and desktop {0-12}</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>Shift</kbd> { <kbd>^</kbd>, <kbd>0-9</kbd>, <kbd>ß</kbd>, <kbd>´</kbd> }</td>

<td>move active destop to the monitor of desktop {0-12}</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>Shift</kbd> { <kbd>+</kbd>, <kbd>-</kbd> }</td>

<td>move active destop to the {next,prev} monitor</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Ctrl</kbd> <kbd>Shift</kbd> { <kbd>H</kbd>, <kbd>J</kbd>, <kbd>K</kbd>, <kbd>L</kbd> }</td>

<td>move active destop to the {western,southern,northern,eastern} monitor</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### Applications

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Super</kbd> <kbd>Tab</kbd></td>

<td>Rofi: open bookmarks</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Break</kbd></td>

<td>Rofi: shutdown/sleep</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Printscreen</kbd></td>

<td>ksnapshot</td>

</tr>

<tr>

<td><kbd>Super</kbd> <kbd>Enter</kbd></td>

<td>urxvt</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>R</kbd></td>

<td>ranger</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>K</kbd></td>

<td>krusader</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>F</kbd></td>

<td>Rofi: FontAwesome-selection</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>P</kbd></td>

<td>Rofi: Asterisk (dial a phone number)</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>D</kbd></td>

<td>Rofi: combi</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>Shift</kbd> <kbd>D</kbd></td>

<td>Rofi: drun</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>Ctrl</kbd> <kbd>D</kbd></td>

<td>Rofi: ssh</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>Ctrl</kbd> <kbd>C</kbd></td>

<td>Rofi: edit config files</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>S</kbd></td>

<td>Rofi: Screen-Layout</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>O</kbd></td>

<td>Pseudo-terminal</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### Work

<table class="tmuxTable table-striped">

<tbody>

<tr>

<td><kbd>Super</kbd> <kbd>A</kbd></td>

<td>Toggle CCWF-RDP visibility</td>

</tr>

<tr>

<td><kbd>Hyper</kbd> <kbd>A</kbd></td>

<td>Rofi: CCWF-RDP</td>

</tr>

</tbody>

</table>

</div>

</div>

<div class="row content-row">

<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

#### ~/.config/sxhkd/sxhkdrc

<pre style="line-height: normal;"># WM INDEPENDENT KEYBINDINGS

# make sxhkd reload its configuration files:
super + Escape
	pkill -USR1 -x sxhkd

hyper + g
  gvim

# BSPWM HOTKEYS

# quit/restart bspwm
super + shift + {Escape}
	bspc {quit}

# close and kill
super + {_,shift + }q
	bspc node -{c,k}

# alternate between the tiled and monocle layout
super + m
	bspc desktop -l next

# send the newest marked node to the newest preselected node
super + y
	bspc node newest.marked.local -n newest.!automatic.local

# swap the current node and the biggest node
super + g
	bspc node -s biggest.local

# STATE/FLAGS

# set the window state
super + {t,shift + t,s,f}
	bspc node -t {tiled,pseudo_tiled,floating,fullscreen}

# set the node flags
super + ctrl + {m,x,y,z}
	bspc node -g {marked,locked,sticky,private}

# SCRATCHPAD
super + a
	/home/olly/bin/bspwm_scratchpad.sh CCWF_RDP

# FOCUS/SWAP

# focus the node in the given direction
super + {_,shift + }{h,j,k,l}
	bspc node -{f,s} {west,south,north,east}

# focus the node for the given path jump
super + {p,b,comma,period}
	bspc node -f @{parent,brother,first,second}

# focus the next/previous node in the current desktop
super + {_,shift + }n
	bspc node -f {next,prev}.local

# focus the next/previous desktop in the current monitor
super + {less,greater}
	bspc desktop -f {prev,next}.local

# focus the last node/desktop
alt + Tab
	bspc node -f last

alt + shift + Tab
	bspc desktop -f last

# focus the older or newer node in the focus history
super + {o,i}
	bspc wm -h off; \
	bspc node {older,newer} -f; \
	bspc wm -h on

# PRESELECT

# preselect the direction
super + ctrl + {h,j,k,l}
	bspc node -p {west,south,north,east}

# preselect the ratio
#super + ctrl + {1-9}
#	bspc node -o 0.{1-9}

# cancel the preselection for the focused node
super + ctrl + space
	bspc node -p cancel

# cancel the preselection for the focused desktop
super + ctrl + shift + space
	bspc query -N -d | xargs -I id -n 1 bspc node id -p cancel

# MOVE/RESIZE

# expand a window by moving one of its side outward
ctrl + alt + {h,j,k,l}
	bspc node -z {left -20 0,bottom 0 20,top 0 -20,right 20 0}

# contract a window by moving one of its side inward
ctrl + alt + shift + {h,j,k,l}
	bspc node -z {right -20 0,top 0 20,bottom 0 -20,left 20 0}

# move a floating window
ctrl + alt + {Left,Down,Up,Right}
	bspc node -v {-20 0,0 20,0 -20,20 0}

# SPECIALKEYS
XF86MonBrightness{Up,Down}
 xbacklight -{inc,dec} 5 &

XF86TouchpadToggle
 ~/bin/toggleAsusTouchpad &

# on the asus this needs kernel module asus-wireless to be loaded
XF86RFKill
  ~/bin/toggleAsusAirplaneMode

XF86AudioMute
 amixer -q -D pulse sset Master toggle &

XF86Audio{Lower,Raise}Volume
 amixer -q -D pulse sset Master 5%{-,+} unmute &

XF86Audio{Play,Prev,Next,Stop}
 ~/bin/mediacontrolkeys.sh {PlayPause,Previous,Next,Stop} &

XF86Sleep
	~/bin/i3/i3lock.sh && systemctl suspend -i

XF86WakeUp
	~/bin/i3/i3lock.sh

# heres comes a dirty hack: KeepassXC won't handle Scroll_Lock...
# so KeepassXC will autotype on ctrl+shift+alt+greater. We use xdotool
# to send those keys on Scroll_Lock:
XF86LaunchF
	xdotool key --window `xdotool search "oliver-main - KeePassX" | head -n1` --delay 25 --clearmodifiers ctrl+alt+shift+greater

# APPLICATION KEYBINDINGS (Super + Alt + Key)
super + Return
	/usr/bin/urxvt

super + Pause
	~/bin/rofi-shutdown.sh

super + Tab
 ~/Projekte/bookmark/bookmarks.sh

super + Print
 /usr/bin/spectacle

hyper + r
 /usr/bin/urxvt -e ranger

hyper + k
 /usr/bin/krusader

hyper + f
 ~/bin/i3/rofi-font-awesome.sh

# ROFI SCRIPTS
hyper + control + c
	~/bin/rofi-config-files.sh

hyper + d
	~/bin/i3/i3rofi.sh combi

hyper + shift + d
	~/bin/i3/i3rofi.sh drun

hyper + ctrl + d
	~/bin/i3/i3rofi.sh ssh

hyper + p
  ~/bin/rofi-asterisk.sh

hyper + s
	~/bin/rofi-screen-setup.sh

hyper + m; {m,u}
	~/bin/rofi-mount.sh {start,stop}

hyper + o
  urxvt -shading 100 -title 'pseudoframe' -name 'pseudoframe' -e sh -c 'tput civis; sleep 365d'

hyper + a
 ~/bin/rofi-ccwf.sh

# https://protesilaos.com
# Dynamic desktop behaviour:  this invokes a script of mine that
# implements dynamic desktops (see dotfiles).  If the given desktop
# number is missing, it is created on the spot.  Empty desktops are then
# removed automatically.
#
# mod3 + <number> = focus the given desktop
# mod3 + shift + <number> = send focused window to given desktop
# mod3 + ctrl + shift + <number> = as above, but send to next monitor
# mod3 + ctrl + <number>= switches the active (visible) desktop of the
# unfocused monitor, without focusing it (focus stays on the current
# desktop/monitor).  It also inserts a receptacle, meaning that the next
# created window will go there without calling focus to itself (see my
# bspwm_external_rules).
#
# Commands for receptacles are defined in the "advanced operations"
# section.
#
# NOTE the leading `;` runs this command asynchronously.
#super + {_,shift + ,ctrl + shift +,ctrl +}{asciicircum,1-9,0,ssharp,acute}
#	;bspwm_dynamic_desktops {--df,--ns,--nm,--da} {0,1-9,10,11,12}
#super + {_,shift + }{asciicircum,1-9,0,ssharp,acute}
#	;bspwm_dynamic_desktops {--df,--ns} {0,1-9,10,11,12}

#focus or send to the given desktop
super + {_,shift + }{grave,asciicircum,1-9,0,ssharp,minus,equal,acute}
	bspc {desktop -f,node -d} {0,0,1-9,10,11,11,12,12}

#swap desktops
super + ctrl + {grave,asciicircum,1-9,0,ssharp,minus,equal,acute}
	bspc desktop -s {0,0,1-9,10,11,11,12,12} --follow

#send focused desktop to the monitor of target desktop
super + ctrl + shift + {grave,asciicircum,1-9,0,ssharp,minus,equal,acute}
	bspc desktop -m `bspc query -M -d {0,0,1-9,10,11,11,12,12} --names` --follow

#send focused desktop to next/previous/{dir} monitor
super + ctrl + shift + {n,p,h,j,k,l}
	bspc desktop -m {next,prev,west,south,north,east} --follow

super + F1
	surf -BS "https://www.la-familia-grande.de/index.php?site=bspwm"</number> </number></number></number></pre>

</div>

</div>

</div>