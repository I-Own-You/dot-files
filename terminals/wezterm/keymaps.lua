local wezterm = require("wezterm")
local action = wezterm.action

local module = {}

function module.apply_to_config(config)
	config.disable_default_key_bindings = true

	config.keys = {
		-- { key = "Tab", mods = "CTRL", action = action.ActivateTabRelative(1) },
		-- { key = "Tab", mods = "SHIFT|CTRL", action = action.ActivateTabRelative(-1) },
		{ key = "+", mods = "SHIFT|CTRL", action = action.IncreaseFontSize },
		{ key = "=", mods = "SHIFT|CTRL", action = action.IncreaseFontSize },

		{ key = "-", mods = "SHIFT|CTRL", action = action.DecreaseFontSize },
		{ key = "_", mods = "SHIFT|CTRL", action = action.DecreaseFontSize },

		{ key = ")", mods = "SHIFT|CTRL", action = action.ResetFontSize },
		{ key = "0", mods = "SHIFT|CTRL", action = action.ResetFontSize },

		{ key = "c", mods = "SHIFT|CTRL", action = action.CopyTo("Clipboard") },
		{ key = "v", mods = "SHIFT|CTRL", action = action.PasteFrom("Clipboard") },

		{
			key = "Enter",
			mods = "ALT",
			action = action.ActivateKeyTable({
				name = "split_and_activate_pane",
				one_shot = false,
			}),
		},
	}

	-- for workspace keymaps
	wezterm.on("update-right-status", function(window, pane)
		window:set_right_status(window:active_workspace())
	end)

	config.key_tables = {
		search_mode = {
			{ key = "Enter", mods = "NONE", action = action.CopyMode("PriorMatch") },
			{ key = "Enter", mods = "SHIFT", action = action.CopyMode("NextMatch") },
			{ key = "Escape", mods = "NONE", action = action.CopyMode("Close") },
			{ key = "c", mods = "CTRL", action = action.CopyMode("Close") },
			{ key = "n", mods = "CTRL", action = action.CopyMode("NextMatch") },
			{ key = "p", mods = "CTRL", action = action.CopyMode("PriorMatch") },
			{ key = "r", mods = "CTRL", action = action.CopyMode("CycleMatchType") },
			{ key = "w", mods = "CTRL", action = action.CopyMode("ClearPattern") },
			{ key = "n", mods = "ALT", action = action.CopyMode("PriorMatchPage") },
			{ key = "p", mods = "ALT", action = action.CopyMode("NextMatchPage") },
			{ key = "f", mods = "CTRL|SHIFT", action = action.CopyMode("Close") },
			{ key = "h", mods = "SHIFT|CTRL", action = wezterm.action.Search({ Regex = "[a-f0-9]{6,}" }) },
		},
		copy_mode = {
			{ key = "Escape", mods = "NONE", action = action.CopyMode("Close") },

			{ key = "$", mods = "SHIFT", action = action.CopyMode("MoveToEndOfLineContent") },
			{ key = "0", mods = "NONE", action = action.CopyMode("MoveToStartOfLine") },

			{ key = ",", mods = "NONE", action = action.CopyMode("JumpReverse") },
			{ key = ".", mods = "NONE", action = action.CopyMode("JumpAgain") },
			{ key = "f", mods = "NONE", action = action.CopyMode({ JumpForward = { prev_char = false } }) },
			{ key = "f", mods = "SHIFT", action = action.CopyMode({ JumpBackward = { prev_char = false } }) },
			{ key = "t", mods = "NONE", action = action.CopyMode({ JumpForward = { prev_char = true } }) },
			{ key = "t", mods = "SHIFT", action = action.CopyMode({ JumpBackward = { prev_char = true } }) },

			{ key = "g", mods = "NONE", action = action.CopyMode("MoveToScrollbackTop") },
			{ key = "g", mods = "SHIFT", action = action.CopyMode("MoveToScrollbackBottom") },
			{ key = "h", mods = "SHIFT", action = action.CopyMode("MoveToViewportTop") },
			{ key = "l", mods = "SHIFT", action = action.CopyMode("MoveToViewportBottom") },
			{ key = "m", mods = "SHIFT", action = action.CopyMode("MoveToViewportMiddle") },
			{ key = "f", mods = "CTRL", action = action.CopyMode("PageDown") },
			{ key = "b", mods = "CTRL", action = action.CopyMode("PageUp") },
			{ key = "u", mods = "CTRL", action = action.CopyMode({ MoveByPage = -0.5 }) },
			{ key = "d", mods = "CTRL", action = action.CopyMode({ MoveByPage = 0.5 }) },

			{ key = "v", mods = "NONE", action = action.CopyMode({ SetSelectionMode = "Cell" }) },
			{ key = "v", mods = "CTRL", action = action.CopyMode({ SetSelectionMode = "Block" }) },
			{ key = "v", mods = "SHIFT", action = action.CopyMode({ SetSelectionMode = "Line" }) },
			{ key = "o", mods = "NONE", action = action.CopyMode("MoveToSelectionOtherEnd") },
			{ key = "o", mods = "SHIFT", action = action.CopyMode("MoveToSelectionOtherEndHoriz") },

			{ key = "w", mods = "NONE", action = action.CopyMode("MoveForwardWord") },
			{ key = "b", mods = "NONE", action = action.CopyMode("MoveBackwardWord") },
			{ key = "e", mods = "NONE", action = action.CopyMode("MoveForwardWordEnd") },
			{ key = "h", mods = "NONE", action = action.CopyMode("MoveLeft") },
			{ key = "j", mods = "NONE", action = action.CopyMode("MoveDown") },
			{ key = "k", mods = "NONE", action = action.CopyMode("MoveUp") },
			{ key = "l", mods = "NONE", action = action.CopyMode("MoveRight") },

			{
				key = "y",
				mods = "NONE",
				action = action.CopyTo("ClipboardAndPrimarySelection"),
				-- action = action.Multiple({ { CopyTo = "ClipboardAndPrimarySelection" }, { CopyMode = "Close" } }),
			},

			{ key = "q", mods = "NONE", action = action.CopyMode("Close") },
			{ key = "c", mods = "CTRL", action = action.CopyMode("Close") },
			{ key = "_", mods = "SHIFT", action = action.CopyMode("MoveToStartOfLineContent") },
		},

		split_and_activate_pane = {

			{ key = "h", action = action.ActivatePaneDirection("Left") },
			{ key = "l", action = action.ActivatePaneDirection("Right") },
			{ key = "k", action = action.ActivatePaneDirection("Up") },
			{ key = "j", action = action.ActivatePaneDirection("Down") },

			{ key = "h", mods = "ALT|SHIFT", action = action.SplitPane({ direction = "Left" }) },
			{ key = "l", mods = "ALT|SHIFT", action = action.SplitPane({ direction = "Right" }) },
			{ key = "k", mods = "ALT|SHIFT", action = action.SplitPane({ direction = "Up" }) },
			{ key = "j", mods = "ALT|SHIFT", action = action.SplitPane({ direction = "Down" }) },

			{ key = "/", mods = "", action = action.TogglePaneZoomState },

			{ key = "w", mods = "ALT", action = action.CloseCurrentPane({ confirm = true }) },
			{ key = "w", mods = "ALT|SHIFT", action = action.CloseCurrentTab({ confirm = true }) },

			{ key = ",", mods = "", action = action.ActivateTabRelative(-1) },
			{ key = ".", mods = "", action = action.ActivateTabRelative(1) },
			{ key = ",", mods = "ALT", action = action.MoveTabRelative(-1) },
			{ key = ".", mods = "ALT", action = action.MoveTabRelative(1) },

			{ key = "!", mods = "SHIFT", action = action.ActivateCommandPalette },
			{ key = "~", mods = "SHIFT", action = action.ShowDebugOverlay },
			{ key = "@", mods = "SHIFT", action = action.ReloadConfiguration },
			{ key = "#", mods = "SHIFT", action = action.ClearScrollback("ScrollbackOnly") },

			{ key = "f", mods = "", action = action.Search("CurrentSelectionOrEmptyString") },
			{ key = "x", mods = "CTRL", action = action.ActivateCopyMode },

			{ key = "k", mods = "ALT", action = action.ScrollByPage(-1) },
			{ key = "j", mods = "ALT", action = action.ScrollByPage(1) },
			{ key = "k", mods = "SHIFT", action = action.ScrollByLine(-1) },
			{ key = "j", mods = "SHIFT", action = action.ScrollByLine(1) },
			{ key = "k", mods = "CTRL", action = action.ScrollToPrompt(-1) },
			{ key = "j", mods = "CTRL", action = action.ScrollToPrompt(1) },

			{ key = "t", mods = "ALT", action = action.SpawnTab("CurrentPaneDomain") },
			{ key = "n", mods = "ALT", action = action.SpawnWindow },

			{ key = "Tab", mods = "CTRL", action = wezterm.action.ShowTabNavigator },
			{
				key = "Tab",
				mods = "CTRL|SHIFT",
				action = action.ActivateKeyTable({ name = "workspace_actions", one_shot = true }),
			},
			{
				key = "p",
				mods = "ALT",
				action = action.ActivateKeyTable({ name = "pane_table_commands", one_shot = false }),
			},
			{
				key = "r",
				mods = "ALT",
				action = action.ActivateKeyTable({ name = "resize_pane", one_shot = false }),
			},

			{ key = "c", mods = "CTRL", action = "PopKeyTable" },
			{ key = "Escape", mods = "", action = "PopKeyTable" },
		},

		resize_pane = {
			{ key = "h", mods = "ALT|SHIFT", action = action.AdjustPaneSize({ "Left", 5 }) },
			{ key = "l", mods = "ALT|SHIFT", action = action.AdjustPaneSize({ "Right", 5 }) },
			{ key = "k", mods = "ALT|SHIFT", action = action.AdjustPaneSize({ "Up", 5 }) },
			{ key = "j", mods = "ALT|SHIFT", action = action.AdjustPaneSize({ "Down", 5 }) },
		},

		pane_table_commands = {
			{
				key = "s",
				mods = "",
				action = action.PaneSelect({
					mode = "SwapWithActiveKeepFocus",
				}),
			},
			{
				key = "t",
				mods = "",
				action = action.PaneSelect({
					mode = "MoveToNewTab",
				}),
			},
			{
				key = "n",
				mods = "",
				action = action.PaneSelect({
					mode = "MoveToNewWindow",
				}),
			},
		},

		workspace_actions = {
			{
				key = "l",
				mods = "",
				action = action.ShowLauncherArgs({
					flags = "FUZZY|WORKSPACES",
				}),
			},
			{
				key = "a",
				mods = "",
				action = action.PromptInputLine({
					description = wezterm.format({
						{ Attribute = { Intensity = "Bold" } },
						{ Foreground = { AnsiColor = "Fuchsia" } },
						{ Text = "Enter name for new workspace" },
					}),
					action = wezterm.action_callback(function(window, pane, line)
						if line then
							window:perform_action(
								action.SwitchToWorkspace({
									name = line,
								}),
								pane
							)
						end
					end),
				}),
			},
		},
	}
end

return module
