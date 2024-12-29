GREEN="\033[1;32m"
NOCOLOR="\033[0m"
BLUE="\033[1;34m"

function cpwd() {
  pwd | tr -d '\n' | wl-copy
  # pwd | tr -d '\n' | xclip -selection clipboard for xorg
  echo "${BLUE}Path copied${NOCOLOR} == ${GREEN}'$(pwd)'${NOCOLOR}"
}
