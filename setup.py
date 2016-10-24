from setuptools import setup


setup(
    name="proxy_manager",
    packages=['proxy_manager'],
    include_package_data=True,
    install_requires=[
        'flask',
        'psycopg2'
    ]
)