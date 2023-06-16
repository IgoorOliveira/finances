import re

class Transaction:
    def __init__(self, conn):
        self.value = ""
        self.type = ""
        self.data = ""
        self.conn = conn
        self.cursor = self.conn.cursor()

    """def deposit(self, value, idAccount):
        balance = float(self.getBalance())
        balance += value 
        self.cursor.execute("INSERT INTO transaction (value) VALUES (?) WHERE idAccount (?);", (balance, idAccount ))
        self.conn.commit()

    def getBalance(self, idAccount):
        self.cursor.execute("SELECT value FROM transaction WHERE idAccount (?);", (idAccount))
        return self.cursor.fetchone()"""
    def getTransactions(self):
        self.cursor.execute("SELECT t.idTransaction, t.value, t.type, t.data, c.name from 'transaction' t inner join category c on t.idCategory = c.idCategory;")
        return self.cursor.fetchall()