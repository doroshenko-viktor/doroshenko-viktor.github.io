---
title: Python - Create and distribute packages
date: "2023-02-05"
description: "How to create and distribute python package"
---

To create new python distributable package, create new folder contaning:

- `__init__.py` - this file defines this folder as a python package folder
- `setup.py` - this file contains distributable package configuration
- `readme` - standard readme file, which may have one of the following extensions:
  - `README` 
  - `README.rst` 
  - `README.txt`
  - `README.md`

Simplest `setup.py` file can contain following:

```python
from setuptools import setup, find_packages

setup(
    name='package name',
    version='package version',
    description='package description',
    author='author name',
    author_email='email of the author',
    packages=find_packages(),
    install_requires=[
        # list of required dependencies
    ],
)
```

To create distributable, run:

```bash
python setup.py sdist bdist_wheel
```

This will create two distributable files in `dist` folder. These files could be installed with `pip` and used in other projects
as dependencies:

```bash
pip install <created-package-file-path>
```

Or it can be uploaded to the `pypi` repository:

```bash
twine upload <package-path>
```
