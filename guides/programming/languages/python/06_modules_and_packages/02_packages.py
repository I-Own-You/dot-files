# package
# 1. a way of structuring module namespaces by ussing dotted module names: A.B, where B is a submodule inside package A
# 2. __init__.py file is required isnide a folder to make it a package recognized by python and execute some code within it:
#    1. you can also omit this file, in which case the package becomes just a namespcae for modules

# example structure of the current package inside this folder
# sound/                          Top-level package
#       __init__.py               Initialize the sound package
#       formats/                  Subpackage for file format conversions
#               __init__.py
#               wavread.py
#               wavwrite.py
#               aiffread.py
#               aiffwrite.py
#               auread.py
#               auwrite.py
#       effects/                  Subpackage for sound effects
#               __init__.py
#               echo.py
#               surround.py
#               reverse.py
#       filters/                  Subpackage for filters
#               __init__.py
#               equalizer.py
#               vocoder.py
#               karaoke.py

# a way to import a module from a packge
import sound.effects.echo  # noqa

sound.effects.echo.echo_filter(2, 3)

# alternative way of import
from sound.effects import echo  # noqa

echo.echo_filter(2, 5)

# alterntive way of import
from sound.effects.echo import echo_filter  # noqa

echo_filter(3, 5)
# but all of the above must have at the end of their import name a package/module and not a definition

# what happens here ?
from sound.effects import *  # noqa
# an ideal case would be just to import the modules within effects packgae,
# but in reality it could lead to bugs, but there is a way to evade bugs with __init__.py file,
# the point is to define inside __init__.py file what exaclty is exported:
# 1. if __init__.py defines a __all__ variable list, it goes as a list of modules which should be imported when you do
#    from sound.effects import *
# 2. you can check the sound.effect package inside __init__.py file content
# 3. but be aware that if __init__.py has defined a local name thath has the name of the exported module, then
#    __all__ will refer to that local name and not export the module, check the __init__.py inside sound.effect
# 4. if you dont have an __all__ variable inside __init__.py file, then, from sound.effects import * will:
#    1. ensure sound.effects package is imported
#    2. possibly running any code inside __init__.py file if any
#    3. imports any name inside sound.effects package

# intra-package reference
# 1. you can also use local paths with dot notation instead of absoulte paths
# suppose you are inside sounde.effects package within surround.py module
# from . import echo # import echo module with "." because you are in the same package
# from .. import formats # import formats package with ".." because its one level up folder
# from ..filters import equalizer # import equalizer module with "..filters" because its one level up folder + filters

# __init__.py files of packages also have __path__ special variable:
#    1. it mostly contains a list of strings
#    2. it basically says where to look for subpackages/submodules and also can be extended which affects finding them
