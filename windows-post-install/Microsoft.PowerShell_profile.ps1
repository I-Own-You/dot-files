# ==========================================
# PowerShell 7 Dev Profile (.zshrc-like)
# ==========================================

# -----------------------------
# PSReadLine: inline suggestions + key bindings
# -----------------------------
Import-Module PSReadLine

Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle InlineView

Set-PSReadLineKeyHandler -Chord Ctrl+Spacebar -Function MenuComplete # Popup menu

# -----------------------------
# zoxide: smart directory jumping
# -----------------------------
Invoke-Expression ((zoxide init powershell) -join "`n")
# Set-Alias z zoxide  # optional shortcut

# -----------------------------
# fzf: fuzzy search functions
# -----------------------------
function fz { cd (Get-ChildItem -Directory | fzf) }
function fzz { Get-ChildItem -Recurse | fzf }

# Optional: Ctrl+R history search using fzf
if (Test-Path "$env:USERPROFILE\.fzf\key-bindings.ps1") {
    . "$env:USERPROFILE\.fzf\key-bindings.ps1"
}

# -----------------------------
# Winget fuzzy search workaround
# -----------------------------
function wfs {
    param([string]$filter = "")
    winget search $filter | fzf
}
#Set-Alias wfs winget-fuzzy

# -----------------------------
# Winget completion
# -----------------------------
Register-ArgumentCompleter -Native -CommandName winget -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)
        [Console]::InputEncoding = [Console]::OutputEncoding = $OutputEncoding = [System.Text.Utf8Encoding]::new()
        $Local:word = $wordToComplete.Replace('"', '""')
        $Local:ast = $commandAst.ToString().Replace('"', '""')
        winget complete --word="$Local:word" --commandline "$Local:ast" --position $cursorPosition | ForEach-Object {
            [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
        }
}

# -----------------------------
# Github Cli completion
# -----------------------------
Invoke-Expression -Command $(gh completion -s powershell | Out-String)

# -----------------------------
# Gitlab Cli completion
# -----------------------------
glab completion -s powershell | Out-String | Invoke-Expression

# -----------------------------
# ALIASES
# -----------------------------
Set-Alias cat bat
Set-Alias l eza

# -----------------------------
# Custom environment variables
# -----------------------------
$env:DEV_HOME = "$env:USERPROFILE\Dev"

