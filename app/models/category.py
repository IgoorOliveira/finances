import re

class Category:
    def __init__(self, conn):
        self.name = ""
        self.conn = conn
        self.cursor = self.conn.cursor()

    def create_category(self, category):
        self.cursor.execute("INSERT INTO type (name) VALUES (?);", (category,))
        self.conn.commit()

    def show_category(self):
        self.cursor.execute("SELECT * FROM type;")
        return self.cursor.fetchall()