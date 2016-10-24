# -*- coding: utf-8 -*-
from proxy_manager import app
from flask import render_template, request

@app.route('/')
def index():
    return render_template('index.html')