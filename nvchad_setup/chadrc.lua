---@type ChadrcConfig
local M = {}

-- Path to overriding theme and highlights files
local highlights = require("custom.highlights")

M.ui = {
	statusline = {
		theme = "minimal",
		-- overriden_modules = function(modules)
			-- Insert your module at index 2:
			-- table.insert(
			-- 	modules,
			-- 	7,
			-- 	(function()
			-- 		return "AI:" .. vim.fn["codeium#GetStatusString"]() .. "   "
			-- 	end)()
			-- )
			-- return modules
		-- end,
	},
	theme = "everblush",
	theme_toggle = { "everblush", "one_light" },

	hl_override = highlights.override,
	hl_add = highlights.add,
}

M.plugins = "custom.plugins"

-- check core.mappings for table structure
M.mappings = require("custom.mappings")

M.ui.extended_integrations = { "todo" }

return M
