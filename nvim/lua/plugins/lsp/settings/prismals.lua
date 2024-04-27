return {
	cmd = { "prisma-language-server", "--stdio" },
	filetypes = { "prisma" },
	-- root_dir = root_pattern(".git", "package.json"),
	settings = {
		prisma = {
			prismaFmtBinPath = "",
		},
	},
}
