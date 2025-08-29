# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# if [[ $(ps --no-header -p $PPID -o comm) =~ '^yakuake|kitty$' ]]; then
#         for wid in $(xdotool search --pid $PPID); do
#             xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id $wid; done
# fi
# xset r rate 300 50

GREEN="\033[1;32m"
NOCOLOR="\033[0m"

HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
bindkey -e
setopt SHARE_HISTORY # there are differnert types, better read, it is impportant
#                                   (appendhistory - share all terminals)
#                                   (SHARE_HISTORY) - terminals has their own when active


# Created by newuser for 5.8.1
alias s="sudo "
alias btr="upower -i /org/freedesktop/UPower/devices/battery_BAT0 | rg state"
alias nf='nvim $(fzf)' # okay so " " executes it immediately, so put '' only
# alias cdd='fd -t=d -H | fzf | wl-copy' 
alias cdd='fd -t=d -H | fzf | xclip -selection clipboard'
alias hexit='hyprctl dispatch exit'
alias hp='Hyprland'
alias nvlt='nvim leetcode.nvim'
alias bp='btop'
# alias cpwf='fzf | wl-copy' 
alias cpwf='fzf | xclip -selection clipboard'
alias tg='cd ~/Telegram && ./Telegram'
alias pa="sudo pacman"
alias pau="sudo pacman -Syu"
alias pai="sudo pacman -S"
alias par="sudo pacman -Rns"
alias nzsh="cd ~/dot-files/dot-files && nvim .zshrc"
alias szsh=". ~/dot-files/dot-files/.zshrc"
alias paliases="print -rl -- ${(k)aliases}"
alias sb="startx bspwm"
alias neo="neofetch"
alias ms="makepkg -s"
alias mi="makepkg -i"
alias qq="shutdown now"
alias qr="shutdown -r now"
alias ql"gnome-session-quit --no-prompt"
alias wt="curl wttr.in"
alias n="nvim"

# custom vars
alias ww="wget"
alias l="eza"
alias et="eza -T --long"
alias b="cd .."
alias ncf="cd ~/.config/nvim && nvim"
alias dff="cd ~/dot-files && nvim"
# alias vim="nvim"
alias ae=". env/bin/activate"
alias de="deactivate"
alias xo="nautilus &"
alias py="python3.10"
alias pt="ipython"
alias psh="ipython --TerminalInteractiveShell.editing_mode=vi"
# alias python="python3.11"
alias cat="bat"
alias cls="clear"
alias t="touch"
alias m="mkdir"
alias fgit="forgit::"

# cusotm pip
alias pir="pip install -r"
alias pi="pip install"
alias pui="pip uninstall"
alias pl="pip freeze | sort"
# alias pip3.11="~/.local/bin/pip3.11"

# custom django
alias pm="python manage.py"
alias pms="python manage.py shell"
alias pmm="python manage.py migrate"
alias pmmm="python manage.py makemigrations"
alias pmmmm="python manage.py makemigrations && python manage.py migrate"
alias pmcs="python manage.py collectstatic"
alias pmrs="python manage.py runserver"
alias pmrsb="xo http://127.0.0.1:8000/ && python manage.py runserver"
# alias djshell="django-admin shell --settings=$(echo "${PWD##*/}").settings -i ipython"
alias da="django-admin"

# custom scripts == ~/dot-files/scripts/
alias cpwd="cpwd"
alias r="custom_rename"

