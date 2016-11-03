from setuptools import setup


setup(
    name="proxy_manager",
    version='1.0',
    packages=['proxy_manager'],
    include_package_data=True,
    install_requires=[
        'uwsgi',
        'flask',
        'Flask-SQLAlchemy'
    ]
)