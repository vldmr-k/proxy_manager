# -*- coding: utf-8 -*-
#!flask/bin/python

from proxy_manager import app
from flask import jsonify
from ..repository.proxy import Finder


finder = Finder()

@app.route('/api/proxies', methods=['GET'])
def get_proxies():
    proxy_list = finder.find_all(0, 20)
    return jsonify({'proxies': proxy_list})

@app.route('/api/proxy/<int:proxy_id>', methods=['GET'])
def get_proxy(proxy_id):
    proxy = finder.find_by_id(proxy_id)
    return jsonify({'proxy': proxy.to_dict()})