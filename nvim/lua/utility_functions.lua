local M = {}
function M.goto_defintion()
	local current_buffer = vim.api.nvim_get_current_buf()
	local absolute_path = vim.fn.expand("#" .. current_buffer .. ":p")
	vim.lsp.buf.definition({
		reuse_win = false,
		on_list = function(def_list)
			local counter = 0
			for _, item in ipairs(def_list["items"]) do
				if item["filename"] == absolute_path then
					vim.lsp.buf.definition()
					return
				else
					counter = counter + 1
					-- vim.cmd("tab split | lua vim.lsp.buf.definition()")
				end
			end
			-- for cases where definiton > 1
			if counter > 1 then
				vim.lsp.buf.definition()
				-- vim.cmd("lua vim.lsp.buf.definition()")
			else
				-- if 1 occurence but in another file
				local success, result_or_error = pcall(vim.cmd, "lua vim.lsp.buf.definition()")
				if success then
					vim.cmd("vertical split | lua vim.lsp.buf.definition()")
				else
					vim.lsp.buf.definition()
				end
			end
		end,
	})
end
function M.goto_declaration()
	local current_buffer = vim.api.nvim_get_current_buf()
	local absolute_path = vim.fn.expand("#" .. current_buffer .. ":p")
	vim.lsp.buf.definition({
		reuse_win = false,
		on_list = function(def_list)
			local counter = 0
			for _, item in ipairs(def_list["items"]) do
				if item["filename"] == absolute_path then
					vim.lsp.buf.declaration()
					return
				else
					counter = counter + 1
				end
			end
			-- for cases where definiton > 1
			if counter > 1 then
				vim.lsp.buf.declaration()
			else
				-- if 1 occurence but in another file
				local success, result_or_error = pcall(vim.cmd, "lua vim.lsp.buf.declaration()")
				if success then
					vim.cmd("vertical split | lua vim.lsp.buf.declaration()")
				else
					vim.lsp.buf.declaration()
				end
			end
		end,
	})
end
function M.goto_implementation()
	local current_buffer = vim.api.nvim_get_current_buf()
	local absolute_path = vim.fn.expand("#" .. current_buffer .. ":p")
	vim.lsp.buf.definition({
		reuse_win = false,
		on_list = function(def_list)
			local counter = 0
			for _, item in ipairs(def_list["items"]) do
				if item["filename"] == absolute_path then
					vim.lsp.buf.implementation()
					return
				else
					counter = counter + 1
				end
			end
			-- for cases where definiton > 1
			if counter > 1 then
				vim.lsp.buf.implementation()
			else
				-- if 1 occurence but in another file
				local success, result_or_error = pcall(vim.cmd, "lua vim.lsp.buf.implementation()")
				if success then
					vim.cmd("vertical split | lua vim.lsp.buf.implementation()")
				else
					vim.lsp.buf.implementation()
				end
			end
		end,
	})
end
function M.goto_type_definition()
	local current_buffer = vim.api.nvim_get_current_buf()
	local absolute_path = vim.fn.expand("#" .. current_buffer .. ":p")
	vim.lsp.buf.definition({
		reuse_win = false,
		on_list = function(def_list)
			local counter = 0
			for _, item in ipairs(def_list["items"]) do
				if item["filename"] == absolute_path then
					vim.lsp.buf.type_definition()
					return
				else
					counter = counter + 1
				end
			end
			-- for cases where definiton > 1
			if counter > 1 then
				vim.lsp.buf.type_definition()
			else
				-- if 1 occurence but in another file
				local success, result_or_error = pcall(vim.cmd, "lua vim.lsp.buf.type_definition()")
				if success then
					vim.cmd("vertical split | lua vim.lsp.buf.type_definition()")
				else
					vim.lsp.buf.type_definition()
				end
			end
		end,
	})
end

function M.close_file_type_buffers()
	local filetypes = {
		"markdown",
		"help",
		"qf",
		"vim",
		"spectre_panel",
		"http",
		"bufferlist",
		"netrw",
	}
	local current_filetype = vim.bo.filetype

	for _, ft in ipairs(filetypes) do
		if current_filetype == ft then
			vim.cmd("silent q")
			return
		elseif current_filetype == "" then
			vim.cmd("silent! bd")
      return
		end
	end
end

-- function M.diffViewOpen()
-- 	vim.cmd("FocusToggle")
-- 	vim.cmd("DiffviewOpen")
-- end
--
-- function M.diffViewClose()
-- 	vim.cmd("FocusToggle")
-- 	vim.cmd("DiffviewClose")
-- end
--
-- function M.diffViewFileHistoryOpen()
-- 	vim.cmd("FocusToggle")
-- 	vim.cmd("DiffviewFileHistory")
-- end

return M
