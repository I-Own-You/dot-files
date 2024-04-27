vim.api.nvim_set_hl(0, "CmpItemKindSnippet", { fg = "#00E756" })
vim.api.nvim_set_hl(0, "CmpItemKindText", { fg = "#00E756" })
vim.api.nvim_set_hl(0, "CmpItemKindFunction", { fg = "cyan" })
vim.api.nvim_set_hl(0, "CmpItemKindVariable", { fg = "#C54BCF" })
vim.api.nvim_set_hl(0, "CmpItemKindClass", { fg = "#FFB20F" })
vim.api.nvim_set_hl(0, "CmpItemKindModule", { fg = "#7F7F7F" })
vim.api.nvim_set_hl(0, "CmpItemKindKeyword", { fg = "#A79AC0" })
vim.api.nvim_set_hl(0, "CmpItemKindConstant", { fg = "white" })
vim.api.nvim_set_hl(0, "CmpItemKindProperty", { fg = "#ff4394" })
vim.api.nvim_set_hl(0, "CmpItemKindMethod", { fg = "#29ADFF" })
vim.api.nvim_set_hl(0, "CmpItemMenu", { fg = "#FFDBB8" })
-- vim.api.nvim_set_hl(0, "CmpItemKindConstructor", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindField", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindInterface", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindUnit", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindValue", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindEnum", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindColor", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindFile", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindReference", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindFolder", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindEnumMember", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindStruct", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindEvent", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindOperator", { fg = "cyan"})
-- vim.api.nvim_set_hl(0, "CmpItemKindTypeParameter", { fg = "cyan"})

local cmp_status_ok, cmp = pcall(require, "cmp")
if not cmp_status_ok then
	return
end

-- for de prioritize emmet ls
local cmp_types_status, types = pcall(require, "cmp.types")

local snip_status_ok, luasnip = pcall(require, "luasnip")
if not snip_status_ok then
	return
end

require("luasnip/loaders/from_vscode").lazy_load()

local check_backspace = function()
	local col = vim.fn.col(".") - 1
	return col == 0 or vim.fn.getline("."):sub(col, col):match("%s")
end

--   פּ ﯟ   some other good icons
local kind_icons = {
	Text = " txt",
	Method = " method",
	Function = " func",
	Constructor = " construct",
	Field = " field",
	Variable = " var",
	Class = " class",
	Interface = " interface",
	-- Module = " module",
	Module = " module",
	Property = " property",
	Unit = " unit",
	Value = " value",
	Enum = " enum",
	Keyword = " keyword",
	Snippet = "",
	Color = " color",
	File = " file",
	Reference = " reference",
	Folder = " folder",
	EnumMember = " enumMem",
	Constant = " const",
	Struct = " struct",
	Event = " event",
	Operator = " operator",
	TypeParameter = " typeParameter",
}
-- find more here: https://www.nerdfonts.com/cheat-sheet

local settings = {
	snippet = {
		expand = function(args)
			luasnip.lsp_expand(args.body) -- For `luasnip` users.
		end,
	},
	mapping = {
		["<C-n>"] = cmp.mapping(cmp.mapping.select_next_item(), { "i", "c" }),
		["<C-p>"] = cmp.mapping(cmp.mapping.select_prev_item(), { "i", "c" }),
		["<C-k>"] = cmp.mapping.select_prev_item(),
		["<C-j>"] = cmp.mapping.select_next_item(),
		["<C-b>"] = cmp.mapping(cmp.mapping.scroll_docs(-1), { "i", "c" }),
		["<C-f>"] = cmp.mapping(cmp.mapping.scroll_docs(1), { "i", "c" }),
		["<C-Space>"] = cmp.mapping(cmp.mapping.complete(), { "i", "c" }),
		["<C-y>"] = cmp.config.disable, -- Specify `cmp.config.disable` if you want to remove the default `<C-y>` mapping.
		["<C-e>"] = cmp.mapping({
			i = cmp.mapping.abort(),
			c = cmp.mapping.close(),
		}),
		-- Accept currently selected item. If none selected, `select` first item.
		-- Set `select` to `false` to only confirm explicitly selected items.
		["<CR>"] = cmp.mapping.confirm({ select = true }),
		["<Tab>"] = cmp.mapping(function(fallback)
			if cmp.visible() then
				cmp.select_next_item()
			elseif luasnip.expandable() then
				luasnip.expand()
			elseif luasnip.expand_or_jumpable() then
				luasnip.expand_or_jump()
			elseif check_backspace() then
				fallback()
			else
				fallback()
			end
		end, {
			"i",
			"s",
		}),
		["<S-Tab>"] = cmp.mapping(function(fallback)
			if cmp.visible() then
				cmp.select_prev_item()
			elseif luasnip.jumpable(-1) then
				luasnip.jump(-1)
			else
				fallback()
			end
		end, {
			"i",
			"s",
		}),
	},
	formatting = {
		fields = { "abbr", "kind", "menu" },
		format = function(entry, vim_item)
			-- Kind icons
			vim_item.kind = string.format("%s", kind_icons[vim_item.kind])
			-- vim_item.kind = string.format('%s %s', kind_icons[vim_item.kind], vim_item.kind) -- This concatonates the icons with the name of the item kind
			vim_item.menu = ({
				nvim_lsp = "LSP",
				luasnip = "Snippet",
				buffer = "Buffer",
				path = "Path",
				rg = "RG",
				dotenv = "SHELL ENV",
				-- codeium = " AI  ",
			})[entry.source.name]
			return vim_item
		end,
	},
	sources = {
		-- { name = "codeium" },
		{ name = "nvim_lsp" },
		{ name = "luasnip" },
		{ name = "rg" },
		{ name = "buffer" },
		{ name = "path" },
		{ name = "dotenv" },
	},
	confirm_opts = {
		behavior = cmp.ConfirmBehavior.Replace,
		select = false,
	},
	window = {
		completion = cmp.config.window.bordered({
			-- scrollbar = true,
			border = { "╭", "─", "╮", "│", "╯", "─", "╰", "│" },
			-- border = { "┏", "━", "┓", "┃", "┛", "━", "┗", "┃" },
			-- winhighlight = "Normal:CustomFloatCompletion,FloatBorder:Boolean,CursorLine:CursorLine,Search:None", -- switched to Boolean for gatekeeper
			winhighlight = "Normal:CustomFloatCompletion,FloatBorder:CmpItemKindEnum,CursorLine:CursorLine,Search:None",
			side_padding = 0,
			col_offset = 0, --moves right and left
		}),
		documentation = {
			border = { "╭", "─", "╮", "│", "╯", "─", "╰", "│" },
			-- border = { "┏", "━", "┓", "┃", "┛", "━", "┗", "┃" },
			winhighlight = "Normal:CustomFloatCompletion,FloatBorder:CmpItemKindEnum,CursorLine:CursorLine,Search:None",
		},
	},
	experimental = {
		ghost_text = false,
	},
	-- sorting = {
	-- 	comparators = {
	-- cmp.config.compare.offset,
	-- cmp.config.compare.locality,
	-- cmp.config.compare.recently_used,
	-- cmp.config.compare.score,
	-- cmp.config.compare.order,
	-- cmp.config.compare.kind,
	-- cmp.config.compare.exact,
	-- cmp.config.compare.length,
	-- },
	-- default config way
	-- comparators = {
	-- 	cmp.config.compare.offset,
	-- 	cmp.config.compare.exact,
	-- 	-- cmp.config.compare.scopes,
	-- 	cmp.config.compare.score,
	-- 	cmp.config.compare.recently_used,
	-- 	cmp.config.compare.locality,
	-- 	cmp.config.compare.kind,
	-- 	-- cmp.config.compare.sort_text,
	-- 	cmp.config.compare.length,
	-- 	cmp.config.compare.order,
	-- },
	-- },
}

cmp.setup.cmdline("/", {
	mapping = cmp.mapping.preset.cmdline(),
	sources = {
		{ name = "buffer" },
	},
})

-- `?` cmdline setup.
cmp.setup.cmdline("?", {
	mapping = cmp.mapping.preset.cmdline(),
	sources = {
		{ name = "buffer" },
	},
})

-- `:` cmdline setup.
cmp.setup.cmdline(":", {
	mapping = cmp.mapping.preset.cmdline(),
	sources = cmp.config.sources({
		{ name = "path" },
	}, {
		{
			name = "cmdline",
			option = {
				ignore_cmds = {},
			},
		},
	}),
})

return settings
