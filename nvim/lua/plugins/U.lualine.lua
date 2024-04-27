local status_ok, lualine = pcall(require, "lualine")
if not status_ok then
	return
end

local colors = {
	black = "#1c1e26",
	white = "#6C6F93",
	red = "#F43E5C",
	green = "#09F7A0",
	blue = "#25B2BC",
	yellow = "#F09383",
	gray = "#E95678",
	-- darkgray     = '#1A1C23',
	lightgray = "#2E303E",
	inactivegray = "#1C1E26",
}

local function session_name()
	return "s: " .. require("possession.session").session_name or ""
end

local function count_buffers()
	local buffers = vim.fn.getbufinfo({ buflisted = 1 })
	return "b: " .. #buffers
end

local function count_tabs()
	local tabs = vim.fn.tabpagenr("$")
	return "t: " .. tabs
end

return {
	options = {
		icons_enabled = true,
		theme = "auto",
		component_separators = { left = "", right = "" },
		-- section_separators = { left = '', right = ''},
		section_separators = { left = "", right = "" },
		disabled_filetypes = {
			statusline = {},
			winbar = {},
		},
		ignore_focus = {},
		always_divide_middle = true,
		globalstatus = true,
		refresh = {
			statusline = 100,
			tabline = 100,
			winbar = 100,
		},
	},
	sections = {
		lualine_a = {
			{
				"mode",
				separator = {
					-- left = '',
					right = "",
				},
				right_padding = 2,
			},
		},
		lualine_b = { "branch", "diff" },
		lualine_c = {},
		lualine_x = {
			-- function()
			-- dont use [ram, internet/wifi], it lags idk why on my pc
			-- local cpu = require("pigeon.hostname").hostname()
			--     return cpu
			-- end,
			function()
				return vim.fn["codeium#GetStatusString"]()
			end,
			"diagnostics",
			"filename",
			{ session_name, color = { fg = "#9AE38A" } },
			{ count_buffers, color = { fg = "#6cbfbf" } },
			{ count_tabs, color = { fg = "#6cbfbf" } },
			-- "encoding",
			-- "filetype",
		},
		lualine_y = { "progress" },
		lualine_z = { "location" },
	},
	inactive_sections = {
		lualine_a = {},
		lualine_b = {},
		lualine_c = { "filename", session_name },
		lualine_x = { "location" },
		lualine_y = {},
		lualine_z = {},
	},
	tabline = {},
	winbar = {},
	inactive_winbar = {},
	extensions = {},
}
