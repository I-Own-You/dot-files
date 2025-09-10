# virtual environment:
#    1. contains a specific python veresion
#    2. contains specific python packages(version also) that this environment needs ( not from stdlib )

# the main point of an virtual environment is to have a folder ready to setup a project with its packages,
# without downloading packages everytime a venv needs it.

# venv module is responsible for crete/manage pyhton virtual environments
# 1. when you create a venv, the python version of that venv will be the version of python from that cli,
#    so if you installed: python -m venv my_venv (it will take the --version of python here)

# to create a virtual environment you can do:
# python -m venv my_venv_name
# 1. this will create a folder named my_venv_name with python interpreter of its version and other needing files

# typical name of a virtual environment is .venv, "." makes it hidden, "venv" to sepcific a python environment and,
# not clash with ".env" files which typically contains environment variables

# to activate a virtual environment, you must activate it
# 1. windows: .venv\Scripts\activate
# 2. unix/macos: source/. .venv/bin/activate
# 3. if you dont use bash and use csh/fish/zsh or whatever, there should be activate.csh, activate.fish, .etc
# 4. activating the virtual environment will chagne the shell prompt to show which virtual environment you are using and,
#    modify the environment so that running python will use the python from that .venv and its packages
# example:
#     $ source ~/envs/tutorial-env/bin/activate
#     (tutorial-env) $ python
#     Python 3.5.1 (default, May  6 2016, 10:59:36)
#     ...
#     >>> import sys
#     >>> sys.path
#     ['', '/usr/local/lib/python35.zip', ...,
#     '~/envs/tutorial-env/lib/python3.5/site-packages']
#     >>>
# 5. to deactivate a virtual environment you can use "deactivate" command in cli
