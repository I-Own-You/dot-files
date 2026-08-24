hl.config({
	general = {
		gaps_in = 5,
		gaps_out = 20,

		border_size = 2,

		col = {
			active_border = { colors = { "rgba(FEDE6Fee)", "rgba(FEDE6Fee)" }, angle = 45 },
			inactive_border = "rgba(3C3959ee)",
		},

		no_focus_fallback = true,
		resize_on_border = true, -- enable resizing windows by clicking and dragging on borders and gaps

		allow_tearing = false,

		layout = "dwindle",
	},

	decoration = {
		rounding = 5,
		rounding_power = 2,

		-- Change transparency of focused and unfocused windows
		active_opacity = 1.0,
		inactive_opacity = 1.0,

		shadow = {
			enabled = true,
			range = 4,
			render_power = 3,
			color = "0xee1a1a1a",
		},

		blur = {
			enabled = false,
			size = 5, -- radius of blur, how far pixels blend into each other
			passes = 3, -- how many times blur is applied making it more and more
			vibrancy = 0.2, -- how grey it looks, weird to understand, need to look
			ignore_opacity = true, -- if false, blur will be as opacity level (bad)
		},
	},

	animations = {
		enabled = true,
	},

	misc = {
		disable_hyprland_logo = true,
		disable_splash_rendering = true,
		force_default_wallpaper = 0,
	},

	dwindle = {
		preserve_split = true, -- You probably want this
	},

	master = {
		new_status = "master",
	},

	scrolling = {
		fullscreen_on_one_column = true,
	},

	input = {
		kb_layout = "us,ru",
		kb_variant = "",
		kb_options = "grp:win_space_toggle",
		kb_model = "",
		kb_rules = "",

		-- repeat_rate = 50,
		-- repeat_delay = 200,

		follow_mouse = 2,

		sensitivity = 0, -- -1.0 - 1.0, 0 means no modification.

		touchpad = {
			natural_scroll = false,
			middle_button_emulation = true,
		},
	},

	group = {
		groupbar = {
			height = 10,
			font_size = 14,
			col = {
				active = "rgba(FEDE6Fee)",
				inactive = "rgba(3C3959ee)",
			},
		},
	},
})
