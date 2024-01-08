local M = {}

M.treesitter = {
	ensure_installed = {
		"vim",
		"lua",
		"html",
		"htmldjango",
		"css",
		"javascript",
		"typescript",
		"json",
		"tsx",
		"prisma",
		"markdown",
		"markdown_inline",
	},
	indent = {
		enable = true,
		-- disable = {
		--   "python"
		-- },
	},
	matchup = {
		enable = true,
		enable_quotes = true,
		-- disable = { "c", "ruby" },
	},
	-- ignore_install = { "" }, -- List of parsers to ignore installing
	highlight = {
		enable = true, -- false will disable the whole extension
		-- disable = { "" }, -- list of language that will be disabled
	},
	autopairs = {
		enable = true,
	},
	-- context_commentstring = {
	-- 	enable = true,
	-- 	enable_autocmd = false,
	-- },
	autotag = {
		enable = true,
		enable_rename = true,
		enable_close = true,
		enable_close_on_slash = true,
	},
}

M.mason = {
	ensure_installed = {
		-- lua stuff
		"lua-language-server",
		"stylua",

		-- web dev stuff
		"css-lsp",
		"html-lsp",
		"typescript-language-server",
		"deno",
		"prettier",

		-- c/cpp stuff
		"clangd",
		"clang-format",
		-- "pyright",
		-- "pylsp",
		-- "pylyzer",
		-- "tailwindcss",
		-- "bashls",
		"json-lsp",
		-- "yamlls",
		-- "ruff_lsp",
		-- "eslint",
		"biome",
		"prisma-language-server",
		"cssmodules_ls",
	},
}

-- git support in nvimtree
M.nvimtree = {
	git = {
		enable = true,
	},

	renderer = {
		highlight_git = true,
		icons = {
			show = {
				git = true,
			},
		},
	},
}

M.numb = {
	-- show_numbers = true, -- Enable 'number' for the window while peeking
	-- show_cursorline = true, -- Enable 'cursorline' for the window while peeking
	-- hide_relativenumbers = true -- Enable turning off 'relativenumber' for the window while peeking
	number_only = false, -- Peek only when the command is only a number instead of when it starts with a number
	centered_peeking = true, -- Peeked line will be centered relative to window
}

M.nvimbqf = {
	preview = {
		winblend = 0,
	},
}

M.nvimcolorizer = {
	filetypes = { "typescript", "javascript", "typescriptreact", "javascriptreact", "css", "scss", "sass", "text" },
	user_default_options = {
		RGB = true, -- #RGB hex codes
		RRGGBB = true, -- #RRGGBB hex codes
		names = true, -- "Name" codes like Blue or blue
		RRGGBBAA = false, -- #RRGGBBAA hex codes
		AARRGGBB = false, -- 0xAARRGGBB hex codes
		rgb_fn = false, -- CSS rgb() and rgba() functions
		hsl_fn = false, -- CSS hsl() and hsla() functions
		css = false, -- Enable all CSS features: rgb_fn, hsl_fn, names, RGB, RRGGBB
		css_fn = false, -- Enable all CSS *functions*: rgb_fn, hsl_fn
		-- Available modes for `mode`: foreground, background,  virtualtext
		mode = "background", -- Set the display mode.
		-- Available methods are false / true / "normal" / "lsp" / "both"
		-- True is same as normal
		tailwind = true, -- Enable tailwind colors
		-- parsers can contain values used in |user_default_options|
		sass = { enable = true, parsers = { "css" } }, -- Enable sass colors
		virtualtext = "■",
		-- update color values even if buffer is not focused
		-- example use: cmp_menu, cmp_docs
		always_update = false,
	},
	-- all the sub-options of filetypes apply to buftypes
	buftypes = {},
}

