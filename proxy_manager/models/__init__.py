from sqlalchemy.ext.declarative import declarative_base

from proxy_manager import db

Base = declarative_base()
prx_x_tag_table = db.Table('prx_x_tag', db.metadata,
    db.Column('prx_id', db.Integer, db.ForeignKey('prx.id')),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'))
)