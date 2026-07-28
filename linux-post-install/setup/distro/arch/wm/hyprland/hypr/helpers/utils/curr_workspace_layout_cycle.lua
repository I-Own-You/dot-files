hl.bind("SUPER + tab", function()
	local layouts = { "dwindle", "monocle" }
	local workspace = hl.get_active_workspace()
	if hl.get_active_special_workspace() then
		workspace = hl.get_active_special_workspace()
	end

	local next_layout = "dwindle"

	if not workspace then
		return
	end

	for i = 1, #layouts do
		if layouts[i] == workspace.tiled_layout then
			local next_layout_idx = (i % #layouts) + 1
			next_layout = layouts[next_layout_idx]
			break
		end
	end

	if workspace.special then
		hl.workspace_rule({ workspace = tostring(workspace.name), layout = next_layout })
	else
		hl.workspace_rule({ workspace = tostring(workspace.id), layout = next_layout })
	end
end)

hl.bind("SUPER + N", function()
	local workspace = hl.get_active_workspace()

	if not workspace then
		return
	end

	if workspace.tiled_layout == "monocle" and not hl.get_active_special_workspace() then
		hl.dispatch(hl.dsp.layout("cyclenext"))
	else
		hl.dispatch(hl.dsp.window.cycle_next({
			next = true,
		}))
	end
end)
