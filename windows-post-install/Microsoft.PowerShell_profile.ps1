# ==========================================
# PowerShell 7 Dev Profile (.zshrc-like)
# ==========================================

# Invokations
Invoke-Expression (&starship init powershell)
Invoke-Expression ((zoxide init powershell) -join "`n")

# Imported modules and its settings
Import-Module PSReadLine
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -PredictionSource HistoryAndPlugin
Set-PSReadLineOption -MaximumHistoryCount 10000
Set-PSReadLineKeyHandler -Chord Ctrl+Spacebar -Function MenuComplete # Popup menu
Set-PSReadLineKeyHandler -Chord 'Ctrl+r' -ScriptBlock { Function-FuzzyCommandHistory }
Set-PSReadLineKeyHandler -Chord 'Ctrl+n' -Function NextSuggestion
Set-PSReadLineKeyHandler -Chord 'Ctrl+p' -Function PreviousSuggestion

# Winget completion
Register-ArgumentCompleter -Native -CommandName winget -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)
        [Console]::InputEncoding = [Console]::OutputEncoding = $OutputEncoding = [System.Text.Utf8Encoding]::new()
        $Local:word = $wordToComplete.Replace('"', '""')
        $Local:ast = $commandAst.ToString().Replace('"', '""')
        winget complete --word="$Local:word" --commandline "$Local:ast" --position $cursorPosition | ForEach-Object {
            [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
        }
}

# gh/glab cli completion
gh completion -s powershell | Out-String | Invoke-Expression
glab completion -s powershell | Out-String | Invoke-Expression

# -----------------------------
# ALIASES
# -----------------------------
Set-Alias cat bat
Set-Alias l eza
Set-Alias zz Function-FuzzySetLocationRecursive   # Directory fuzzy finder + cd
Set-Alias zf Function-FuzzyFindFile               # File fuzzy finder + open editor
function nf { nvim (fzf) }
function qq { shutdown /s /t 0 }
function qr { shutdown /r /t 0 }
function b { cd .. }
function nzsh {
    cd "C:\Users\Idkwh\dot-files\windows-post-install"
    nvim Microsoft.PowerShell_profile.ps1
}
function dff {
    cd "C:\Users\Idkwh\dot-files"
    nvim
}
function ncf {
    cd "$env:LOCALAPPDATA\nvim"
    nvim
}
function wfs {
    param([string]$filter = "")
    winget search $filter | fzf
}

# -----------------------------
# Custom functions
# -----------------------------
function Function-FuzzySetLocationRecursive {
    $folder = Get-ChildItem -Path . -Directory -Recurse -Force -ErrorAction SilentlyContinue |
              Select-Object -ExpandProperty FullName | 
              fzf --height=40% --reverse --prompt="📁 Select Directory: "
    if ($folder) {
        Set-Location $folder
    }
}
function Function-FuzzyFindFile {
    $file = cmd /c 'fd --type f --hidden --follow --exclude .git | fzf --height=40% --reverse --prompt="📄 Select File: "'
    if ($file) {
        $file = $file.Trim()
        Write-Output $file
    }
}
function Function-FuzzyCommandHistory {
    $historyFile = Join-Path $env:APPDATA "Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt"

    if (-not (Test-Path $historyFile)) {
        return
    }

    # Read history lines, remove blank
    $lines = Get-Content $historyFile -ErrorAction SilentlyContinue | Where-Object { $_ -match '\S' }

    # Reverse lines so newest is first
    [array]::Reverse($lines)

    # Pass reversed lines to fzf WITHOUT --reverse, so newest commands show at top
    $selection = $lines | fzf --layout=reverse --height=40% --prompt="🔁 Persistent History: "

    if ($selection) {
        # Insert selection as-is
        [Microsoft.PowerShell.PSConsoleReadLine]::Insert($selection)
    }
}

# -----------------------------
# Custom environment variables
# -----------------------------
$env:STARSHIP_CONFIG  = "$env:USERPROFILE\dot-files\windows-post-install\starship.toml"
