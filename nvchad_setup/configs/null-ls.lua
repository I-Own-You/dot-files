local null_ls = require("null-ls")

local b = null_ls.builtins

local sources = {

	-- webdev stuff
	-- b.formatting.deno_fmt, -- choosed deno for ts/js files cuz its very fast!
	-- b.formatting.prettier.with({ filetypes = { "html", "markdown", "css" } }), -- so prettier works only on these filetypes
	b.formatting.prettierd,
	-- Lua
	b.formatting.stylua,

	-- cpp
	b.formatting.clang_format,

	b.formatting.black.with({ extra_args = { "--line-length", "200", "--skip-string-normalization", "--fast" } }),
	b.diagnostics.ruff.with({ extra_args = { "--ignore=E501" } }),
	b.formatting.isort,
	b.formatting.autoflake.with({ extra_args = { "--remove-all-unused-imports" } }),
	-- formatting.rustywind.with({
	-- 	filetypes = {
	-- 		"javascript",
	-- 		"javascriptreact",
	-- 		"typescript",
	-- 		"typescriptreact",
	-- 		"vue",
	-- 		"svelte",
	-- 		"html",
	-- 		"htmldjango",
	-- 	},
	-- }),
	-- formatting.autopep8,
}

null_ls.setup({
	debug = true,
	sources = sources,
})
