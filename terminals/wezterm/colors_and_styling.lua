local wezterm = require("wezterm")

local module = {}

function module.apply_to_config(config)
	-- config.initial_cols = 120
	-- config.initial_rows = 28

	config.color_scheme = "Everblush (Gogh)"

	-- config.window_decorations = "NONE"

	config.hide_tab_bar_if_only_one_tab = true
	config.tab_bar_at_bottom = true
	-- config.show_close_tab_button_in_tabs = false -- nightly build only
	config.show_new_tab_button_in_tab_bar = false
	config.show_tab_index_in_tab_bar = false

	config.font = wezterm.font("JetBrainsMono")
	config.font_size = 16
	config.command_palette_font_size = 20

	config.line_height = 1.1
	-- config.cell_width = 1.0

	config.window_padding = {
		left = 0,
		right = 0,
		top = 0,
		bottom = 0,
	}

	config.window_frame = {
		active_titlebar_bg = "#282c34",
		inactive_titlebar_bg = "#282c34",
	}

	config.colors = {
		tab_bar = {
			active_tab = {
				fg_color = "#ffffff",
				bg_color = "#14855f",
			},
			inactive_tab_edge = "#282c34",
			inactive_tab = {
				bg_color = "#282c34",
				fg_color = "#c0c0c0",
			},
		},
		cursor_bg = "#52ad70",
	}
end

return module
