hl.on("hyprland.start", function()
	hl.exec_cmd("waypaper --restore")
	-- hl.exec_cmd("while true; do sleep 600; waypaper --random; done")
	--
	hl.exec_cmd("/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1")
	--
	hl.exec_cmd("swaync")
	--
	hl.exec_cmd("udiskie")
	--
	hl.exec_cmd("hyprsunset")
	--
	hl.exec_cmd("vicinae server")
	--
	hl.exec_cmd("/home/mkc/dot-files/dot-files/scripts/battery-monitor")
end)
