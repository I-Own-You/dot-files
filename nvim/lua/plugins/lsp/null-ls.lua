local null_ls_status_ok, null_ls = pcall(require, "null-ls")
if not null_ls_status_ok then
	return
end

-- shfmt
-- shellharden
-- biome
-- black
-- isort
-- prettier
-- prettierd
-- stylua

-- https://github.com/jose-elias-alvarez/null-ls.nvim/tree/main/lua/null-ls/builtins/formatting
local formatting = null_ls.builtins.formatting
-- https://github.com/jose-elias-alvarez/null-ls.nvim/tree/main/lua/null-ls/builtins/diagnostics
local diagnostics = null_ls.builtins.diagnostics

null_ls.setup({
	debug = false,
	sources = {
		--formatting.prettier.with({ extra_args = { "--no-semi", "--single-quote", "--jsx-single-quote" } }),
		formatting.prettierd,
		formatting.black.with({ extra_args = { "--line-length", "200", "--skip-string-normalization", "--fast" } }),
		formatting.stylua,
		formatting.isort,
		formatting.shellharden,
		formatting.shfmt,
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
	},
})