M.autopairs = {
	check_ts = true,
	ts_config = {
		lua = { "string", "source" },
		javascript = { "string", "template_string" },
	},
	disable_filetype = { "TelescopePrompt", "spectre_panel", "vim" },
	fast_wrap = {
		map = "<M-e>",
		chars = { "{", "[", "(", '"', "'" },
		pattern = string.gsub([[ [%'%"%)%>%]%)%}%,] ]], "%s+", ""),
		offset = 0, -- Offset from pattern match
		end_key = "$",
		keys = "qwertyuiopzxcvbnmasdfghjkl",
		check_comma = true,
		highlight = "PmenuSel",
		highlight_grey = "LineNr",
	},
}

M.treesj = {
	use_default_keymaps = false,
	max_join_length = 999,
}

M.surround = {
	move_cursor = false,
}

M.possession = {
	silent = false,
	load_silent = true,
	debug = false,
	logfile = false,
	prompt_no_cr = false,
	autosave = {
		current = true, -- or fun(name): boolean
		tmp = false, -- or fun(): boolean
		tmp_name = "tmp", -- or fun(): string
		on_load = true,
		on_quit = true,
	},
	commands = {
		save = "PossessionSave",
		load = "PossessionLoad",
		rename = "PossessionRename",
		close = "PossessionClose",
		delete = "PossessionDelete",
		show = "PossessionShow",
		list = "PossessionList",
		migrate = "PossessionMigrate",
	},
	hooks = {
		before_save = function(name)
			return {}
		end,
		after_save = function(name, user_data, aborted) end,
		before_load = function(name, user_data)
			return user_data
		end,
		after_load = function(name, user_data) end,
	},
	plugins = {
		close_windows = {
			hooks = { "before_save", "before_load" },
			preserve_layout = true, -- or fun(win): boolean
			match = {
				floating = true,
				buftype = {},
				filetype = {},
				custom = false, -- or fun(win): boolean
			},
		},
		-- delete_hidden_buffers = {
		-- 	hooks = {
		-- 		"before_load",
		-- 		vim.o.sessionoptions:match("buffer") and "before_save",
		-- 	},
		-- 	force = false, -- or fun(buf): boolean
		-- },
		nvim_tree = true,
		tabby = true,
		dap = true,
		delete_buffers = true,
		delete_hidden_buffers = false,
	},
	telescope = {
		list = {
			default_action = "load",
			mappings = {
				save = { n = "<c-s>", i = "<c-s>" },
				load = { n = "<CR>", i = "<CR>" },
				delete = { n = "<c-x>", i = "<c-x>" },
				rename = { n = "<c-r>", i = "<c-r>" },
			},
		},
	},
}

M.telescopeundo = {
	extensions = {
		import = {
			insert_at_top = true,
		},
	},
}

M.tsautotag = {
	filetypes = {
		"html",
		"javascript",
		"typescript",
		"javascriptreact",
		"typescriptreact",
		"svelte",
		"vue",
		"tsx",
		"jsx",
		"rescript",
		"xml",
		"php",
		"markdown",
		"astro",
		"glimmer",
		"handlebars",
		"hbs",
		"djangohtml",
		"htmldjango",
	},
	skip_tags = {
		"area",
		"base",
		"br",
		"col",
		"command",
		"embed",
		"hr",
		"img",
		"slot",
		"input",
		"keygen",
		"link",
		"meta",
		"param",
		"source",
		"track",
		"wbr",
		"menuitem",
	},
}

local handler = function(virtText, lnum, endLnum, width, truncate)
	local newVirtText = {}
	local suffix = ("  %d "):format(endLnum - lnum)
	local sufWidth = vim.fn.strdisplaywidth(suffix)
	local targetWidth = width - sufWidth
	local curWidth = 0
	for _, chunk in ipairs(virtText) do
		local chunkText = chunk[1]
		local chunkWidth = vim.fn.strdisplaywidth(chunkText)
		if targetWidth > curWidth + chunkWidth then
			table.insert(newVirtText, chunk)
		else
			chunkText = truncate(chunkText, targetWidth - curWidth)
			local hlGroup = chunk[2]
			table.insert(newVirtText, { chunkText, hlGroup })
			chunkWidth = vim.fn.strdisplaywidth(chunkText)
			-- str width returned from truncate() may less than 2nd argument, need padding
			if curWidth + chunkWidth < targetWidth then
				suffix = suffix .. (" "):rep(targetWidth - curWidth - chunkWidth)
			end
			break
		end
		curWidth = curWidth + chunkWidth
	end
	table.insert(newVirtText, { suffix, "MoreMsg" })
	return newVirtText
end

local ftMap = {
	vim = "indent",
	python = { "indent" },
	git = "",
}

M.ufo = {
	open_fold_hl_timeout = 150,
	-- close_fold_kinds = { "imports", "comment" },
	close_fold_kinds = {},
	preview = {
		win_config = {
			border = { "", "─", "", "", "", "─", "", "" },
			winhighlight = "Normal:Folded",
			winblend = 0,
		},
		mappings = {
			scrollU = "<C-u>",
			scrollD = "<C-d>",
			jumpTop = "[",
			jumpBot = "]",
		},
	},
	fold_virt_text_handler = handler,
	provider_selector = function(bufnr, filetype, buftype)
		-- if you prefer treesitter provider rather than lsp,
		-- return ftMap[filetype] or {'treesitter', 'indent'}
		return ftMap[filetype]

		-- refer to ./doc/example.lua for detail
	end,
}

M.dashboardnvim = {
	theme = "hyper", --  theme is doom and hyper default is hyper
	-- disable_move = false    --  default is false disable move keymap for hyper
	-- shortcut_type = 'letter'   --  shorcut type 'letter' or 'number'
	-- change_to_vcs_root =  -- default is false,for open file in hyper mru. it will change to the root of vcs
	config = {
		-- header -- type is table def
		-- week_header = {
		--   enable  --boolean use a week header
		--   concat  --concat string after time string line
		--   append  --table append after time string line
		-- },
		-- disable_move  -- boolean default is false disable move key

		-- week_header = {
		--   enable = true,
		-- },
		header = {
			"",
			" ⣿⣿⣷⡁⢆⠈⠕⢕⢂⢕⢂⢕⢂⢔⢂⢕⢄⠂⣂⠂⠆⢂⢕⢂⢕⢂⢕⢂⢕⢂ ",
			" ⣿⣿⣿⡷⠊⡢⡹⣦⡑⢂⢕⢂⢕⢂⢕⢂⠕⠔⠌⠝⠛⠶⠶⢶⣦⣄⢂⢕⢂⢕ ",
			" ⣿⣿⠏⣠⣾⣦⡐⢌⢿⣷⣦⣅⡑⠕⠡⠐⢿⠿⣛⠟⠛⠛⠛⠛⠡⢷⡈⢂⢕⢂ ",
			" ⠟⣡⣾⣿⣿⣿⣿⣦⣑⠝⢿⣿⣿⣿⣿⣿⡵⢁⣤⣶⣶⣿⢿⢿⢿⡟⢻⣤⢑⢂ ",
			" ⣾⣿⣿⡿⢟⣛⣻⣿⣿⣿⣦⣬⣙⣻⣿⣿⣷⣿⣿⢟⢝⢕⢕⢕⢕⢽⣿⣿⣷⣔ ",
			" ⣿⣿⠵⠚⠉⢀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⢕⢕⢕⢕⢕⢕⣽⣿⣿⣿⣿ ",
			" ⢷⣂⣠⣴⣾⡿⡿⡻⡻⣿⣿⣴⣿⣿⣿⣿⣿⣿⣷⣵⣵⣵⣷⣿⣿⣿⣿⣿⣿⡿ ",
			" ⢌⠻⣿⡿⡫⡪⡪⡪⡪⣺⣿⣿⣿⣿⣿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃ ",
			" ⠣⡁⠹⡪⡪⡪⡪⣪⣾⣿⣿⣿⣿⠋⠐⢉⢍⢄⢌⠻⣿⣿⣿⣿⣿⣿⣿⣿⠏⠈ ",
			" ⡣⡘⢄⠙⣾⣾⣾⣿⣿⣿⣿⣿⣿⡀⢐⢕⢕⢕⢕⢕⡘⣿⣿⣿⣿⣿⣿⠏⠠⠈ ",
			" ⠌⢊⢂⢣⠹⣿⣿⣿⣿⣿⣿⣿⣿⣧⢐⢕⢕⢕⢕⢕⢅⣿⣿⣿⣿⡿⢋⢜⠠⠈ ",
			" ⠄⠁⠕⢝⡢⠈⠻⣿⣿⣿⣿⣿⣿⣿⣷⣕⣑⣑⣑⣵⣿⣿⣿⡿⢋⢔⢕⣿⠠⠈ ",
			" ⠨⡂⡀⢑⢕⡅⠂⠄⠉⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢋⢔⢕⢕⣿⣿⠠⠈ ",
			" ⠄⠪⣂⠁⢕⠆⠄⠂⠄⠁⡀⠂⡀⠄⢈⠉⢍⢛⢛⢛⢋⢔⢕⢕⢕⣽⣿⣿⠠⠈ ",
			"",
		},
		shortcut = {
			{ desc = "󰊳 Update", group = "@property", action = "Lazy update", key = "u" },
			{
				icon = " ",
				icon_hl = "@variable",
				desc = "Files",
				group = "Label",
				action = "FzfLua files",
				key = "f",
			},
			-- {
			--   desc = ' Apps',
			--   group = 'DiagnosticHint',
			--   action = 'Telescope app',
			--   key = 'a',
			-- },
			{
				desc = " sessions",
				group = "Number",
				action = "Telescope possession list",
				key = "s",
			},
			{
				desc = "󰳭 bye bye",
				group = "DevIconScheme",
				action = "exit",
				key = "q",
			},
		},
	}, --  config used for theme
	-- hide = {
	--   statusline = true,    -- hide statusline default is true
	--   tabline = true,       -- hide the tabline
	--   winbar = true,        -- hide winbar
	-- },
	-- preview = {
	-- command       -- preview command
	-- file_path     -- preview file path
	-- file_height   -- preview file height
	-- file_width    -- preview file width
	-- },
}

M.devdocs = {
	-- dir_path = vim.fn.stdpath("data") .. "/devdocs", -- installation directory
	telescope = {}, -- passed to the telescope picker
	telescope_alt = { -- when searching globally without preview
		layout_config = {
			width = 75,
		},
	},
	float_win = { -- passed to nvim_open_win(), see :h api-floatwin
		relative = "editor",
		height = 25,
		width = 100,
		border = "rounded",
	},
	wrap = false, -- text wrap, only applies to floating window
	--  install them: html, javascript, npm, react, express, react-router, css, typescript, python, django, tailwindcss, dom
	previewer_cmd = "glow",
	cmd_args = { "-s", "dark", "-w", "80" },
	-- cmd_ignore = {}, -- ignore cmd rendering for the listed docs
	-- picker_cmd = false, -- use cmd previewer in picker preview
	-- picker_cmd_args = {}, -- example using glow: { "-p" }
}

M.glow = {
	-- glow_path = "", -- will be filled automatically with your glow bin in $PATH, if any
	-- install_path = "~/.local/bin", -- default path for installing glow binary
	border = "solid", -- floating window border: | 'shadow' | 'none' | 'double' | 'rounded' | 'solid' | 'single' | 'rounded'
	-- style = "dark|light", -- filled automatically with your current editor background, you can override using glow json style
	pager = false,
	width = 100,
	height = 100,
	width_ratio = 0.7, -- maximum width of the Glow window compared to the nvim window size (overrides `width`)
	height_ratio = 0.7,
}

M.fundo = {
	-- archives_dir = vim.fn.stdpath("cache") .. path.separator .. "fundo", -- default
	limit_archives_size = 64, --defualt was 512
	-- fdssfsd
}

M.wtf = {
	-- it can also work with gpt
	popup_type = "popup", -- "popup" | "horizontal" | "vertical",
	language = "english",
}

M.smartsplits = {
	cursor_follows_swapped_bufs = true,
	-- at_edge = 'stop',
}

M.leetcode = {
	-- configuration goes here
	lang = "typescript",
	-- console = {
	-- 	size = {
	-- 		width = "75%", ---@type string | integer
	-- 		height = "75%", ---@type string | integer
	-- 	},
	-- 	dir = "row", ---@type "col" | "row"
	-- },

	-- description = {
	-- 	width = "40%", ---@type string | integer
	-- },
}

M.trouble = {
	cycle_results = false,
	action_keys = {
		jump = { "<cr>" },
		open_tab = { "t" },
		toggle_fold = { "zz" },
	},
}

M.pkginfo = {
	hide_up_to_date = true,
	icons = {
		style = {
			outdated = "| 󰎔 ",
		},
	},
}

M.yanky = {
	ring = { storage = "sqlite" },
	highlight = {
		on_put = false,
		on_yank = false,
		-- timer = 500,
	},
}

return M
