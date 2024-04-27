vim.opt.backup = false
vim.opt.clipboard = "unnamedplus"
vim.opt.completeopt = { "menuone", "noselect" }
vim.opt.hlsearch = true
vim.opt.pumheight = 10
vim.opt.showmode = false
vim.opt.showtabline = 1
vim.opt.smartcase = true

-- nvim-ufo related
vim.o.fillchars = [[eob: ,fold: ,foldopen:,foldsep: ,foldclose:]]
vim.opt.foldenable = true
vim.opt.foldcolumn = "1" -- '0' is not bad
vim.opt.foldlevel = 99 -- Using ufo provider need a large value, feel free to decrease the value
vim.opt.foldlevelstart = 99
-- nvim-ufo related

vim.opt.smartindent = true
vim.opt.ignorecase = true
vim.opt.splitbelow = true
vim.opt.splitright = true
vim.opt.swapfile = false
vim.opt.termguicolors = true
vim.opt.undofile = true
vim.opt.updatetime = 300
vim.opt.writebackup = false
vim.opt.expandtab = true
vim.opt.shiftwidth = 4
vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.incsearch = true
-- vim.opt.colorcolumn = "101"
vim.opt.cursorline = true
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.numberwidth = 4
vim.opt.wrap = false
vim.opt.linebreak = true
-- vim.opt.fillchars = "eob: "
-- vim.opt.scrolloff = 5
vim.opt.sessionoptions = "curdir,folds,globals,help,tabpages,terminal,winsize"

vim.api.nvim_command("set whichwrap+=<,>,h,l,[,]")
