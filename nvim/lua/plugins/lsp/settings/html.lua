return {
    cmd = { "vscode-html-language-server", "--stdio" },
    filetypes = { "html", "htmldjango", "djangohtml" },
    init_options = {
        configurationSection = { "html", "css", "javascript" },
        embeddedLanguages = {
            css = true,
            javascript = true
        },
        provideFormatter = false
    },
    settings = {},
    single_file_support = true
}
