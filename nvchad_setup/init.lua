-- local autocmd = vim.api.nvim_create_autocmd

-- Auto resize panes when resizing nvim window
-- autocmd("VimResized", {
--   pattern = "*",
--   command = "tabdo wincmd =",
-- })
local options = {
	-- backup = false,
	-- clipboard = "unnamedplus",
	-- completeopt = { "menuone", "noselect" },
	-- hlsearch = true,
	-- pumheight = 10,
	-- showmode = false,
	-- showtabline = 1,
	-- smartcase = true,
	-- smartindent = true,
	-- ignorecase = true,
	-- splitbelow = true,
	-- splitright = true,
	swapfile = false,
	-- termguicolors = true,
	undofile = true,
	-- updatetime = 300,
	writebackup = false,
	-- expandtab = true,
	-- shiftwidth = 2,
	-- tabstop = 2,
	-- softtabstop = 2,
	incsearch = true,
	-- colorcolumn = "101",
	cursorline = true,
	-- number = true,
	relativenumber = true,
	-- numberwidth = 2,
	wrap = false,
	linebreak = true,
	-- fillchars = "eob: ",
	-- scrolloff = 5,
	-- sessionoptions = "curdir,folds,globals,help,tabpages,terminal,winsize",
}

for k, v in pairs(options) do
	vim.opt[k] = v
end

vim.api.nvim_exec("autocmd Filetype rnvimr tnoremap <buffer><nowait> j j", false)
vim.api.nvim_exec("autocmd Filetype rnvimr tnoremap <buffer><nowait> k k", false)
vim.api.nvim_exec("autocmd Filetype rnvimr tnoremap <buffer><nowait> <Space> <Space>", false)

vim.cmd([[
augroup DjangoHtmlHighlight
  autocmd!
  autocmd FileType htmldjango highlight MatchParen guibg=NONE
augroup END
]]) -- for htmldjango, it conflicted with rustywind lsp

vim.cmd([[
augroup AutoCloseMarkdownGlow
  autocmd!
  autocmd FileType glow nnoremap <buffer> q :q<CR>
augroup END
]])

vim.cmd([[
augroup AutoCloseLspWindowReferenceAndDefintion
  autocmd!
  autocmd FileType qf nnoremap <buffer> q :q<CR>
augroup END
]])

vim.cmd([[
augroup AutoCloseCommandHistoryMode
  autocmd!
  autocmd FileType vim nnoremap <buffer> q :q<CR>
augroup END
]])
