import os
from setuptools import setup, find_packages
import uuid

setup(
    name = "sharadvikram.com",
    version = "0.0.2",
    author = "Sharad Vikram",
    author_email = "sharad.vikram@gmail.com",
    description = "",
    license = "MIT",
    keywords = "",
    url = "",
    packages=find_packages(include=[
        'server'
    ]),
    entry_points={
        'console_scripts': [
            'server=run:main',
        ],
    },
    long_description="",
    classifiers=[
    ],
)
