hl.bind("SUPER + C", hl.dsp.window.close())
hl.bind("SUPER + Q", hl.dsp.exec_cmd("alacritty"))
hl.bind("SUPER + Y", hl.dsp.exec_cmd("swaync-client -t"))

hl.bind("SUPER + comma", hl.dsp.focus({ workspace = "-1" }), { repeating = true })
hl.bind("SUPER + period", hl.dsp.focus({ workspace = "+1" }), { repeating = true })

hl.bind("SUPER + SHIFT + comma", hl.dsp.window.move({ workspace = "-1" }), { repeating = true })
hl.bind("SUPER + SHIFT + period", hl.dsp.window.move({ workspace = "+1" }), { repeating = true })

hl.bind("SUPER + F", hl.dsp.window.fullscreen({ mode = "fullscreen", action = "toggle" }))
hl.bind("SUPER + K", hl.dsp.window.fullscreen({ mode = "maximized", action = "toggle" }))

-- uncmment this when you remove the monocle/dwindle functionality below
-- hl.bind("SUPER + N", hl.dsp.window.cycle_next({ next = true }))
require("helpers.utils.curr_workspace_layout_cycle")
hl.bind("SUPER + SHIFT + N", hl.dsp.window.cycle_next({ next = false }))

hl.bind("SUPER + T", hl.dsp.window.center())

-- Scroll through existing workspaces with mainMod + scroll
hl.bind("SUPER + mouse_down", hl.dsp.focus({ workspace = "e+1" }))
hl.bind("SUPER + mouse_up", hl.dsp.focus({ workspace = "e-1" }))

-- Move/resize windows with mainMod + LMB/RMB and dragging
hl.bind("SUPER + mouse:272", hl.dsp.window.drag(), { mouse = true })
hl.bind("SUPER + mouse:273", hl.dsp.window.resize(), { mouse = true })

hl.bind("SUPER + BACKSPACE", hl.dsp.exec_cmd("hyprlock"))

hl.bind("SUPER + F7", hl.dsp.exec_cmd("hyprctl hyprsunset temperature 3000 && hyprctl hyprsunset gamma 90"))
hl.bind("SUPER + F8", hl.dsp.exec_cmd("hyprctl hyprsunset identity && hyprctl hyprsunset gamma 100"))

hl.bind("SUPER + V", hl.dsp.window.float({ action = "toggle" }))
-- hl.bind("SUPER + P", hl.dsp.window.pseudo())
hl.bind("SUPER + P", hl.dsp.exec_cmd("hyprpicker -a"))
hl.bind("SUPER + J", hl.dsp.layout("togglesplit")) -- dwindle only

hl.bind("SUPER + E", hl.dsp.exec_cmd("thunar"))
hl.bind("ALT + SPACE", hl.dsp.exec_cmd("vicinae toggle"))
hl.bind("PRINT", hl.dsp.exec_cmd("flameshot gui"))

for i = 1, 10 do
	local key = i % 10 -- 10 maps to key 0
	hl.bind("SUPER + " .. key, hl.dsp.focus({ workspace = i }))
	hl.bind("SUPER + SHIFT + " .. key, hl.dsp.window.move({ workspace = i }))
end

hl.bind("SUPER + W", hl.dsp.workspace.toggle_special("magic"))
hl.bind("SUPER + SHIFT + W", hl.dsp.window.move({ workspace = "special:magic" }))

hl.bind(
	"XF86AudioRaiseVolume",
	hl.dsp.exec_cmd("wpctl set-volume -l 1 @DEFAULT_AUDIO_SINK@ 5%+"),
	{ locked = true, repeating = true }
)
hl.bind(
	"XF86AudioLowerVolume",
	hl.dsp.exec_cmd("wpctl set-volume @DEFAULT_AUDIO_SINK@ 5%-"),
	{ locked = true, repeating = true }
)
hl.bind(
	"XF86AudioMute",
	hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle"),
	{ locked = true, repeating = true }
)
hl.bind(
	"XF86AudioMicMute",
	hl.dsp.exec_cmd("wpctl set-mute @DEFAULT_AUDIO_SOURCE@ toggle"),
	{ locked = true, repeating = true }
)
hl.bind("XF86MonBrightnessUp", hl.dsp.exec_cmd("brightnessctl -e4 -n2 set 5%+"), { locked = true, repeating = true })
hl.bind("XF86MonBrightnessDown", hl.dsp.exec_cmd("brightnessctl -e4 -n2 set 5%-"), { locked = true, repeating = true })

-- Requires playerctl
hl.bind("XF86AudioNext", hl.dsp.exec_cmd("playerctl next"), { locked = true })
hl.bind("XF86AudioPause", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })
hl.bind("XF86AudioPlay", hl.dsp.exec_cmd("playerctl play-pause"), { locked = true })
hl.bind("XF86AudioPrev", hl.dsp.exec_cmd("playerctl previous"), { locked = true })

require("helpers.keymap_submaps")
