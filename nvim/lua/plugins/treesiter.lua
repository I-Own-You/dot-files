return {
	matchup = {
		enable = true, -- mandatory, false will disable the whole extension
		enable_quotes = true,
		-- disable = { "c", "ruby" },  -- optional, list of language that will be disabled
		-- [options]
	},
	ensure_installed = {
		"python",
		"javascript",
		"typescript",
		"lua",
		"json",
		"jsonc",
		"html",
		"xml",
		"toml",
		"graphql",
		"http",
		"htmldjango",
		"rasi",
		"css",
		"prisma",
		"tsx",
		"vim",
		"json",
		"regex",
		"go",
		"gosum",
		"gotmpl",
		"gomod",
		"gowork",
		"prisma",
		"markdown",
		"markdown_inline",
		"sql",
		"bash",
	},
	ignore_install = { "" }, -- List of parsers to ignore installing
	highlight = {
		enable = true, -- false will disable the whole extension
		disable = { "" }, -- list of language that will be disabled
	},
	autopairs = {
		enable = true,
	},
	indent = {
		enable = true,
		disable = { "python" },
	},
	context_commentstring = {
		enable = true,
		enable_autocmd = false,
	},
	autotag = {
		enable = true,
		enable_rename = true,
		enable_close = true,
		enable_close_on_slash = true,
	},
}
