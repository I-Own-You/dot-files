hl.bind("SUPER + R", hl.dsp.submap("resize"), { submap_universal = true })
hl.define_submap("resize", function()
	hl.bind("l", hl.dsp.window.resize({ x = 50, y = 0, relative = true }), { repeating = true })
	hl.bind("h", hl.dsp.window.resize({ x = -50, y = 0, relative = true }), { repeating = true })
	hl.bind("k", hl.dsp.window.resize({ x = 0, y = 50, relative = true }), { repeating = true })
	hl.bind("j", hl.dsp.window.resize({ x = 0, y = -50, relative = true }), { repeating = true })

	hl.bind("SUPER + R", hl.dsp.submap("reset"))
	hl.bind("escape", hl.dsp.submap("reset"))
end)
hl.bind("SUPER + M", hl.dsp.submap("move"), { submap_universal = true })
hl.define_submap("move", function()
	hl.bind("h", hl.dsp.focus({ direction = "left" }))
	hl.bind("l", hl.dsp.focus({ direction = "right" }))
	hl.bind("k", hl.dsp.focus({ direction = "up" }))
	hl.bind("j", hl.dsp.focus({ direction = "down" }))

	hl.bind("SUPER + M", hl.dsp.submap("reset"))
	hl.bind("escape", hl.dsp.submap("reset"))
end)

hl.bind("SUPER + S", hl.dsp.submap("swap"), { submap_universal = true })
hl.define_submap("swap", function()
	hl.bind("h", hl.dsp.window.swap({ direction = "l" }))
	hl.bind("l", hl.dsp.window.swap({ direction = "r" }))
	hl.bind("k", hl.dsp.window.swap({ direction = "u" }))
	hl.bind("j", hl.dsp.window.swap({ direction = "d" }))

	hl.bind("SUPER + S", hl.dsp.submap("reset"))
	hl.bind("escape", hl.dsp.submap("reset"))
end)

hl.bind("SUPER + G", hl.dsp.submap("group"))
hl.define_submap("group", function()
	hl.bind("g", hl.dsp.group.toggle())

	hl.bind("h", hl.dsp.group.prev())
	hl.bind("l", hl.dsp.group.next())

	hl.bind("SHIFT + h", hl.dsp.group.move_window({ forward = false }))
	hl.bind("SHIFT + l", hl.dsp.group.move_window({ forward = true }))

	hl.bind("SUPER + C", hl.dsp.window.close())
	hl.bind("SUPER + F", hl.dsp.window.fullscreen({ mode = "fullscreen", action = "toggle" }))
	hl.bind("SUPER + K", hl.dsp.window.fullscreen({ mode = "maximized", action = "toggle" }))

	hl.bind("SUPER + W", hl.dsp.workspace.toggle_special("magic"))
	hl.bind("SUPER + SHIFT + W", hl.dsp.window.move({ workspace = "special:magic" }))

	hl.bind("SUPER + G", hl.dsp.submap("reset"))
	hl.bind("escape", hl.dsp.submap("reset"))
end)