#git aliases
alias gg='git clone'
alias g='git'
alias ga='git add'
alias gaa='git add --all'
alias gapa='git add --patch'
alias gau='git add --update'
alias gav='git add --verbose'
alias gap='git apply'
# alias gapt='git apply --3way'
alias gb='git branch'
alias gbl='git branch --list'
alias gbf='git branch -f'
# gba	git branch -a
alias gbd='git branch -d'
alias gbD='git branch -D'
# gbl	git blame -b -w
# alias gbnm='git branch --no-merged'
alias gbr='git branch --remote'
alias gbi= 'git bisect'
alias gbib='git bisect bad'
alias gbig='git bisect good'
alias gbir='git bisect reset'
alias gbis='git bisect start'
alias gc='git commit'
# gc	git commit -v
# gc!	git commit -v --amend
# gcn!	git commit -v --no-edit --amend
# gca	git commit -v -a
# gca!	git commit -v -a --amend
# gcan!	git commit -v -a --no-edit --amend
# gcans!	git commit -v -a -s --no-edit --amend
# gcam	git commit -a -m
# gcas	git commit -a -s
# gcasm	git commit -a -s -m
# gcsm	git commit -s -m
alias gchb='git checkout -b'
alias gch='git checkout'
# gcf	git config --list
# gcl	git clone --recurse-submodules
# gclean	git clean -id
# gpristine	git reset --hard && git clean -dffx
# gcm	git checkout $(git_main_branch)
# gcd	git checkout develop
alias gcm='git commit -m'
# gco	git checkout
# gcount	git shortlog -sn
alias gcp='git cherry-pick'
# gcpa	git cherry-pick --abort
# gcpc	git cherry-pick --continue
# gcs	git commit -S
alias gd='git diff'
alias gdc='git diff --cached'
# gdcw	git diff --cached --word-diff
# gdct	git describe --tags $(git rev-list --tags --max-count=1)
# gds	git diff --staged
# gdt	git diff-tree --no-commit-id --name-only -r
# gdnolock	git diff $@ ":(exclude)package-lock.json" ":(exclude)*.lock"
# gdv	git diff -w $@ | view -
# gdw	git diff --word-diff
# gf	git fetch
# gfa	git fetch --all --prune
alias gls='git ls-files'
alias glsg='git ls-files | grep'
# gfo	git fetch origin
# gg	git gui citool
# gga	git gui citool --amend
# ggf	git push --force origin $(current_branch)
# ggfl	git push --force-with-lease origin $(current_branch)
# ggl	git pull origin $(current_branch)
# ggp	git push origin $(current_branch)
# ggpnp	ggl && ggp
# ggpull	git pull origin "$(git_current_branch)"
# ggpur	ggu
# ggpush	git push origin "$(git_current_branch)"
alias gbuu='git branch --unset-upstream'
# ggu	git pull --rebase origin $(current_branch)
alias gpsu='git push --set-upstream origin $(git branch --show-current)'
alias gpdr='git push origin --delete'
# ghh	git help
# gignore	git update-index --assume-unchanged
# gignored	git ls-files -v | grep "^[[:lower:]]"
# git-svn-dcommit-push	git svn dcommit && git push github $(git_main_branch):svntrunk
# gk	gitk --all --branches
# gke	gitk --all $(git log -g --pretty=%h)
# gl	git pull
alias gl="git log"
# glg	git log --stat
# glgp	git log --stat -p
# glgg	git log --graph
# glgga	git log --graph --decorate --all
# glgm	git log --graph --max-count=10
# glo	git log --oneline --decorate
# glol	git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'
# glols	git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --stat
# glod	git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ad) %C(bold blue)<%an>%Creset'
# glods	git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ad) %C(bold blue)<%an>%Creset' --date=short
# glola	git log --graph --pretty='%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --all
# glog	git log --oneline --decorate --graph
# gloga	git log --oneline --decorate --graph --all
# glp	git log --pretty=<format>
alias gm='git merge'
# gmom	git merge origin/$(git_main_branch)
# gmt	git mergetool --no-prompt
# gmtvim	git mergetool --no-prompt --tool=vimdiff
# gmum	git merge upstream/$(git_main_branch)
# gma	git merge --abort
alias gp='git push'
# gpd	git push --dry-run
# gpf	git push --force-with-lease
# gpf!	git push --force
# gpoat	git push origin --all && git push origin --tags
# gpu	git push upstream
# gpv	git push -v
# gr	git remote
alias gra='git remote add'
# grb	git rebase
# grba	git rebase --abort
# grbc	git rebase --continue
# grbd	git rebase develop
# grbi	git rebase -i
# grbm	git rebase $(git_main_branch)
# grbo	git rebase --onto
# grbs	git rebase --skip
# grev	git revert
alias grt='git reset'
alias grts='git reset --soft'
alias grth='git reset --hard'
alias grtm='git reset --merge'
# groh	git reset origin/$(git_current_branch) --hard
# grm	git rm
# grmc	git rm --cached
# grmv	git remote rename
# grrm	git remote remove
alias gr='git restore'
alias grs='git restore --staged'
# grset	git remote set-url
# grss	git restore --source
# grt	cd "$(git rev-parse --show-toplevel || echo .)"
# gru	git reset --
# grup	git remote update
# grv	git remote -v
# gsb	git status -sb
# gsd	git svn dcommit
# gsh	git show
# gsi	git submodule init
# gsps	git show --pretty=short --show-signature
# gsr	git svn rebase
# gss	git status -s
alias gst='git status'
alias gstpu='git stash push'
alias gsts='git stash save'
alias gsta='git stash apply'
alias gstc='git stash clear'
alias gstd='git stash drop'
alias gstl='git stash list'
alias gstpo='git stash pop'
alias gstst='git stash show --text'
alias gstiu='git stash --include-untracked'
alias gstall='git stash --all'
# gsu	git submodule update
alias gsw='git switch'
alias gswc='git switch -c'
alias gt='git tag'
# gtv	git tag | sort -V
# gtl	gtl(){ git tag --sort=-v:refname -n -l ${1}* }; noglob gtl
# gunignore	git update-index --no-assume-unchanged
# gunwip	git log -n 1 | grep -q -c "--wip--" && git reset HEAD~1
# gup	git pull --rebase
# gupv	git pull --rebase -v
# gupa	git pull --rebase --autostash
# gupav	git pull --rebase --autostash -v
# glum	git pull upstream $(git_main_branch)
# gwch	git whatchanged -p --abbrev-commit --pretty=medium
# gwip	git add -A; git rm $(git ls-files --deleted) 2> /dev/null; git commit --no-verify --no-gpg-sign -m "--wip-- [skip ci]"
# gam	git am
# gamc	git am --continue
# gams	git am --skip
# gama	git am --abort
# gamscp	git am --show-current-patch

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

