local overrides = require("custom.configs.overrides")

---@type NvPluginSpec[]
local plugins = {

	-- Override plugin definition options

	{
		"neovim/nvim-lspconfig",
		dependencies = {
			-- format & linting
			{
				"jose-elias-alvarez/null-ls.nvim",
				config = function()
					require("custom.configs.null-ls")
				end,
			},
		},
		config = function()
			require("plugins.configs.lspconfig")
			require("custom.configs.lspconfig")
		end, -- Override to setup mason-lspconfig
	},

	-- override plugin configs
	{
		"williamboman/mason.nvim",
		opts = overrides.mason,
	},

	{
		"nvim-treesitter/nvim-treesitter",
		opts = overrides.treesitter,
	},

	{
		"nvim-tree/nvim-tree.lua",
		enabled = false,
		opts = overrides.nvimtree,
	},

	-- Install a plugin
	{
		"max397574/better-escape.nvim",
		event = "InsertEnter",
		config = function()
			require("better_escape").setup()
		end,
	},

	{
		"nacro90/numb.nvim",
		event = "BufReadPost",
		opts = overrides.numb,
	},

	{
		"kevinhwang91/nvim-bqf",
		event = "BufReadPost",
		opts = overrides.nvimbqf,
	},

	{
		"NvChad/nvim-colorizer.lua",
		event = "BufReadPost",
		opts = overrides.nvimcolorizer,
	},

	{
		"numToStr/Comment.nvim",
		config = function(_, opts)
			require("Comment").setup(opts)
			local ft = require("Comment.ft")
			ft.scss = { "// %s", "/* %s */" }
		end,
	},

	{
		"moll/vim-bbye",
		keys = {
			{ "<leader>q", mode = "n", ":Bdelete!<cr>", desc = "delete buffer" },
		},
	},

	{
		"windwp/nvim-autopairs",
		opts = overrides.autopairs,
	},

	{
		"Wansmer/treesj",
		dependencies = { "nvim-treesitter" },
		opts = overrides.treesj,
		keys = {
			{ "<leader>j", mode = "n", "<cmd>TSJToggle<cr>", desc = "toggle node split", { silent = true } },
		},
	},

	{
		"andymass/vim-matchup",
		event = "BufReadPost",
	},

	{
		"kylechui/nvim-surround",
		version = "*",
		event = "BufReadPost",
		opts = overrides.surround,
	},

	{
		"jedrzejboczar/possession.nvim",
		keys = {
			{
				"<leader>sl",
				mode = "n",
				":Telescope possession list<CR>",
				desc = "Open sessions list",
				{ noremap = true, silent = true },
			},
			{ "<leader>ss", mode = "n", ":PossessionSave ", desc = "save session", { noremap = true } },
		},
		dependencies = { "nvim-lua/plenary.nvim" },
		opts = overrides.possession,
	},

	{
		"debugloop/telescope-undo.nvim",
		opts = overrides.telescopeundo,
		dependencies = {
			{
				"nvim-telescope/telescope.nvim",
				dependencies = { "nvim-lua/plenary.nvim" },
			},
		},
		keys = {
			{
				"<leader>tu",
				"<cmd>Telescope undo<cr>",
				desc = "undo history",
			},
		},
		config = function(_, opts)
			require("telescope").setup(opts)
			require("telescope").load_extension("undo")
		end,
	},

	{
		"folke/todo-comments.nvim",
		config = function()
			dofile(vim.g.base46_cache .. "todo")
			require("todo-comments").setup()
		end,
		event = "BufReadPost",
	},

	{
		"rbong/vim-flog",
		dependencies = { "tpope/vim-fugitive" },
		keys = {
			{ "<leader>fgg", mode = "n", ":Flog ", desc = "open floggit", { noremap = true } },
			{ "<leader>fb", mode = "n", ":Floggit ", desc = "open flog branch", { noremap = true } },
			{
				"<leader>gc",
				mode = "n",
				':Floggit commit -m ""<left>',
				desc = "open flog branch commit",
				{ noremap = true },
			},
			{ "<leader>gp", mode = "n", ":Floggit push<CR>", desc = "floggit push", { silent = true } },
			{ "<leader>fs", mode = "n", ":Flogsplit ", desc = "flog split", { noremap = true } },
		},
	},

	{
		"windwp/nvim-ts-autotag",
		ft = {
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
		opts = overrides.tsautotag,
	},

	{
		"folke/flash.nvim",
		event = "BufReadPost",
		---@type Flash.Config
		keys = {
			{ "s", mode = "n", "<cmd>lua require('flash').jump()<CR>", { noremap = true } },
			{ "s", mode = "x", "<cmd>lua require('flash').jump()<CR>", { noremap = true } },
			{ "s", mode = "o", "<cmd>lua require('flash').jump()<CR>", { noremap = true } },
			{ "S", mode = "n", "<cmd>lua require('flash').treesitter()<CR>", { noremap = true } },
			{ "S", mode = "o", "<cmd>lua require('flash').treesitter()<CR>", { noremap = true } },
			-- { "S", mode = "x", "<cmd>lua require('flash').treesitter()<CR>", { noremap = true } },
			{ "r", mode = "o", "<cmd>lua require('flash').remote()<CR>", { noremap = true } },
		},
	},

	{
		"sindrets/diffview.nvim",
		keys = {
			{ "<leader>mt", mode = "n", ":DiffviewOpen<CR>", desc = "open diff view" },
			{ "<leader>mf", mode = "n", ":DiffviewFileHistory<CR>", desc = "open diff view for single file" },
			{ "<leader>mk", mode = "n", ":DiffviewClose<CR>", desc = "close diff view" },
		},
	},

	{
		"kevinhwang91/nvim-ufo",
		event = "BufReadPost",
		dependencies = {
			"kevinhwang91/promise-async",
			{
				"luukvbaal/statuscol.nvim",
				event = "BufReadPost",
				config = function()
					local builtin = require("statuscol.builtin")
					require("statuscol").setup({
						relculright = true,
						segments = {
							{ text = { builtin.foldfunc }, click = "v:lua.ScFa" },
							{ text = { "%s" }, click = "v:lua.ScSa" },
							{ text = { builtin.lnumfunc, " " }, click = "v:lua.ScLa" },
						},
					})
					vim.api.nvim_set_hl(0, "FoldColumn", {
						fg = "#6CBFBF",
						bg = "#141B1E",
					})
				end,
				opts = overrides.statuscol,
			},
		},
		init = function()
			vim.o.fillchars = [[eob: ,fold: ,foldopen:,foldsep: ,foldclose:]]
			vim.opt.foldcolumn = "1" -- '0' is not bad
			vim.opt.foldlevel = 99 -- Using ufo provider need a large value, feel free to decrease the value
			vim.opt.foldlevelstart = 99
			vim.opt.foldenable = true
		end,
		opts = overrides.ufo,
	},

	{
		"utilyre/barbecue.nvim",
		event = "BufReadPost",
		name = "barbecue",
		version = "*",
		dependencies = {
			"SmiteshP/nvim-navic",
			"kyazdani42/nvim-web-devicons",
		},
		opts = {},
		keys = {
			{
				"<leader>kl",
				mode = "n",
				":lua require('barbecue.ui').navigate(-)<left>",
				desc = "go up context",
				{ silent = true },
			},
		},
	},

	{
		"glepnir/dashboard-nvim",
		event = "VimEnter",
		dependencies = { { "kyazdani42/nvim-web-devicons" } },
		opts = overrides.dashboardnvim,
	},

	{
		"luckasRanarison/nvim-devdocs",
		dependencies = {
			"nvim-lua/plenary.nvim",
			"nvim-telescope/telescope.nvim",
			"nvim-treesitter/nvim-treesitter",
		},
		keys = {
			{ "<leader>dd", mode = "n", ":DevdocsOpenFloat ", desc = "open devdocs" },
		},
		opts = overrides.devdocs,
	},

	{
		"ellisonleao/glow.nvim",
		opts = overrides.glow,
		cmd = "Glow",
	},

	{
		"kevinhwang91/nvim-fundo",
		event = "BufReadPost",
		dependencies = { "kevinhwang91/promise-async" },
		init = function()
			vim.o.undofile = true
		end,
		build = function()
			require("fundo").install()
		end,
		opts = overrides.fundo,
	},

	{
		"piersolenski/wtf.nvim",
		dependencies = {
			"MunifTanjim/nui.nvim",
		},
		opts = overrides.wtf,
		keys = {
			{ "<leader>wt", mode = "n", ":WtfSearch ", desc = "search error in google" },
		},
	},

	{
		-- NOTE: you can also make for another lang the import, look at github of the extension, in case
		"piersolenski/telescope-import.nvim",
		dependencies = "nvim-telescope/telescope.nvim",
		keys = {
			{ "<leader>ii", mode = "n", "<cmd>Telescope import<CR>", desc = "find imports" },
		},
		config = function(_, opts)
			require("telescope").setup(opts)
			require("telescope").load_extension("import")
		end,
	},

	{
		"mrjones2014/smart-splits.nvim",
		build = "./kitty/install-kittens.bash",
		opts = overrides.smartsplits,
		keys = {
			-- move between buffers
			-- commented because i dont need the cycle option, so it has a delay anyway, so its slower than neovim builtin
			-- { "<C-h>", '<cmd>lua require("smart-splits").move_cursor_left()<CR>' },
			-- { "<C-j>", '<cmd>lua require("smart-splits").move_cursor_down()<CR>' },
			-- { "<C-k>", '<cmd>lua require("smart-splits").move_cursor_up()<CR>' },
			-- { "<C-l>", '<cmd>lua require("smart-splits").move_cursor_right()<CR>' },
			-- resize buffers
			{ "<C-Left>", '<cmd>lua require("smart-splits").resize_left()<CR>' },
			{ "<C-Down>", '<cmd>lua require("smart-splits").resize_down()<CR>' },
			{ "<C-Up>", '<cmd>lua require("smart-splits").resize_up()<CR>' },
			{ "<C-Right>", '<cmd>lua require("smart-splits").resize_right()<CR>' },
			-- swapping buffers
			{ "<C-Space>h", '<cmd>lua require("smart-splits").swap_buf_left()<CR>' },
			{ "<C-Space>j", '<cmd>lua require("smart-splits").swap_buf_down()<CR>' },
			{ "<C-Space>k", '<cmd>lua require("smart-splits").swap_buf_up()<CR>' },
			{ "<C-Space>l", '<cmd>lua require("smart-splits").swap_buf_right()<CR>' },
		},
	},

	{
		"fedepujol/move.nvim",
		keys = {
			-- normal mode, move lines/words
			{ "<A-j>", ":MoveLine(1)<CR>" },
			{ "<A-k>", ":MoveLine(-1)<CR>" },
			{ "<A-h>", ":MoveWord(-1)<CR>" },
			{ "<A-l>", ":MoveWord(1)<CR>" },
			-- visual mode, move blocks
			{ "<A-j>", ":MoveBlock(1)<CR>", mode = "v" },
			{ "<A-k>", ":MoveBlock(-1)<CR>", mode = "v" },
			{ "<A-h>", ":MoveHBlock(-1)<CR>", mode = "v" },
			{ "<A-l>", ":MoveHBlock(1)<CR>", mode = "v" },
		},
	},

	{
		"kevinhwang91/nvim-hlslens",
		event = "BufReadPost",
		config = function()
			require("hlslens").setup()
		end,
		keys = {
			{
				"n",
				[[<Cmd>execute('normal! ' . v:count1 . 'n')<CR><Cmd>lua require('hlslens').start()<CR>]],
				mode = "n",
				{ noremap = true, silent = true },
			},
			{
				"N",
				[[<Cmd>execute('normal! ' . v:count1 . 'N')<CR><Cmd>lua require('hlslens').start()<CR>]],
				mode = "n",
				{ noremap = true, silent = true },
			},
			{ mode = "n", "*", [[*<Cmd>lua require('hlslens').start()<CR>]], { noremap = true, silent = true } },
			{ mode = "n", "#", [[#<Cmd>lua require('hlslens').start()<CR>]], { noremap = true, silent = true } },
			{ mode = "n", "g*", [[g*<Cmd>lua require('hlslens').start()<CR>]], { noremap = true, silent = true } },
			{ mode = "n", "g#", [[g#<Cmd>lua require('hlslens').start()<CR>]], { noremap = true, silent = true } },
		},
	},

	{
		"2kabhishek/nerdy.nvim",
		dependencies = {
			"stevearc/dressing.nvim",
			"nvim-telescope/telescope.nvim",
		},
		cmd = "Nerdy",
	},

	{
		"kawre/leetcode.nvim",
		build = ":TSUpdate html",
		dependencies = {
			"nvim-treesitter/nvim-treesitter",
			"nvim-telescope/telescope.nvim",
			"nvim-lua/plenary.nvim", -- required by telescope
			"MunifTanjim/nui.nvim",
			"kyazdani42/nvim-web-devicons",
			"rcarriga/nvim-notify",
		},
		opts = overrides.leetcode,
	},

	{
		"folke/trouble.nvim",
		dependencies = { "kyazdani42/nvim-web-devicons" },
		opts = overrides.trouble,
		keys = {
			{
				"<leader>lq",
				mode = "n",
				":Trouble document_diagnostics<CR>",
				desc = "document diagnostics with trouble",
			},
		},
	},

	{
		-- if you delete this plugin, delete also the keybinding form keymaps.lua
		"vuki656/package-info.nvim",
		ft = "json",
		dependencies = "MunifTanjim/nui.nvim",
		opts = overrides.pkginfo,
		keys = {
			-- { "<leader>nps", require("package-info").show },
			-- { "<leader>nph", require("package-info").hide },
			{
				"<leader>nps",
				mode = "n",
				":lua require('package-info').toggle()<CR>",
				desc = "toggle pkg json hide/show",
				{ silent = true },
			},
			{
				"<leader>npu",
				mode = "n",
				":lua require('package-info').update()<CR>",
				desc = "pkg json update",
				{ silent = true },
			},
			{
				"<leader>npd",
				mode = "n",
				":lua require('package-info').delete()<CR>",
				desc = "pkg json delete",
				{ silent = true },
			},
			{
				"<leader>npi",
				mode = "n",
				":lua require('package-info').install()<CR>",
				desc = "pkg json install",
				{ silent = true },
			},
			{
				"<leader>npc",
				mode = "n",
				":lua require('package-info').change_version()<CR>",
				desc = "pkg json change version",
				{ silent = true },
			},
		},
	},

	{
		"nvim-zh/colorful-winsep.nvim",
		config = true,
		event = { "WinNew" },
	},

	{
		"gbprod/yanky.nvim",
		dependencies = {
			{ "kkharji/sqlite.lua" },
		},
		opts = overrides.yanky,
		keys = {
			{ "y", "<Plug>(YankyYank)", mode = { "n", "x" }, desc = "Yank text" },
			{ "p", mode = "x", '"_d<Plug>(YankyPutAfter)', { silent = true } },
			{ "P", mode = "x", '"_d<Plug>(YankyPutBefore)', { silent = true } },
			-- { "p", "<Plug>(YankyPutAfter)", mode = { "n", "x" }, desc = "Put yanked text after cursor" },
			-- { "P", "<Plug>(YankyPutBefore)", mode = { "n", "x" }, desc = "Put yanked text before cursor" },
			{ "<c-p>", "<Plug>(YankyPreviousEntry)", desc = "Select previous entry through yank history" },
			{ "<c-n>", "<Plug>(YankyNextEntry)", desc = "Select next entry through yank history" },
		},
	},

	{
		"Exafunction/codeium.vim",
		event = "BufReadPost",
		init = function()
			vim.g.codeium_disable_bindings = 1
			vim.g.codeium_enabled = true
		end,
		config = function()
			vim.keymap.set("i", "<A-l>", function()
				return vim.fn["codeium#CycleCompletions"](1)
			end, { expr = true })
			vim.keymap.set("i", "<A-h>", function()
				return vim.fn["codeium#CycleCompletions"](-1)
			end, { expr = true })
			vim.keymap.set("i", "<c-x>", function()
				return vim.fn["codeium#Clear"]()
			end, { expr = true })
			vim.keymap.set("i", "<c-cr>", function()
				return vim.fn["codeium#Accept"]()
			end, { expr = true })
		end,
	},

	{
		"kevinhwang91/rnvimr",
		keys = {
			{ "<leader>e", mode = "n", ":RnvimrToggle<cr>", desc = "open ranger" },
		},
		init = function()
			vim.g.rnvimr_enable_ex = 1 -- Make Ranger to be hidden after picking a file--
			vim.g.rnvimr_enable_picker = 1 -- Replace `$EDITOR` candidate with this command to open the selected file"
			vim.g.rnvimr_edit_cmd = "drop"
			vim.g.rnvimr_draw_border = 0 -- Disable a border for floating window"
			vim.g.rnvimr_hide_gitignore = 1 -- Hide the files included in gitignore"
			vim.g.rnvimr_border_attr = { fg = 14, bg = -1 } -- Change the border's color"
			vim.g.rnvimr_enable_bw = 1 -- Make Neovim wipe the buffers corresponding to the files deleted by Ranger"
			vim.g.rnvimr_shadow_winblend = 70 -- Add a shadow window, value is equal to 100 will disable shadow"
			vim.g.rnvimr_ranger_cmd = { "ranger", "--cmd=set draw_borders true" } -- Draw border with both"

			vim.g.rnvimr_layout = {
				relative = "editor",
				width = vim.o.columns,
				height = vim.o.lines - 2,
				col = 0,
				row = 0,
				style = "minimal",
			}
		end,
	},

	{
		"ibhagwan/fzf-lua",
		dependencies = {
			"kyazdani42/nvim-web-devicons",
			"nvim-telescope/telescope.nvim",
		},
		opts = function()
			return require("custom.configs.fzflua")
		end,
		cmd = "FzfLua",
		keys = {
			{ mode = "n", "<A-f>", ":FzfLua files<CR>", desc = "", { silent = true } },
			{
				mode = "n",
				"<A-a>",
				":lua require('fzf-lua').files({fd_opts = '--color=never --type f --hidden --follow --no-ignore'})<CR>",
				desc = "",
				{ silent = true },
			},
			{ mode = "n", "<leader>bb", desc = "buffers list", ":FzfLua buffers<CR>", { silent = true } },
			{ mode = "n", "<leader>ta", desc = "tabs list", ":FzfLua tabs<CR>", { silent = true } },
			{ mode = "n", "<leader>ho", desc = "old files", ":FzfLua oldfiles<CR>", { silent = true } },
			{ mode = "n", "<leader>ll", desc = "lines from all buffers", ":FzfLua lines<CR>", { silent = true } },
			{ mode = "n", "<leader>gst", desc = "git status", ":FzfLua git_status<CR>", { silent = true } },
			{ mode = "n", "<leader>gls", desc = "git files", ":FzfLua git_files<CR>", { silent = true } },
			{ mode = "n", "<leader>fgl", desc = "project commits", ":FzfLua git_commits<CR>", { silent = true } },
			{ mode = "n", "<leader>fgb", desc = "buffer commits", ":FzfLua git_bcommits<CR>", { silent = true } },
			{ mode = "n", "<leader>gbb", desc = "git branches", ":FzfLua git_branches<CR>", { silent = true } },
			{ mode = "n", "<leader>gsh", desc = "git stash list", ":FzfLua git_stash<CR>", { silent = true } },
			{ mode = "n", "<leader>gt", desc = "git tags", ":FzfLua git_tags<CR>", { silent = true } },
			{ mode = "n", "<leader>oo", desc = "lsp symbols", ":FzfLua lsp_document_symbols<CR>", { silent = true } },
			{
				mode = "n",
				"<leader>ol",
				":lua require('fzf-lua').lsp_live_workspace_symbols({ file_ignore_patterns = { '^node_modules/' }, })<CR>",
				desc = "live workspace symbols",
				{ silent = true },
			},
			{ mode = "n", "<leader>ca", desc = "code actions", ":FzfLua lsp_code_actions<CR>", { silent = true } },
			{ mode = "n", "gR", ":FzfLua lsp_finder<CR>", desc = "all lsp refs", { silent = true } },
			{
				mode = "n",
				"<leader>lw",
				desc = "project diagnostics",
				":FzfLua lsp_workspace_diagnostics<CR>",
				{ silent = true },
			},
			{ mode = "n", "<leader>bt", desc = "fzflua builtins", ":FzfLua builtin<CR>", { silent = true } },
			{ mode = "n", "<leader>ht", desc = "help tags", ":FzfLua help_tags<CR>", { silent = true } },
			{ mode = "n", "<leader>hc", desc = "comand history", ":FzfLua command_history<CR>", { silent = true } },
			{ mode = "n", "<leader>hs", desc = "search history", ":FzfLua search_history<CR>", { silent = true } },
			{ mode = "n", "<leader>fk", desc = "keymaps", ":FzfLua keymaps<CR>", { silent = true } },
			{ mode = "n", "<leader>tt", desc = "project tags", ":FzfLua tags<CR>", { silent = true } },
			{ mode = "n", "<leader>tb", desc = "buffer tags", ":FzfLua btags<CR>", { silent = true } },
			{ mode = "n", "<leader>tw", desc = "grep tag word", ":FzfLua tags_grep_cword<CR>", { silent = true } },
			{ mode = "n", "<leader>tl", desc = "live tag", ":FzfLua tags_live_grep<CR>", { silent = true } },
			{ mode = "n", "<leader><leader>", ":FzfLua grep_project<CR>", desc = "grep with rules", { silent = true } },
			{
				mode = "n",
				"<leader>a",
				":lua require('fzf-lua').grep_project({rg_opts = '--hidden --no-ignore --column --line-number --no-heading --color=always --smart-case --max-columns=4096'})<CR>",
				desc = "grep all",
				{ silent = true },
			},
			{ mode = "n", "<leader>gw", ":FzfLua grep_cword<CR>", desc = "grep word", { silent = true } },
			{ mode = "n", "<leader>lb", ":FzfLua lgrep_curbuf<CR>", desc = "buffer lines", { silent = true } },
		},
	},

	{
		"lewis6991/gitsigns.nvim",
		keys = {
			{
				mode = "n",
				"<leader>nn",
				":Gitsigns next_hunk<cr>",
				desc = "next git change",
				{ silent = true },
			},
			{
				mode = "n",
				"<leader>pp",
				":Gitsigns prev_hunk<cr>",
				desc = "previous git change",
				{ silent = true },
			},
			{ mode = "n", "<leader>bl", ":Gitsigns blame_line<cr>", desc = "blame line", { silent = true } },
			{
				mode = "n",
				"<leader>ph",
				":Gitsigns preview_hunk<cr>",
				desc = "preview float window change",
				{ silent = true },
			},
			{
				mode = "n",
				"<leader>pih",
				":Gitsigns preview_hunk_inline<cr>",
				desc = "preview inline change",
				{ silent = true },
			},
			{
				mode = "n",
				"<leader>sh",
				":Gitsigns stage_hunk<cr>",
				desc = "stage inline change",
				{ silent = true },
			},
			{ mode = "n", "<leader>sb", ":Gitsigns stage_buffer<cr>", desc = "stage buffer", { silent = true } },
			{
				mode = "n",
				"<leader>ush",
				":Gitsigns undo_stage_hunk<cr>",
				desc = "unstage inline change",
				{ silent = true },
			},
			{
				mode = "n",
				"<leader>rbb",
				":Gitsigns reset_buffer<cr>",
				desc = "redo git buffer changes",
				{ silent = true },
			},
			{
				mode = "n",
				"<leader>rbi",
				":Gitsigns reset_buffer_index<cr>",
				desc = "unstage buffer",
				{ silent = true },
			},
			{
				mode = "n",
				"<leader>rh",
				":Gitsigns reset_hunk<cr>",
				desc = "redo git inline change",
				{ silent = true },
			},
			{ mode = "n", "<leader>gsw", ":Gitsigns show ", desc = "git show", { noremap = true } },
			{ mode = "n", "<leader>gid", ":Gitsigns diffthis ", desc = "git diff", { noremap = true } },
		},
	},

	{ "b0o/schemastore.nvim" },
}

return plugins
