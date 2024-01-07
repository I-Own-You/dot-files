---@type MappingsTable
local M = {}

M.disabled = {
	i = {
		["<C-b>"] = "",
		["<C-e>"] = "",
		["<C-h>"] = "",
		["<C-l>"] = "",
		["<C-j>"] = "",
		["<C-k>"] = "",
	},
	n = {
		["K"] = "",
		["<leader>wl"] = "",
		["<leader>ca"] = "",
		["<leader>wr"] = "",
		["<leader>wa"] = "",
		["[d"] = "",
		["]d"] = "",
		["<leader>lf"] = "",
		["<leader>ra"] = "",
		["<leader>x"] = "",
		["<tab>"] = "",
		["<S-tab>"] = "",
		["<leader>q"] = "",
		["<C-n>"] = "",
		["<leader>e"] = "",
		["<leader>cc"] = "",
		["<Esc>"] = "",
		["<C-s>"] = "",
		["<leader>n"] = "",
		["<leader>rn"] = "",
		["<leader>b"] = "",
		["<leader>ch"] = "",
		["<leader>fm"] = "",
		["<leader>/"] = "",
		["<leader>ff"] = "",
		["<leader>fa"] = "",
		["<leader>fw"] = "",
		["<leader>fb"] = "",
		["<leader>fh"] = "",
		["<leader>fo"] = "",
		["<leader>fz"] = "",
		["<leader>cm"] = "",
		["<leader>gt"] = "",
		["<leader>pt"] = "",
		["<leader>th"] = "",
		["<leader>ma"] = "",
		["<A-i>"] = "",
		["<A-h>"] = "",
		["<A-v>"] = "",
		["<leader>h"] = "",
		["<leader>v"] = "",
		["]c"] = "",
		["[c"] = "",
		["<leader>rh"] = "",
		["<leader>ph"] = "",
		["<leader>gb"] = "",
		["<leader>td"] = "",
	},
	t = {
		["<C-x>"] = "",
		["<A-i>"] = "",
		["<A-h>"] = "",
		["<A-v>"] = "",
	},
	x = {
		["p"] = "",
	},
	v = {
		["<leader>/"] = "",
	},
}

M.general = {
	i = {
		["jk"] = { "<ESC>", "exit insert mode" },
	},
	n = {
		["K"] = {
			function()
				vim.lsp.buf.hover()
			end,
			"LSP hover",
		},
		["<C-x>"] = { ":%d<CR>", "", opts = { silent = true } },
		["<C-a>"] = { "ggVG", "", opts = { silent = true } },
		["<leader>nb"] = { ":enew<cr>", "new buffer", opts = { silent = true } },
		["<leader>nt"] = { ":tabnew<CR>", "new tab", opts = { silent = true } },
		["<leader>ot"] = { ":tab split | terminal<CR>", "open terminal", opts = { silent = true } },
		["<leader>tc"] = { "<C-\\><C-n>", "exit terminal mode", opts = { silent = true } },
		["<leader>td"] = { ":TodoQuickFix<CR>", "open todos", opts = { silent = true } },
		["q"] = { "<Nop>", "nothing", opts = { silent = true } },
		["<leader>vv"] = { ":vsplit<CR>", "open vertical split", opts = { silent = true } },
		["<leader>hh"] = { ":split<CR>", "open horizontal split", opts = { silent = true } },
		["<leader>vd"] = { ":vert diffsplit ", "open simple diff", opts = { silent = true, noremap = true } },
		["<C-[>"] = { "[m", "go up bracket", opts = { silent = true } },
		["<C-]>"] = { "]m", "go down bracket", opts = { silent = true } },
		["<leader>ww"] = { ":set invwrap<CR>:set wrap?<CR>", "toggle wrap", opts = { silent = true } },
		["!"] = { ":!", "toggle comand", opts = { silent = true } },
		["<leader>nh"] = { ":nohlsearch<CR>", "remove search", opts = { silent = true } },
		["+"] = { "<C-a>", "", opts = { noremap = true, silent = true } },
		["-"] = { "<C-x>", "", opts = { noremap = true, silent = true } },
		["<leader>bo"] = { ":only<CR>", "clear all windows", opts = { silent = true } },
		["<leader>bda"] = { ":%bdelete<CR>", "clear all buffers", opts = { silent = true } },
		["<leader>bdo"] = { ":%bd|e#|bd#<CR>|'\"", "clear all buffers but not active", opts = { silent = true } },
		["<leader>to"] = { ":tabonly<CR>", "clear all tabs but not active", opts = { silent = true } },
		["<leader>la"] = { ":Lazy<CR>", "open lazy nvim", opts = { silent = true } },
		["<tab>"] = { ":tabNext<cr>", "next tab", opts = { nowait = true } },
		["<S-tab>"] = { ":tabprevious<cr>", "previous tab", opts = { nowait = true } },
		[";"] = { ":", "enter command mode", opts = { nowait = true } },
		["zz"] = { "za", "toggle fold", { noremap = true, silent = true } }, -- for
		["zR"] = {
			function()
				require("ufo").openAllFolds()
			end,
			"open all folds",
			{ silent = true },
		},
		["zM"] = {
			function()
				require("ufo").closeAllFolds()
			end,
			"close all folds",
			{ silent = true },
		},
		["<leader>kk"] = {
			function()
				local ok, start = require("indent_blankline.utils").get_current_context(
					vim.g.indent_blankline_context_patterns,
					vim.g.indent_blankline_use_treesitter_scope
				)

				if ok then
					vim.api.nvim_win_set_cursor(vim.api.nvim_get_current_win(), { start, 0 })
					vim.cmd([[normal! _]])
				end
			end,

			"Jump to current context",
		},
		["<leader>rr"] = {
			function()
				vim.lsp.buf.format({ async = true })
			end,
			"LSP formatting",
		},
		["<leader>re"] = {
			function()
				require("nvchad.renamer").open()
			end,
			"LSP rename",
		},
		["<leader>fl"] = {
			function()
				vim.diagnostic.open_float({ border = "rounded" })
			end,
			"Floating diagnostic",
		},
		["gE"] = {
			function()
				vim.diagnostic.goto_prev({ float = { border = "rounded" } })
			end,
			"Goto prev",
		},
		["ge"] = {
			function()
				vim.diagnostic.goto_next({ float = { border = "rounded" } })
			end,
			"Goto next",
		},
	},
	v = {
		[">"] = { ">gv", "indent" },
		[";"] = { ":", "enter command mode", opts = { nowait = true } },
		["+"] = { "<C-a>gv=gv", "", opts = { noremap = true, silent = true } },
		["-"] = { "<C-x>gv=gv", "", opts = { noremap = true, silent = true } },
	},
	x = {
		[";"] = { ":", "enter command mode", opts = { nowait = true } },
		["+"] = { "<C-a>", "", opts = { noremap = true, silent = true } },
		["-"] = { "<C-x>", "", opts = { noremap = true, silent = true } },
	},
}

-- more keybinds!

return M
