local util = require("lspconfig.util")
return {
  cmd = { "vscode-eslint-language-server", "--stdio" },
  filetypes = { "javascript", "javascriptreact", "javascript.jsx", "typescript", "typescriptreact", "typescript.tsx", "vue", "svelte", "astro" },
  handlers = {
    ["eslint/confirmESLintExecution"] = nil,
    ["eslint/noLibrary"] = nil,
    ["eslint/openDoc"] = nil,
    ["eslint/probeFailed"] = nil,
  },
  -- on_new_config = nil,
  root_dir = util.root_pattern(".eslintrc.js", ".eslintrc.json", ".eslintrc.yaml"),
  settings = {
    codeAction = {
      disableRuleComment = {
        enable = true,
        location = "separateLine"
      },
      showDocumentation = {
        enable = true
      }
    },
    codeActionOnSave = {
      enable = false,
      mode = "all"
    },
    experimental = {
      useFlatConfig = false
    },
    format = true,
    nodePath = "",
    onIgnoredFiles = "off",
    packageManager = "npm",
    problems = {
      shortenToSingleLine = false
    },
    quiet = false,
    rulesCustomizations = {},
    run = "onType",
    useESLintClass = false,
    validate = "on",
    workingDirectory = {
      mode = "location"
    },
    workspaceFolder = {},
    options = {}
  }
}
