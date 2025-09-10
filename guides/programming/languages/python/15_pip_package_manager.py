# pip - a python tool to manage python packages outside stdlib(internet)

# by default, pip install packages from pypi.org site

# pip has a lot of commands like: install, uninstall, freeze, .etc
# usually, you will install them inside your .venv
#
#     (tutorial-env) $ python -m pip install novas
#         Collecting novas
#           Downloading novas-3.1.1.3.tar.gz (136kB)
#         Installing collected packages: novas
#           Running setup.py install for novas
#         Successfully installed novas-3.1.1.3

# you can install different version of packages by putting "==" after the packaage name and a number
#
#     # (tutorial-env) $ python -m pip install requests>=2.6.0 # minimum must be 2.6.0 version
#     (tutorial-env) $ python -m pip install requests==2.6.0
#         Collecting requests==2.6.0
#           Using cached requests-2.6.0-py2.py3-none-any.whl
#         Installing collected packages: requests
#         Successfully installed requests-2.6.0


# if you try to isntall the same packge, pip will do nothing, to upgrade a package you could use
#
# (tutorial-env) $ python -m pip install --upgrade requests
#     Collecting requests
#     Installing collected packages: requests
#       Found existing installation: requests 2.6.0
#         Uninstalling requests-2.6.0:
#           Successfully uninstalled requests-2.6.0
#     Successfully installed requests-2.7.0

# to remove a package you could use
#
# (tutirlal-env) $ python -m pip uninstall requests

# to show informatioin about a package you could use
#
# (tutorial-env) $ python -m pip show requests
# ---
#     Metadata-Version: 2.0
#     Name: requests
#     Version: 2.7.0
#     Summary: Python HTTP for Humans.
#     Home-page: http://python-requests.org
#     Author: Kenneth Reitz
#     Author-email: me@kennethreitz.com
#     License: Apache 2.0
#     Location: /Users/akuchling/envs/tutorial-env/lib/python3.4/site-packages
#     Requires:

# if you want to display all packages installed in the .venv you could use
#
# (tutorial-env) $ python -m pip list
#     novas (3.1.1.3)
#     numpy (1.9.2)
#     pip (7.0.3)
#     requests (2.7.0)
#     setuptools (16.0)

# if you want to display all packages but in a format that pip install would take to install, you could use
#
# (tutorial-env) $ python -m pip freeze > requirements.txt
# (tutorial-env) $ cat requirements.txt
#     novas==3.1.1.3
#     numpy==1.9.2
#     requests==2.7.0
# (tutorial-env) $ python -m pip uninstall *
# (tutorial-env) $ python -m pip install -r requirements.txt
