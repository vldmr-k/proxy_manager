# -*- coding: utf-8 -*-
from flask import abort

from proxy_manager import app, db
from flask import jsonify
from flask import request
from ..models.proxy import Proxy


@app.route('/api/proxies', methods=['GET'])
def get_proxies():
    proxy_list = []
    return jsonify({'proxies': proxy_list})

@app.route('/api/proxy/<int:proxy_id>', methods=['GET'])
def get_proxy(proxy_id):
    proxy = Proxy.query.filter_by(id=proxy_id).first()
    return jsonify({'proxy': proxy.asdict()})

@app.route('/api/proxy/<int:proxy_id>', methods=['PUT'])
def put_proxy(proxy_id):
    if not request.json:
        abort(400)


    proxy = db.session.query(Proxy).get(proxy_id)
    proxy.remote_addr = request.json['remote_addr']
    db.session.commit()

    return jsonify({'proxy': proxy.asdict()})