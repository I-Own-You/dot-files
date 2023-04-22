import os
import sys

dict_custom_paths = {
    "/home/mkc/.config/nvim/django_imports.txt": [
        "/home/mkc/Documents/personal_projects/andys_pizza/env/lib/python3.11/site-packages/django",
        "/home/mkc/.config/nvim/django_imports.txt",
        "django.",
    ],
    # '-dri': [
    #     '/home/mkc/documents/projects/home/player_market/env/lib/python3.11/site-packages/django',
    #     'django_rest_imports.txt',
    # ],
    "/home/mkc/Documents/personal_projects/andys_pizza/project_auto_imports.txt": [
        "/home/mkc/Documents/personal_projects/andys_pizza/",
        "/home/mkc/Documents/personal_projects/andys_pizza/project_auto_imports.txt",
        "",
    ],
}
exclude_dirs = [
    "env",
    ".env" "__pycache__",
    ".mypy_cache",
]

name = ""
# Walk through all files in the Django directory and its subdirectories
for root, dirs, files in os.walk(dict_custom_paths[sys.argv[1]][0]):
    if "project_auto_imports.txt" in sys.argv[1]:
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
    for file in files:
        # Only look at Python files
        if file.endswith(".py"):
            filepath = os.path.join(root, file)
            with open(filepath, "r") as f:
                # Read the contents of the file
                contents = f.read()
                # Split the contents into lines
                lines = contents.split("\n")
                for line in lines:
                    if line.startswith(" ") or line.startswith("#") or line.startswith("@"):
                        continue
                    # Find global definitions of functions, classes, and variables
                    if (
                        line.startswith("def ")
                        or line.startswith("class ")
                        or "=" in line
                    ):
                        if not line.startswith("def ") and not line.startswith(
                            "class "
                        ):
                            if len(line.split()) >= 2 and line.split()[1] == "=":
                                # Get the name of the variable
                                name = line.split()[0]
                            else:
                                continue
                        else:
                            # Get the name of the function or class
                            name = line.split()[1].split("(")[0]
                            if name[-1] == ":":
                                name = name.rstrip(":")  # for classes without ()
                        # Create a relative import statement
                        relative_import = ".".join(
                            os.path.relpath(
                                filepath, dict_custom_paths[sys.argv[1]][0]
                            ).split("/")[:-1]
                        )
                        if relative_import:
                            relative_import += "."
                        # Add the import statement to the my_imports_file
                        with open(dict_custom_paths[sys.argv[1]][1], "a") as f2:
                            if name:
                                f2.write(
                                    f"from {dict_custom_paths[sys.argv[1]][2]}{relative_import}{os.path.splitext(file)[0]} import {name}\n"
                                )
