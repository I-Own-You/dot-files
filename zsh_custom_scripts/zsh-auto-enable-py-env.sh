GREEN="\033[1;32m"
RED="\033[1;31m"
NOCOLOR="\033[0m"

function cd() {
  builtin cd "$@"
  if [[ -d env ]]; then
    if [[ -z "$VIRTUAL_ENV" ]]; then
      source env/bin/activate
      echo -e "${GREEN}Virtual environment${NOCOLOR} has been activated: ${GREEN}$(pwd -P)/env${NOCOLOR}"
    else
      if [[ "$VIRTUAL_ENV" != "$(pwd -P)/env" ]]; then
        old_env="$VIRTUAL_ENV"
        deactivate
        source env/bin/activate
        echo -e "${GREEN}Virtual environment${NOCOLOR} has been deactivated: ${RED}$old_env${NOCOLOR}"
        if [[ -n "$old_env" ]]; then
            echo -e "${GREEN}Virtual environment${NOCOLOR} has been activated: ${GREEN}$(pwd -P)/env${NOCOLOR}"
        fi
      fi
    fi
  else
    if [[ -n "$VIRTUAL_ENV" ]]; then
      old_env="$VIRTUAL_ENV"
      deactivate
      echo -e "${GREEN}Virtual environment${NOCOLOR} has been deactivated: ${RED}$old_env${NOCOLOR}"
    fi
  fi
}
