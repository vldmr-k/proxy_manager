# -*- coding: utf-8 -*-
import sys

__version__ = '0.1'
from flask import Flask, _app_ctx_stack
import psycopg2
from config import *
from repository import *

app = Flask('proxy_manager')
app.config['SECRET_KEY'] = 'random'
app.debug = True

db = None

try:
    db = psycopg2.connect(database=DB_NAME, host=DB_HOST, port=DB_PORT, user=DB_USER, password=DB_PASSWORD)
except TypeError, e:
    print e.message
    sys.exit()



from proxy_manager.controllers import *