# -*- coding: utf-8 -*-
import sys

from flask_sqlalchemy import SQLAlchemy

__version__ = '0.1'
from flask import Flask, _app_ctx_stack
import psycopg2
from config import *
from repository import *

app = Flask('proxy_manager')
app.config['SECRET_KEY'] = 'random'
app.debug = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://{}:{}@{}:{}/{}'.format(DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)


from proxy_manager.controllers import *