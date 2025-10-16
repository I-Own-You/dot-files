if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# xset r rate 300 50

GREEN="\033[1;32m"
NOCOLOR="\033[0m"

HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
bindkey -e
setopt SHARE_HISTORY # there are differnert types, better read, it is impportant
#                      (appendhistory - share all terminals)
#                      (SHARE_HISTORY) - terminals has their own when active


# Created by newuser for 5.8.1
alias vim='nvim'
alias nzsh="cd ~/dot-files/dot-files && nvim .zshrc"
alias szsh=". ~/dot-files/dot-files/.zshrc"
alias qq="shutdown now"
alias qr="shutdown -r now"

# custom vars
alias l="eza"
alias b="cd .."
alias ncf="cd ~/.config/nvim && nvim"
alias dff="cd ~/dot-files && nvim"
alias cat="bat"
alias cls="clear"
alias t="touch"
alias m="mkdir"

alias r="custom_rename"

#git aliases
alias gst='git status'
alias gc='git commit -m '
alias gp='git push'

# forgit aliases
alias fga="forgit::add"
alias fgb="forgit::blame"
alias fgbd="forgit::branch::delete"
alias fgcb="forgit::checkout::branch"
alias fgcc="forgit::checkout::commit"
alias fgcf="forgit::checkout::file"
alias fgct="forgit::checkout::tag"
alias fgchp="forgit::cherry::pic"
alias fgchpfb="forgit::cherry::pick::from::branch"
alias fgc="forgit::clean"
alias fgd="forgit::diff"
alias fge="forgit::error"
alias fgf="forgit::fixup"
alias fgi="forgit::ignore"
alias fgic="forgit::ignore::clean"
alias fgig="forgit::ignore::get"
alias fgil="forgit::ignore::list"
alias fgiu="forgit::ignore::update"
alias fgl="forgit::log"
alias fgr="forgit::rebase"
alias fgrh="forgit::reset::head"
alias fgrc="forgit::revert::commit"
alias fgsp="forgit::stash::push"
alias fgss="forgit::stash::show"
alias fgw="forgit::warn"

#eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

source ${ZDOTDIR:-~}/.antidote/antidote.zsh

antidote load

source ~/.zsh_plugins.zsh

source ~/dot-files/dot-files/scripts/custom_rename.sh

zstyle ':completion:*:descriptions' format '[%d]'
zstyle ':fzf-tab:*' fzf-flags $(echo $FZF_DEFAULT_OPTS)
#zstyle :compinstall filename '/home/mkc/.zshrc'
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|=*' 'l:|=* r:|=*'
# zstyle ':completion:*' matcher-list 'r:[[:ascii:]]||[[:ascii:]]=** r:|=* m:{a-z\-}={A-Z\_}'
unsetopt EXTENDED_GLOB

function zvm_after_init() {
	source /usr/share/fzf/key-bindings.zsh &&
	source /usr/share/fzf/completion.zsh &&
	source /home/mkc/.cache/antidote/https-COLON--SLASH--SLASH-github.com-SLASH-Aloxaf-SLASH-fzf-tab/fzf-tab.zsh &&
	source /home/mkc/.cache/antidote/https-COLON--SLASH--SLASH-github.com-SLASH-mdumitru-SLASH-fancy-ctrl-z/fancy-ctrl-z.zsh &&
	source /home/mkc/.cache/antidote/https-COLON--SLASH--SLASH-github.com-SLASH-jimhester-SLASH-per-directory-history/per-directory-history.zsh &&
	source /home/mkc/.cache/antidote/https-COLON--SLASH--SLASH-github.com-SLASH-zsh-users-SLASH-zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
	}

WORDCHARS='*?_-.[]~=&;!#$%^(){}<>'
bindkey '\el' forward-word # alt + l
bindkey '^[^?' backward-delete-word # alt + backspace


function ff() {
	local tmp="$(mktemp -t "yazi-cwd.XXXXXX")"
	yazi "$@" --cwd-file="$tmp"
	if cwd="$(cat -- "$tmp")" && [ -n "$cwd" ] && [ "$cwd" != "$PWD" ]; then
		cd -- "$cwd"
	fi
	rm -f -- "$tmp"
}

autoload -U compinit
compinit -i

eval "$(zoxide init zsh)"

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

eval "$(uv generate-shell-completion zsh)"
eval "$(uvx --generate-shell-completion zsh)"

#. "$HOME/.local/bin/env"
