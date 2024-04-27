return {
    settings = {
        pylsp = {
            configurationSources = {"pycodestyle"}, --flake8 avaialable
            rope = { -- completions and renaming
                 extensionModules = nil, -- Builtin and c-extension modules that are allowed to be imported and inspected by rope.(string)
                ropeFolder = nil, -- The name of the folder in which rope stores project configurations and data. Pass null for not using such a folder at all. (array of unique string items)
            },
            plugins = {
                pycodestyle = { -- linter for style checking
                    enabled = true, -- enable or disable plugin boolean
                    exclude = {}, --  List of files or directories to exclude that match the patterns. (array of unique string items),
                    filename = {}, --When parsing directories, only check filenames matching these patterns.(array of unique string items)
                    select = nil, -- List of errors and warnings to enable., (array of unique string items)|nil
                    ignore = {"E501", "W503"}, -- List of erros and warnings to ignore (array of unique string items)
                    hangClosing = nil, --Hang closing bracket instead of matching indentation of opening bracket's line.(boolean)|nil
                    maxLineLength = 100, -- Maximum allowed line length for the entirety of this run. (integer)|nil
                    indentSize = nil, -- Set indentation spaces. (integer)|nil
                },
                pydocstyle = { -- linter for docstring style checking
                    enabled = false, -- enable or disable plugin boolean
                    convention = nil, -- Choose the basic list of checked errors by specifying an existing convention. (string (one of: 'pep257', 'numpy', 'google', None))|nil
                    addIgnore = {}, -- Ignore errors and warnings in addition to the specified convention.(array of unique string items)
                    addSelect = {}, -- Select errors and warnings in addition to the specified convention. (array of unique string items)
                    ignore = {}, -- Ignore errors and warnings (array of unique string items)
                    select = nil, -- Select errors and warnings (array of unique string items)|nil
                    match = "(?!test_).*\\.py", -- Check only files that exactly match the given regular expression; default is to match files that don't start with 'test_' but end with '.py'. (string)
                    matchDir = "[^\\.].*", -- Search only dirs that exactly match the given regular expression; default is to match dirs which do not begin with a dot. (string)
                },
                autopep8 = { -- for code formatting
                    enabled = false  --Enable or disable the plugin (disabling required to use yapf). (boolean)
                },
                flake8 = { -- for error checking
                    config = nil, -- Path to the config file that will be the authoritative config source.(string)|nil
                    enabled = false, -- enable or disable plugin boolean
                    exclude = {}, --  List of files or directories to exclude. (array of string items),
                    executable = "flake8", -- path to the flake8 executable (string)
                    filename = nil, --Only check for filenames matching the patterns in this list.(string)	|nil
                    hangClosing = nil, --Hang closing bracket instead of matching indentation of opening bracket's line.(boolean)	|nil
                    ignore = {}, -- List of erros and warnings to ignore (array of string items)
                    select = nil, -- List of errors and warnings to enable., (array of unique string items)|nil
                    maxComplexity = nil,  --Maximum allowed complexity threshold. (integer) |nil
                    maxLineLength = 100, -- Maximum allowed line length for the entirety of this run. (integer)|nil
                    indentSize = nil, -- Set indentation spaces. (integer)|nil
                    perFileIgnores = {}, -- A pairing of filenames and violation codes that defines which violations to ignore in a particular file, for example: ["file_path.py:W305,W304"]). (array of string items)
                },
                pyflakes = { -- linter to detect various errors
                    enabled = false, -- enable or disable plugin boolean
                },
                pylint = { -- for code linting
                    enabled = false, -- enable or disable plugin boolean
                    args = {}, -- Arguments to pass to pylint. (array of non-unique string items)
                    executable = nil, -- Executable to run pylint with. Enabling this will run pylint on unsaved files via stdin. Can slow down workflow. Only works with python3. (string)|nil
                },
                jedi = {
                    auto_import_modules = {"numpy"}, -- List of module names for jedi.settings.auto_import_modules. (array of string items)
                    extra_paths = {}, -- Define extra paths for jedi.Script. (array of string items)
                    env_vars = nil, -- Define environment variables for jedi.Script and Jedi.names., (object)|nil
                    environment = nil, -- Define environment for jedi.Script and Jedi.names. (string)|nil
                },
                jedi_completion = {
                    enabled = true, -- Enable or disable the plugin., (boolean)
                    include_params = true, -- Auto-completes methods and classes with tabstops for each parameter. (boolean)
                    include_class_objects = true, -- Adds class objects as a separate completion item. (boolean)
                    include_function_objects = true, -- Adds function objects as a separate completion item. (boolean)
                    fuzzy = false, -- Enable fuzzy when requesting autocomplete. (boolean)
                    eager = false, -- Resolve documentation and detail eagerly. (boolean)
                    resolve_at_most = 25, -- How many labels and snippets (at most) should be resolved? (integer)
                    cache_for = { "pandas", "numpy", "tensorflow", "matplotlib" }, -- Modules for which labels and snippets should be cached. (array of string items)
                },
                jedi_definition = {
                    enabled = true, -- enable or disable plugin (boolean)
                    follow_imports = true, -- the goto call will follow imports (boolean)
                    follow_builtin_imports = true, -- If follow_imports is True will decide if it follow builtin imports. (boolean)
                    follow_builtin_definitions = true, -- Follow builtin and extension definitions to stubs. (boolean)
                },
                jedi_hover = {
                    enabled = true, -- enable or diasble the plugin , boolean
                },
                jedi_references = {
                    enabled = true, -- enable or diasble the plugin , boolean
                },
                jedi_signature_help = {
                    enabled = true, -- enable or diasble the plugin , boolean
                },
                jedi_symbols = {
                    enabled = true, -- enable or diasble the plugin , boolean
                    all_scopes = true, -- If True lists the names of all scopes instead of only the module namespace. (boolean)
                    include_import_symbols = true, -- If True includes symbols imported from other libraries. (boolean)
                },
                mccabe = { -- linter for complexity checking
                    enabled = true, -- enable or diasble the plugin , boolean
                    threshold = 15, -- The minimum threshold that triggers warnings about cyclomatic complexity. (integer)
                },
                preload = {
                    enabled = true, -- enable or diasble the plugin , boolean
                    modules = {}, -- List of modules to import on startup (array of unique string items)
                },
                rope_autoimport = { -- autoimport
                    enabled = false, -- Enable or disable autoimport. (boolean)
                    memory = false, -- Make the autoimport database memory only. Drastically increases startup time. (boolean)
                },
                rope_completion = { -- completions and renaming
                    enabled = false, -- Enable or disable autoimport. (boolean)
                    eager = false, -- Resolve documentation and detail eagerly. (boolean)
                },
                yapf = { -- for code formatting
                    enabled = false, -- Enable or disable plugin. (boolean)
                },
            },
        }
    }
}
