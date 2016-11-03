# -*- coding: utf-8 -*-
from sqlalchemy import func

from flask import abort

from proxy_manager import app, db
from flask import jsonify
from flask import request

from proxy_manager.models.tag import Tag
from ..models.proxy import Proxy
from ..models.tag import calc_hash


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


@app.route('/api/proxy/get_random', methods=["GET"], defaults = {"limit":1})
@app.route('/api/proxy/get_random/<int:limit>', methods=["GET"])
def get_proxy_random(limit):

    if not request.headers.get('x-robot-limit') is None:
        limit = int(request.headers.get('x-robot-limit'))

    if limit <= 0:
        abort(400)

    query = Proxy.query.filter_by(is_enabled=1).order_by(func.random()).limit(limit)
    records = query.all()

    return jsonify({map(lambda x: (x.local_addr + ':' + x.local_port), records)})

@app.route('/api/proxy/get_by_tag', methods=['GET'], defaults={"tags_text": None, "limit": 1})
@app.route('/api/proxy/get_by_tag/<string:tags_text>/<int:limit>', methods=['GET'])
@app.route('/api/proxy/get_by_tag/<string:tags_text>', methods=['GET'], defaults={"limit" : 1})
def get_proxy_by_tag(tags_text, limit):

    if not request.headers.get('x-robot-limit') is None:
        limit = int(request.headers.get('x-robot-limit'))

    if tags_text is None:
        tags_text = request.headers.get('x-robot-tag')

    if tags_text is None or len(tags_text) <= 0:
        return "I get any tags", 400

    if limit <= 0:
        return "Limit must be positive int", 400

    tags = tags_text.split(',')

    query = Proxy.query.filter(Proxy.tags.any(Tag.hash.in_(map(lambda x: calc_hash(x), tags)))).filter_by(is_enabled=1).limit(limit)
    records = query.all()

    return jsonify({map(lambda x: (x.local_addr + ':' +x.local_port), records)})

