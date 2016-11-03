from proxy_manager import db
from sqlalchemy.orm import validates, class_mapper, relationship
from . import prx_x_tag_table
import hashlib
from sqlalchemy import event

#
#prx_x_tag = db.Table('prx_x_tag', db.metadata,
#    db.Column('prx_id', db.Integer, db.ForeignKey('prx.id')),
#    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
#    extend_existing=True
#)

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    hash = db.Column(db.String(32), unique=True)

    proxies = relationship(
        "Proxy",
        secondary=prx_x_tag_table,
        back_populates="tags")

    def __init__(self, name):
        self.name = name

    @validates('name')
    def validate_name(self, key, value):
        if len(value.strip()) <= 0:
            raise ValueError("{0} can't be empty".format(key))

        return value

    def asdict(self):
        return dict((col.name, getattr(self, col.name))
                    for col in class_mapper(self.__class__).mapped_table.c)

    def __repr__(self):
        return '<Tag %r>' % (self.id)


def calc_hash(input):
    m = hashlib.md5()
    m.update(input)
    return m.hexdigest()

# standard decorator style
@event.listens_for(Tag, 'before_insert')
def receive_before_insert(mapper, connection, target):
    target.hash = calc_hash(target.name)

# standard decorator style
@event.listens_for(Tag, 'before_update')
def receive_before_update(mapper, connection, target):
    target.hash = calc_hash(target.name)