local module = {}

function module.apply_to_config(config)
	-- scrollbar
	config.enable_scroll_bar = false
	config.scrollback_lines = 3500

	-- misc
	config.audible_bell = "Disabled"

	-- tab
	config.switch_to_last_active_tab_when_closing_tab = true
end

return module
