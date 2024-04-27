return {
	-- Below is the default configuration. It is optional to set these values.
	-- You can customize the configuration for each yazi call by passing it to
	-- yazi() explicitly

	-- enable this if you want to open yazi instead of netrw.
	-- Note that if you enable this, you need to call yazi.setup() to
	-- initialize the plugin. lazy.nvim does this for you in certain cases.
	-- open_for_directories = false,

	-- the floating window scaling factor. 1 means 100%, 0.9 means 90%, etc.
	floating_window_scaling_factor = 0.9,

	-- the transparency of the yazi floating window (0-100). See :h winblend
	yazi_floating_window_winblend = 0,

	-- the path to a temporary file that will be created by yazi to store the
	-- chosen file path. This is used internally but you might want to change
	-- it if there are issues accessing the default path.
	-- chosen_file_path = "/tmp/yazi_filechosen",

	-- the path to a temporary file that will be created by yazi to store
	-- events
	-- events_file_path = "/tmp/yazi.nvim.events.txt",

	-- what neovim should do a when a file was opened (selected) in yazi.
	-- Defaults to simply opening the file.
	-- open_file_function = function(chosen_file, config) end,

	-- completely override the keymappings for yazi. This function will be
	-- called in the context of the yazi terminal buffer.
	-- set_keymappings_function = function(yazi_buffer_id, config) end,

	-- hooks = {
	-- 	-- if you want to execute a custom action when yazi has been opened,
		-- you can define it here.
		-- yazi_opened = function(preselected_path, yazi_buffer_id, config)
			-- you can optionally modify the config for this specific yazi
			-- invocation if you want to customize the behaviour
		-- end,

		-- when yazi was successfully closed
		-- yazi_closed_successfully = function(chosen_file, config) end,

		-- when yazi opened multiple files. The default is to send them to the
		-- quickfix list, but if you want to change that, you can define it here
	-- 	yazi_opened_multiple_files = function(chosen_files, config) end,
	-- },
}
