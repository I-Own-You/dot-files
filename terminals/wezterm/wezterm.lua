local wezterm = require("wezterm")
local config = wezterm.config_builder()

local properties = require("properties")
local keymaps = require("keymaps")
local colors_and_styling = require("colors_and_styling")

properties.apply_to_config(config)
keymaps.apply_to_config(config)
colors_and_styling.apply_to_config(config)

return config
