// 1. everything that starts with "#" is named "directive"
// 2. a directive is only 1 line long without any speacial symbols at the end
#include <stdio.h>
#include "stdbool.h"

// 3. difference between "" and <> for headers is this:
//    1. headers inside "" are searched in the source directory(where this file exists) and then,
//       it goes to checking system path, its mainly for user created headers insdie the current folder
//    2. headers inside <> are searched in system path only, so for std headers you must use this
