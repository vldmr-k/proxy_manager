# -*- coding: utf-8 -*-
from flask import abort

from proxy_manager import app, db
from flask import jsonify
from flask import request

from proxy_manager.models.tag import Tag
from ..models.proxy import Proxy


@app.route('/api/proxies', methods=['GET'])
def get_proxies():
    obj_proxy_list = Proxy.query.limit(20).all()
    proxy_list = map(lambda item: item.asdict(), obj_proxy_list)
    return jsonify({'proxies': proxy_list})

@app.route('/api/proxy/<int:proxy_id>', methods=['GET'])
def get_proxy(proxy_id):
    proxy = Proxy.query.filter_by(id=proxy_id).first()

    return jsonify({'proxy': proxy.asdict(), 'tags': map(lambda item: item.asdict(), proxy.tags)})

@app.route('/api/proxy/<int:proxy_id>', methods=['DELETE'])
def delete_proxy(proxy_id):
    proxy = Proxy.query.get(proxy_id)

    if proxy is None:
        abort(404)

    db.session.delete(proxy)
    db.session.commit()

    return jsonify({'result': True}), 200

@app.route('/api/proxy', methods=['POST'])
def create_proxy():
    if not request.json:
        abort(400)

    try:
        proxy = Proxy(remote_addr=request.json['remote_addr'], remote_port=request.json['remote_port'], local_addr=request.json['local_addr'], local_port=request.json['local_port'])
        db.session.add(proxy)

        db.session.commit()
    except ValueError, e:
        return jsonify({'errors': [e.message]}), 400

    return jsonify({'result': proxy.asdict()}), 200

@app.route('/api/proxy/<int:proxy_id>', methods=['PUT'])
def put_proxy(proxy_id):
    if not request.json:
        abort(400)

    proxy = db.session.query(Proxy).get(proxy_id)
    if proxy is None:
        abort(404)

    try:
        proxy.remote_addr = request.json['remote_addr']
        proxy.remote_port = request.json['remote_port']
        proxy.local_addr = request.json['local_addr']
        proxy.local_port = request.json['local_port']

        #delete all tags
        proxy.tags = []

        if 'tags' in request.json:
            tags = request.json['tags']
            for item in tags:
                tag_id = item['id']
                tag = Tag.query.get(item['id'])
                proxy.tags.append(tag)

        db.session.commit()
    except ValueError, e:
        return jsonify({'errors': [e.message]}), 400

    return jsonify({'proxy': proxy.asdict()})