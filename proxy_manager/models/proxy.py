import re
from proxy_manager import db
from sqlalchemy.orm import validates, class_mapper, relationship

from . import prx_x_tag_table

class Proxy(db.Model):
    __tablename__ = 'prx'

    id = db.Column(db.Integer, primary_key=True)
    remote_addr = db.Column(db.String(40), unique=True)
    remote_port = db.Column(db.String(5))
    local_addr = db.Column(db.String(40))
    local_port = db.Column(db.String(5))
    is_enabled  = db.Column(db.Integer, nullable=True)
    last_check = db.Column(db.DateTime(), nullable=True)

    tags = relationship("Tag", secondary=prx_x_tag_table, back_populates="proxies")

    def __init__(self, remote_addr, remote_port, local_addr, local_port):
        self.remote_addr = remote_addr
        self.remote_port = remote_port
        self.local_addr = local_addr
        self.local_port = local_port

    @validates('remote_addr', 'local_addr')
    def validate_addr(self, key, value):
        if self.is_ipv4(value) != True:
            raise ValueError("{0} {1} is not valid".format(key, value))
        else:
            return value

    @validates('remote_port', 'local_port')
    def validate_port(self, key, value):
        if value < 100:
            raise ValueError("{0} {1} is not valid".format(key, value))
        else:
            return value

    def asdict(self):
        return dict((col.name, getattr(self, col.name))
                    for col in class_mapper(self.__class__).mapped_table.c)

    def is_ipv4(self, ip):
        res = re.match("^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$", ip)
        return (res != None)

    def is_ipv6(self, ip):
        res = re.match("^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$", ip)
        return  (res != None)

    def __repr__(self):
        return '<Proxy %r>' % (self.id)


