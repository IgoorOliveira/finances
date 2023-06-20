import re
from sqlite3 import IntegrityError
class Category:
    def __init__(self, conn):
        self.name = ""
        self.idType = ""
        self.conn = conn
        self.cursor = self.conn.cursor()
    def add_category(self, name):
        try:
            self.cursor.execute("INSERT INTO category (name) VALUES (?);", (name,))
            self.conn.commit()
            return {"message": "Categoria cadastrada com sucesso!",
                    "validation": True}
        except IntegrityError:
            return {"message": "Categoria já cadastrada!",
                    "validation": False}
        
    def get_categories(self, id_type):
        self.cursor.execute("SELECT * FROM category WHERE idType = ?;", (id_type, ))
        return self.cursor.fetchall()