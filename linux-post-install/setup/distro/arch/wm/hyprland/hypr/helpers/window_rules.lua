local suppressMaximizeRule = hl.window_rule({
	-- Ignore maximize requests from all apps. You'll probably like this.
	name = "suppress-maximize-events",
	match = { class = ".*" },

	suppress_event = "maximize",
})
suppressMaximizeRule:set_enabled(true)

hl.window_rule({
	-- Fix some dragging issues with XWayland
	name = "fix-xwayland-drags",
	match = {
		class = "^$",
		title = "^$",
		xwayland = true,
		float = true,
		fullscreen = false,
		pin = false,
	},

	no_focus = true,
})

hl.window_rule({
	name = "move-hyprland-run",
	match = { class = "hyprland-run" },

	move = "20 monitor_h-120",
	float = true,
})

-- window workspace placement rules
hl.window_rule({
	name = "telegram-workspace-number",
	match = {
		class = "^org.telegram.desktop.*",
	},
	workspace = "10 silent",
})
hl.window_rule({
	name = "spotify-workspace-number",
	match = {
		class = "^Spotify$",
	},
	workspace = "9 silent",
})
hl.window_rule({
	name = "obs-workspace-number",
	match = {
		class = "^com.obsproject.Studio$",
	},
	workspace = "8 silent",
})
hl.window_rule({
	name = "krita-workspace-number",
	match = {
		class = "^org.kde.krita$",
	},
	workspace = "7 silent",
})
hl.window_rule({
	name = "btop-workspace-number",
	match = {
		class = "^btop$",
	},
	workspace = "5 silent",
})
-- floating rules for windows
hl.window_rule({
	name = "thunar floating",
	match = {
		class = "^thunar$",
	},
	float = true,
	center = true,
	size = { 1100, 650 },
})
hl.window_rule({
	name = "overskride floating",
	match = {
		class = "^io.github.kaii_lb.Overskride$",
	},
	float = true,
	center = true,
	size = { 1100, 650 },
})
hl.window_rule({
	name = "nmrs floating",
	match = {
		class = "^org.nmrs.ui$",
	},
	float = true,
	center = true,
	size = { 1100, 650 },
})
hl.window_rule({
	name = "keepassxc floating",
	match = {
		class = "^org.keepassxc.KeePassXC$",
	},
	float = true,
	center = true,
	size = { 1100, 650 },
})
hl.window_rule({
	name = "waypaper floating",
	match = {
		class = "^waypaper$",
	},
	float = true,
	center = true,
	size = { 1100, 650 },
})
