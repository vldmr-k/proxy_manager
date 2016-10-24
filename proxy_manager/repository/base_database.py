from proxy_manager import db

class BaseDatabase():
    def get_last_id(self):
        cursor = db.cursor()
        cursor.execute("SELECT LASTVAL() as lastval")
        lastval = cursor.fetchone()['lastval']
        return lastval

    def get_connect(self):
        return db