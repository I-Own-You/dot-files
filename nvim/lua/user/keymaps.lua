local keymap = vim.api.nvim_set_keymap

vim.g.mapleader = " "

keymap("n", ";", ":", { noremap = true })
keymap("v", ";", ":", { noremap = true })
keymap("x", ";", ":", { noremap = true })

keymap("n", "<C-h>", "<C-w>h", { silent = true })
keymap("n", "<C-j>", "<C-w>j", { silent = true })
keymap("n", "<C-k>", "<C-w>k", { silent = true })
keymap("n", "<C-l>", "<C-w>l", { silent = true })

-- keymap("n", "<C-Up>", ":resize +2<CR>", {silent=true, desc=''})
-- keymap("n", "<C-Down>", ":resize -2<CR>", {silent=true, desc=''})
-- keymap("n", "<C-Left>", ":vertical resize +2<CR>", {silent=true, desc=''})
-- keymap("n", "<C-Right>", ":vertical resize -2<CR>", {silent=true, desc=''})
keymap("n", "<C-i>", "<C-6>", { silent = true, noremap = true })

keymap("n", "<leader>ot", ":tab split | terminal<CR>", { silent = true, desc = "open terminal" })
keymap("t", "<leader>tc", "<C-\\><C-n>", { silent = true, desc = "exit terminal mode" })

keymap("n", "q", "<Nop>", { silent = true })

keymap("n", "<TAB>", ":tabnext<CR>", { silent = true })
keymap("n", "<S-TAB>", ":tabprevious<CR>", { silent = true })

keymap("i", "jk", "<ESC>", { silent = true })

keymap("v", "<", "<gv", { silent = true })
keymap("v", ">", ">gv", { silent = true })

keymap("v", "p", '"_dP', { silent = true })

-- keymap("n", "<A-j>", ":m .+1<CR>==", {silent=true, desc=''})
-- keymap("n", "<A-k>", ":m .-2<CR>==", {silent=true, desc=''})
-- keymap("i", "<A-j>", "<ESC>:m .+1<CR>==gi", {silent=true, desc=''})
-- keymap("i", "<A-k>", "<ESC>:m .-2<CR>==gi", {silent=true, desc=''})
-- keymap("v", "<A-j>", ":m '>+1<CR>gv=gv", {silent=true, desc=''})
-- keymap("v", "<A-k>", ":m '<-2<CR>gv=gv", {silent=true, desc=''})

keymap("n", "<leader>vv", ":vsplit<CR>", { silent = true, desc = "split buffer vertically" })
keymap("n", "<leader>hh", ":split<CR>", { silent = true, desc = "split buffer horizontally" })
keymap("n", "<leader>vd", ":vert diffsplit ", { noremap = true, desc = "diff some file" })

keymap("n", "<C-[>", "[m", { silent = true })
keymap("n", "<C-]>", "]m", { silent = true })

keymap("n", "<leader>ww", ":set invwrap<CR>:set wrap?<CR>", { silent = true, desc = "toggle wrap" })
keymap("n", "!", ":!", { noremap = true })

keymap("n", "+", "<C-a>", { noremap = true, silent = true })
keymap("n", "-", "<C-x>", { noremap = true, silent = true })
keymap("v", "+", "<C-a>gv=gv", { noremap = true, silent = true })
keymap("v", "-", "<C-x>gv=gv", { noremap = true, silent = true })
keymap("x", "+", "<C-a>", { noremap = true, silent = true })
keymap("x", "-", "<C-x>", { noremap = true, silent = true })

keymap("n", "<C-c>", ":%y<CR>", { silent = true })
keymap("n", "<C-a>", "ggVG", { silent = true })
keymap("n", "<C-x>", ":%d<CR>", { silent = true })

keymap("i", "<C-BACKSPACE>", "<ESC>vbdi", { silent = true, desc = "" })
keymap("i", "<C-l>", "<ESC><leader>lsa", { silent = true, desc = "" })

keymap("n", "<leader>nh", ":nohlsearch<CR>", { silent = true, desc = "toggle search results" })
keymap("n", "<leader>bo", ":only<CR>", { silent = true, desc = "clear buffer windows" })
keymap("n", "<leader>bda", ":%bdelete<CR>", { silent = true, desc = "delete all buffers" })
keymap(
	"n",
	"<leader>bdo",
	":%bd|e#|bd#<CR>|'\"",
	{ noremap = true, silent = true, desc = "delete all buffers but not current" }
)
keymap("n", "<leader>to", ":tabonly<CR>", { noremap = true, silent = true, desc = "remove all tabs but not current" })

keymap("n", "<leader>la", ":Lazy<CR>", { noremap = true, desc = "open lazy nvim" })

-- keymap("n", "gd", ':lua require("utility_functions").goto_defintion()<CR>', { silent = true, desc = "lsp definition" })
-- keymap(
-- 	"n",
-- 	"gD",
-- 	':lua require("utility_functions").goto_declaration()<CR>',
-- 	{ silent = true, desc = "lsp declaration" }
-- )
-- keymap(
-- 	"n",
-- 	"gi",
-- 	':lua require("utility_functions").goto_implementation()<CR>',
-- 	{ silent = true, desc = "lsp implementation" }
-- )
-- keymap(
-- 	"n",
-- 	"<leader>D",
-- 	':lua require("utility_functions").goto_type_definition()<CR>',
-- 	{ silent = true, desc = "lsp type definition" }
-- )

keymap("n", "<C-d>", "5j", { silent = true, desc = "" })
keymap("n", "<C-u>", "5k", { silent = true, desc = "" })

keymap("n", "<leader>nb", ":enew<cr>", { silent = true, desc = "open new buffer" })
keymap("n", "<leader>nt", ":tabnew<CR>", { silent = true, desc = "open new tab" })

-- "%:p:h" without filename
keymap("n", "<Leader>xt", ':let @+=expand("%:p")<CR>', { silent = true, desc = "copy current buffers location" })

keymap("n", "zz", "za", { noremap = true, silent = true, desc = "toggle folding" }) -- for

keymap("n", "q", ":lua require('utility_functions').close_file_type_buffers()<CR>", { silent = true })
