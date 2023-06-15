import re

class Type:
    def __init__(self, conn):
        self.name = ""
        self.conn = conn
        self.cursor = self.conn.cursor()

    """def inicialType(self):
        starters = [("Mercado"),
                    ("Alimentação"),
                    ("Saúde"),
                    ("Compras"),
                    ("Gerais")]
        self.cursor.execute("INSERT INTO type (name) VALUES = (?);", (starters, ))
        self.conn.commit()"""

    def create_type(self, type):
        self.cursor.execute("INSERT INTO type (name) VALUES (?);", (type,))
        self.conn.commit()

    def show_type(self):
        self.cursor.execute("SELECT * FROM type;")
        return self.cursor.fetchall()