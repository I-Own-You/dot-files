GREEN="\033[1;32m"
BLUE="\033[1;34m"
RED="\033[1;31m"
YELLOW="\033[1;33m"
NOCOLOR="\033[0m"

exists() {
  local search_dir="./"
  local search_name="$1"
  local recursive_search=false
  local count=0

  # Check for the "-fa" flag
  if [[ "$search_name" == "-fa" ]]; then
    search_dir="./"
    search_name="$2"
    recursive_search=true
  fi
  # Check for the "-f" flag
  if [[ "$search_name" == "-f" ]]; then
    search_dir="./**/"
    search_name="$2"
    recursive_search=true
  fi

  # Search for the file or directory
  if [[ -e "${search_dir}${search_name}" ]]; then
    echo "${BLUE}${search_name}${NOCOLOR} ${GREEN}found at ${NOCOLOR}${YELLOW}$(find . -name "$search_name" | head -n1)${NOCOLOR}"
    return 0
  else
    if [[ "$recursive_search" == true ]]; then
      if [[ -n "$(find . -name "$search_name" -type d)" || -n "$(find . -name "$search_name" -type f)" ]]; then
        if [[ "$search_dir" == "./" ]]; then
          count=$(find . -name "$search_name" | wc -l)
          echo "${BLUE}${search_name}${NOCOLOR} ${GREEN}found ${NOCOLOR}(${YELLOW}${count}${NOCOLOR} ${GREEN}occurrences) at:${NOCOLOR}"
          find . -name "$search_name" -print0 | while read -d $'\0' file; do echo "${YELLOW}$file${NOCOLOR}"; done
        else
          echo "${BLUE}${search_name}${NOCOLOR} ${GREEN}found at:${NOCOLOR} ${YELLOW}$(find . -name "$search_name" | head -n1)${NOCOLOR}"
        fi
        return 0
      else
        echo "${BLUE}${search_name}${NOCOLOR} ${RED}not found${NOCOLOR}"
        return 1
      fi
    else
      echo "${BLUE}${search_name}${NOCOLOR} ${RED}not found${NOCOLOR}"
      return 1
    fi
  fi
}