# autoload -Uz promptinit && promptinit && prompt pure
# export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS'
# --color=fg:#4d4d4c,bg:#1E1E1E,hl:#72DEC2
# --color=fg+:#4d4d4c,bg+:#333232,hl+:#72DEC2
# --color=info:#4271ae,prompt:#8959a8,pointer:#72DEC2
# --color=marker:#4271ae,spinner:#4271ae,header:#4271ae'

# --color=fg:#c0caf5,bg:#1a1b26,hl:#bb9af7
# --color=fg+:#ffffff,bg+:#1a1b26,hl+:#7dcfff
export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS' 
--color=fg:#c0caf5,hl:#bb9af7
--color=fg+:#ffffff,hl+:#7dcfff
--color=info:#7aa2f7,prompt:#7dcfff,pointer:#7dcfff 
--color=marker:#9ece6a,spinner:#9ece6a,header:#9ece6a'

# export ZSH_PLUGINS_ALIAS_TIPS_TEXT="Alias : "
export VISUAL=nvim
export EDITOR=nvim
export FORGIT_NO_ALIASES=1
export LESS="-RXF"

source ${ZDOTDIR:-~}/.antidote/antidote.zsh

antidote load

source ~/.zsh_plugins.zsh

# source ~/dot-files/scripts/zsh-auto-enable-py-env.sh
source ~/dot-files/scripts/cpwd.sh
source ~/dot-files/scripts/custom_rename.sh

path+=('/home/mkc/.cargo/bin')
#PATH=$PATH:$(go env GOPATH)/bin # another way to specify path, just for info, also: PATH=$PATH:$HOME/go/bin
export PATH

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

#bindkey '^[[1;3C' forward-word  # Alt + →
#bindkey '^[[C' autosuggest-accept  # Right arrow
bindkey '\el' forward-word


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


# [ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
