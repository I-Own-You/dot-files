# Define a function to check for aliases before running commands
function run_command_with_alias_check {
  local command="$1"
  local alias_command="$(alias "$command" 2>/dev/null | cut -d'=' -f2 | sed -e "s/'//g" -e 's/"//g')"

  if [[ -n "$alias_command" ]]; then
    echo "Alias Tip: $command -> $alias_command"
    eval "$alias_command"
  else
    eval "$command"
  fi
}

# Override the zsh `accept-line` widget to check for aliases
function override_accept_line {
  BUFFER=$(run_command_with_alias_check "$BUFFER")
  zle reset-prompt
}

# Bind the `accept-line` widget to our override function
zle -N accept-line override_accept_line
bindkey '^M' accept-line
