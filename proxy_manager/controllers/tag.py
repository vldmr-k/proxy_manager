# -*- coding: utf-8 -*-
from flask import abort

from proxy_manager import app, db
from flask import jsonify
from flask import request
from ..models.tag import Tag

@app.route('/api/tag/<int:tag_id>', methods=['GET'])
def get_tag(tag_id):
    tag = Tag.query.get(tag_id)

    if tag is None:
        abort(400)

    return jsonify({'tag': tag.asdict()})

@app.route('/api/tags', methods=['GET'])
def get_tags():
    tags = Tag.query.limit(20).all()
    tags_list = map(lambda x: x.asdict(), tags)
    return jsonify({'tags': tags_list})

@app.route('/api/tag/suggest/<string:query>', methods=['GET'])
def get_suggest_tags(query):
    if len(query) <= 2:
        abort(400)

    tags = Tag.query.filter(Tag.name.ilike(query + "%")).limit(10).all()
    tags_list = map(lambda x: x.asdict(), tags)
    return jsonify({'tags': tags_list})

@app.route('/api/tag', methods=['POST'])
def create_tag():
    if not request.json:
        abort(400)

    try:
        tag = Tag(name=request.json['name'])
        db.session.add(tag)

        db.session.commit()
    except ValueError, e:
        return jsonify({'errors': [e.message]}), 400

    return jsonify({'result': tag.asdict()}), 200

@app.route('/api/tag/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    tag = Tag.query.get(tag_id)

    if tag is None:
        abort(404)

    db.session.delete(tag)
    db.session.commit()

    return jsonify({'result': True}), 200

@app.route('/api/tag/<int:tag_id>', methods=['PUT'])
def put_tag(tag_id):
    if not request.json:
        abort(400)

    tag = Tag.query.get(tag_id)
    if tag is None:
        abort(404)

    try:
        tag.name = request.json['name']

        db.session.commit()
    except ValueError, e:
        return jsonify({'errors': [e.message]}), 400

    return jsonify({'proxy': tag.asdict()})