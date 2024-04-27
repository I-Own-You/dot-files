local M = {}

local status_cmp_ok, cmp_nvim_lsp = pcall(require, "cmp_nvim_lsp")
if not status_cmp_ok then
	return
end

M.capabilities = vim.lsp.protocol.make_client_capabilities()
M.capabilities.textDocument.completion.completionItem.snippetSupport = true
-- for ufo.nvim folding
M.capabilities.textDocument.foldingRange = {
	dynamicRegistration = false,
	lineFoldingOnly = true,
}

M.capabilities = cmp_nvim_lsp.default_capabilities(M.capabilities)

M.setup = function()
	local signs = {
		{ name = "DiagnosticSignError", text = "" },
		{ name = "DiagnosticSignWarn", text = "" },
		{ name = "DiagnosticSignHint", text = "" },
		{ name = "DiagnosticSignInfo", text = "" },
		-- { name = "DiagnosticSignWarn", text = "" },
		-- { name = "DiagnosticSignHint", text = "" },
		-- { name = "DiagnosticSignInfo", text = "" },
	}

	for _, sign in ipairs(signs) do
		vim.fn.sign_define(sign.name, { texthl = sign.name, text = sign.text, numhl = "" })
	end

	local config = {
		virtual_text = false, -- disable virtual text
		signs = {
			active = signs, -- show signs
		},
		update_in_insert = false,
		underline = false,
		severity_sort = true,
		float = {
			focusable = true,
			style = "minimal",
			border = "rounded",
			source = "always",
			header = "",
			prefix = "",
		},
	}

	vim.diagnostic.config(config)

	vim.lsp.handlers["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, {
		border = "rounded",
	})

	vim.lsp.handlers["textDocument/signatureHelp"] = vim.lsp.with(vim.lsp.handlers.signature_help, {
		border = "rounded",
	})
end

local function lsp_keymaps(bufnr)
	local opts = { noremap = true, silent = true }
	local keymap = vim.api.nvim_buf_set_keymap

	vim.api.nvim_buf_set_option(bufnr, "omnifunc", "v:lua.vim.lsp.omnifunc")

	keymap(bufnr, "n", "gd", "<cmd>lua vim.lsp.buf.definition()<CR>", opts) --keymaps.lua
	keymap(bufnr, "n", "gr", "<cmd>lua vim.lsp.buf.references()<CR>", opts) --keymaps.lua
	-- keymap(bufnr, "n", "<leader>wa", "<cmd> lua vim.lsp.buf.add_workspace_folder()<CR>", opts)
	-- keymap(bufnr, "n", "<leader>wr", "<cmd> lua vim.lsp.buf.remove_workspace_folder()<CR>", opts)
	-- keymap(bufnr, "n", "<leader>wl", "<cmd> lua print(vim.inspect(vim.lsp.buf.list_workspace_folders()))<CR>", opts)
	keymap(bufnr, "n", "<leader>re", "<cmd> lua vim.lsp.buf.rename()<CR>", opts)
	-- keymap(bufnr, "n", "<leader>ca", "<cmd>lua vim.lsp.buf.code_action()<cr>", opts) --keymaps.lua
	-- keymap(bufnr, "n", "<leader>lq", "<cmd>lua vim.diagnostic.setloclist()<CR>", opts) --keymaps.lua
	-- keymap(bufnr, "n", "<leader>oo", "<cmd>lua vim.lsp.buf.document_symbol()<CR>", opts)
	keymap(bufnr, "n", "<leader>rr", "<cmd>lua vim.lsp.buf.format{ async = true }<cr>", { silent = true })
	keymap(bufnr, "n", "gD", ":lua vim.lsp.buf.declaration()<CR>", opts)
	keymap(bufnr, "n", "K", "<cmd>lua vim.lsp.buf.hover()<CR>", opts)
	keymap(bufnr, "n", "gi", ":lua vim.lsp.buf.implementation()<CR>", opts)
	keymap(bufnr, "n", "ge", "<cmd>lua vim.diagnostic.goto_next({buffer=0, float=false})<cr>", opts)
	keymap(bufnr, "n", "<leader>lq", "<cmd>lua vim.diagnostic.setloclist()<cr>", opts)
	keymap(bufnr, "n", "gE", "<cmd>lua vim.diagnostic.goto_prev({buffer=0})<cr>", opts)
	keymap(bufnr, "n", "<leader>rt", "<cmd>EslintFixAll<cr>", { silent = true })
	keymap(bufnr, "n", "<leader>D", ":lua vim.lsp.buf.type_definition()<CR>", opts)
	keymap(bufnr, "n", "<leader>ma", "<cmd>Mason<cr>", opts)
	keymap(bufnr, "n", "<leader>lI", "<cmd>NullLsInfo<cr>", opts)
	keymap(bufnr, "n", "<leader>fl", "<cmd>lua vim.diagnostic.open_float()<cr>", opts)
	keymap(bufnr, "n", "<leader>ls", "<cmd>lua vim.lsp.buf.signature_help()<CR>", opts)
end

M.on_attach = function(client, bufnr)
	if client.name == "tsserver" then
		client.server_capabilities.documentFormattingProvider = false
	end

	if client.name == "lua_ls" then
		client.server_capabilities.documentFormattingProvider = false
	end

	if client.name == "pylsp" then
		client.server_capabilities.documentSymbolProvider = false
	end

	lsp_keymaps(bufnr)
	local status_ok, illuminate = pcall(require, "illuminate")
	if not status_ok then
		return
	end
	illuminate.on_attach(client)
end
return M
