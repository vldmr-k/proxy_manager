from base_database import BaseDatabase

class ProxyObject():
    _id = None
    _remote_addr = None
    _remote_port = None
    _local_addr = None
    _local_port = None
    _is_enabled = None
    _last_check = None

    def __init__(self, id=None, remote_addr=None, remote_port=None, local_addr=None, local_port=None, is_enabled=0, last_check=None):
        self._id = id
        self._remote_addr = remote_addr
        self._remote_port = remote_port
        self._local_addr = local_addr
        self._local_port = local_port
        self._is_enabled = is_enabled
        self._last_check = last_check

    def to_dict(self):
        return dict(id=self._id, remote_addr=self._remote_addr, remote_port=self._remote_port,
                    local_addr=self._local_addr, local_port=self._local_port, is_enabled=self._is_enabled,
                    last_check=self._last_check)


class Finder(BaseDatabase):
    def find_by_id(self, proxy_id):
        obj = None
        if proxy_id > 0:
            cur = self.get_connect().cursor()
            cur.execute("SELECT * FROM prx WHERE id = %s", [proxy_id])
            rec = cur.fetchone()
            obj = ProxyObject(id=rec[0], remote_addr=rec[1], remote_port=rec[2], local_addr=rec[3], local_port=rec[4], is_enabled=rec[5], last_check=rec[6])
            return obj

    def find_all(self, page = 0, limit = 20):
        cur = self.get_connect().cursor()
        cur.execute("SELECT * FROM prx OFFSET %s LIMIT %s", [page, limit])
        result = cur.fetchall()

        items = []

        for rec in result:
            obj = ProxyObject(id=rec[0], remote_addr=rec[1], remote_port=rec[2], local_addr=rec[3], local_port=rec[4], is_enabled=rec[5], last_check=rec[6])
            items.append(obj.to_dict())

        return items



class Repository(BaseDatabase):

    def create(self, cls):
        if isinstance(cls, ProxyObject):
            cur = self.get_connect()
            cur.execute("INSERT INTO prx (remote_addr, remote_port, local_addr, local_port, is_enabled, last_check) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
                        cls.remote_addr,
                        cls.remote_port,
                        cls.local_addr,
                        cls.local_port,
                        cls.is_enabled,
                        cls.last_check
                        )

            return True

        return False


    def update(self, cls):
        if isinstance(cls, ProxyObject):
            cur = self.get_connect()
            cur.execute("UPDATE prx SET remote_addr = %s, remote_port = %s, local_addr = %s, local_port = %s, is_enabled = %s, last_check = %s WHERE id = %d",
                        cls.remote_addr,
                        cls.remote_port,
                        cls.local_addr,
                        cls.local_port,
                        cls.is_enabled,
                        cls.last_check,
                        cls.id
                        )

            return True

        return False

    def delete(self, cls):
        if isinstance(cls, ProxyObject) and cls.get_id() > 0:
            cur = self.get_connect()
            cur.execute("DELETE * FROM prx WHERE id = %d", cls.id)
            return True

        return False