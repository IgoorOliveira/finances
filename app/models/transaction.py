import re

class Transaction:
    def __init__(self, conn):
        self.data = ""
        self.value = ""
        self.conn = conn
        self.cursor = self.conn.cursor()

    def deposit(self, value, idAccount):
        balance = float(self.getBalance())
        balance += value 
        self.cursor.execute("INSERT INTO transaction (value) VALUES (?) WHERE idAccount (?);", (balance, idAccount ))
        self.conn.commit()

    def getBalance(self, idAccount):
        self.cursor.execute("SELECT value FROM transaction WHERE idAccount (?);", (idAccount))
        return self.cursor.fetchone()