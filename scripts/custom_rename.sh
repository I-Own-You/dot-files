GREEN="\033[1;32m"
BLUE="\033[1;34m"
RED="\033[1;31m"
YELLOW="\033[1;33m"
NOCOLOR="\033[0m"

custom_rename() {
  local old_name="$1"
  local new_name="$2"
  
  if [[ ! -e "$old_name" ]]; then
    echo "${RED}Error:${NOCOLOR} ${YELLOW}${old_name}${NOCOLOR} does not exist."
    return 1
  fi
  
  if [[ -e "$new_name" ]]; then
    echo "${RED}Error:${NOCOLOR} ${YELLOW}${new_name} already exists."
    return 1
  fi
  
  mv "$old_name" "$new_name"
  echo "${GREEN}Successfully${NOCOLOR} renamed ${YELLOW}${old_name}${NOCOLOR} to ${YELLOW}${new_name}.${NOCOLOR}"
  return 0
}
