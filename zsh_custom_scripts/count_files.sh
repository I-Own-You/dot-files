GREEN="\033[1;32m"
BLUE="\033[1;34m"
RED="\033[1;31m"
YELLOW="\033[1;33m"
NOCOLOR="\033[0m"


count_files() {
    if [[ $1 == "-fc" ]]; then
        if [[ $2 ]]; then
            echo "Total number of files in ${GREEN}$2${NOCOLOR} is: " ${RED}$(sudo fd $2 -maxdepth 1 -type f | wc -l)${NOCOLOR}
        else
          # Count all files in the current directory only
          all_files=$(sudo fd . -maxdepth 1 -type f | wc -l)
          echo "Total number of files in current directory ${GREEN}$PWD${NOCOLOR}: ${RED}$all_files"
        fi
    elif [[ $1 == "-dc" ]]; then
        if [[ $2 ]]; then
            echo "Total number of directories in ${GREEN}$2${NOCOLOR} is: " ${RED}$(sudo fd $2 -maxdepth 1 -type d | wc -l)${NOCOLOR}
        else
          # Count all directories in the current directory only
          all_dirs=$(sudo fd . -maxdepth 1 -type d | wc -l)
          echo "Total number of directories in current directory ${GREEN}$PWD${NOCOLOR}: ${RED}$all_dirs"
        fi
    elif [[ $1 == "-f" ]]; then
        if [[ $2 ]]; then
            echo "Total number of files in ${GREEN}$2${NOCOLOR} is: " ${RED}$(sudo fd $2 -type f | wc -l)${NOCOLOR}
        else
          # Count all files in the current directory and its subdirectories
          all_files=$(sudo fd . -type f | wc -l)
          echo "Total number of files in ${GREEN}${PWD}${NOCOLOR}: ${RED}$all_files${NOCOLOR}"
        fi
    elif [[ $1 == "-d" ]]; then
        if [[ $2 ]]; then
            echo "Total number of directories in ${GREEN}$2${NOCOLOR} is: " ${RED}$(sudo fd $2 -type d | wc -l)${NOCOLOR}
        else
          # Count all directories in the current directory and its subdirectories
          all_dirs=$(sudo fd . -type d | wc -l)
          echo "Total number of directories in ${GREEN}$2${NOCOLOR}: ${RED}$all_dirs${NOCOLOR}"
        fi
    else
      echo "Valid options: ${YELLOW}-f${NOCOLOR} ${BLUE}[path]${NOCOLOR}, ${YELLOW}-fc${NOCOLOR} ${BLUE}[path]${NOCOLOR}, ${YELLOW}-d${NOCOLOR} ${BLUE}[path]${NOCOLOR}, ${YELLOW}-dc${NOCOLOR} ${BLUE}[path]${NOCOLOR}"
    fi
}


# # Count all files of each type
# txt_files=$(find . -type f -name "*.txt" | wc -l)
# pdf_files=$(find . -type f -name "*.pdf" | wc -l)
# doc_files=$(find . -type f -name "*.doc" -o -name "*.docx" | wc -l)
# img_files=$(find . -type f -name "*.jpg" -o -name "*.png" -o -name "*.gif" | wc -l)



