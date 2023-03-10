# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

xset r rate 300 50

GREEN="\033[1;32m"
NOCOLOR="\033[0m"

HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=1000
setopt SHARE_HISTORY # there are differnert types, better read, it is impportant
#                                   (appendhistory - share all terminals)
#                                   (SHARE_HISTORY) - terminals has their own when active


# Created by newuser for 5.8.1
alias nzsh="cd ~/dot-files && nvim .zshrc"
alias szsh=". ~/dot-files/.zshrc"
alias paliases="print -rl -- ${(k)aliases}"

# custom vars
alias u="sudo apt update"
alias ug="sudo apt upgrade"
alias uu="sudo apt update && sudo apt upgrade"
alias remove="sudo apt remove"
alias rc="sudo apt autoremove && sudo apt autoclean"
alias b="cd .."
alias h="cd ~"
alias ncf="cd ~/.config/nvim && nvim"
alias dff="cd ~/dot-files && nvim"
alias vim="nvim"
alias xo="xdg-open"
alias py="python3.11"
alias ip="ipython"
alias python="python3.11"
alias cat="batcat"
alias cls="clear"
alias wd="pwd"
alias t="touch"
alias m="mkdir"
alias fgit="forgit::"

# cusotm pip
alias pir="pip install -r"
alias pi="pip install"
alias pui="pip uninstall"
alias pp="pip freeze | sort"

# custom django
alias pm="python manage.py"
alias pms="python manage.py shell"
alias pmm="python manage.py migrate"
alias pmmm="python manage.py makemigrations"
alias pmmmm="python manage.py makemigrations && python manage.py migrate"
alias pmcs="python manage.py collectstatic"
alias pmrs="python manage.py runserver"
alias pmrsb="xo http://127.0.0.1:8000/ && python manage.py runserver"

# custom scripts == ~/zsh_custom_scripts/
alias cpwd="cpwd"
alias e="exists"
alias r="custom_rename"
alias c="count_files"

#git aliases
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
# gbd	git branch -d
alias gbD='git branch -D'
# gbl	git blame -b -w
# alias gbnm='git branch --no-merged'
# alias gbr='git branch --remote'
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
# gfg	git ls-files | grep
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
# gm	git merge
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
# gra	git remote add
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
# gsw	git switch
# gswc	git switch -c
# gts	git tag -s
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
export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS'
--color=fg:#4d4d4c,bg:#1E1E1E,hl:#d17013
--color=fg+:#4d4d4c,bg+:#333232,hl+:#d17013
--color=info:#4271ae,prompt:#8959a8,pointer:#d17013
--color=marker:#4271ae,spinner:#4271ae,header:#4271ae'
# export ZSH_PLUGINS_ALIAS_TIPS_TEXT="Alias ???: "
export VISUAL=nvim
export EDITOR=nvim
export FORGIT_NO_ALIASES=1

source ${ZDOTDIR:-~}/.antidote/antidote.zsh

antidote load

source ~/.zsh_plugins.zsh

source ~/zsh_custom_scripts/zsh-auto-enable-py-env.sh
source ~/zsh_custom_scripts/exists.sh
source ~/zsh_custom_scripts/count_files.sh
source ~/zsh_custom_scripts/cpwd.sh
source ~/zsh_custom_scripts/custom_rename.sh


zstyle ':completion:*:descriptions' format '[%d]'
zstyle ':fzf-tab:*' fzf-flags $(echo $FZF_DEFAULT_OPTS)

zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|=*' 'l:|=* r:|=*'
zstyle ':completion:*' matcher-list 'r:[[:ascii:]]||[[:ascii:]]=** r:|=* m:{a-z\-}={A-Z\_}'
unsetopt EXTENDED_GLOB

function zvm_after_init() {
  source /usr/share/doc/fzf/examples/key-bindings.zsh && source /usr/share/doc/fzf/examples/completion.zsh &&
      source /home/mkc/.cache/antidote/https-COLON--SLASH--SLASH-github.com-SLASH-Aloxaf-SLASH-fzf-tab/fzf-tab.zsh &&
      source /home/mkc/.cache/antidote/https-COLON--SLASH--SLASH-github.com-SLASH-mdumitru-SLASH-fancy-ctrl-z/fancy-ctrl-z.zsh &&
      source /home/mkc/.cache/antidote/https-COLON--SLASH--SLASH-github.com-SLASH-jimhester-SLASH-per-directory-history/per-directory-history.zsh &&
      bindkey "^ " autosuggest-accept      
}

# rm -rf `antidote home` or rm -rf $(antidote home)
# rm ${ZDOTDIR:-~}/.zsh_plugins.zsh or rm ~/.zsh_plugins.zsh - remove completely

# Options
# The default is kind:zsh
# The kind:path mode will just put the plugin folder in your $PATH.
# The kind:fpath only puts the plugin folder on the fpath, doing nothing else. It can be especially useful for completion scripts that aren???t intended to be sourced directly, or for prompts that support promptinit.
# The kind:clone only gets the plugin, doing nothing else. It can be useful for managing a package that isn???t directly used as a shell plugin.
# The kind:defer option defers loading of a plugin. This can be useful for plugins you don???t need available right away or are slow to load. Use with caution.
# branch:(your) You can also specify a branch to download, if you don???t want the main branch for whatever reason.
# path:(your path)  You may specify a subfolder or a specific file if the repo you are bundling contains multiple plugins. This is especially useful for frameworks like Oh-My-Zsh.
# use-friendly-names 'your name'  You can also change how Antidote names the plugin directories by adding this to your .zshrc 

# Commands
# antidote home -- directory of all plugins
# antidote install user_name/repo-name --install a plugin apart
# antidote install user_name/repo-name${ZDOTDIR:-~}/myplugins.conf --with custom directory plugins
# antidote list -- plugins that you cloned
# antiode load or with customp plugin directory  antidote load ${ZDOTDIR:-~}/myplugins.conf -- load and source plugins
# antidote path user_name/repo-name  --path being used for a cloned bundle.
# antidote purge ohmyzsh/ohmyzsh -- purge a bundle
# antidote update -- update itself and also plugins


eval "`pip completion --zsh`"
compctl -K _pip_completion pip3

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
