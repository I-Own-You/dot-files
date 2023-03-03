# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi


GREEN="\033[1;32m"
NOCOLOR="\033[0m"

HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=1000
setopt SHARE_HISTORY # there are differnert types, better read, it is impportant
#                                   (appendhistory - share all terminals)
#                                   (SHARE_HISTORY) - terminals has their own when active


# Created by newuser for 5.8.1
alias nzsh="nvim ~/.zshrc"
alias szsh=". ~/.zshrc"
alias paliases="print -rl -- ${(k)aliases}"

# custom vars
alias b="cd .."
alias h="cd ~"
alias ncf="cd ~/.config/nvim && nvim"
alias xo="xdg-open"
alias py="python3.11"
alias python="python3.11"
alias cat="bat"
alias cls="clear"
alias wd="pwd"
alias t="touch"
alias m="mkdir"
alias fgit="forgit::"

# cusotm pip
alias pir="pip install -r requirements.txt"
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
# export ZSH_PLUGINS_ALIAS_TIPS_TEXT="Alias : "

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
# The kind:fpath only puts the plugin folder on the fpath, doing nothing else. It can be especially useful for completion scripts that aren’t intended to be sourced directly, or for prompts that support promptinit.
# The kind:clone only gets the plugin, doing nothing else. It can be useful for managing a package that isn’t directly used as a shell plugin.
# The kind:defer option defers loading of a plugin. This can be useful for plugins you don’t need available right away or are slow to load. Use with caution.
# branch:(your) You can also specify a branch to download, if you don’t want the main branch for whatever reason.
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


# eval "`pip completion --zsh`"
# compctl -K _pip_completion pip3

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh



# into zsh-vi-mode plugin
# ZVM_VI_INSERT_ESCAPE_BINDKEY=jk
# ZVM_VI_VISUAL_ESCAPE_BINDKEY=jk
# ZVM_VI_HIGHLIGHT_BACKGROUND=#383737 # Hex value
# ZVM_VI_EDITOR=nvim
