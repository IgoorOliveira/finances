import re
from datetime import date

class Transaction:
    def __init__(self, conn):
        self.value = ""
        self.data = ""
        self.idAccount = ""
        self.idCategory = ""
        self.idType = ""
        self.conn = conn
        self.cursor = self.conn.cursor()

    def create_transaction(self, value, date, idAccount, idCategory, idType):
        self.cursor.execute("INSERT INTO 'transaction' (value, data, idAccount, idCategory, idType) VALUES (?, ?, ?, ?, ?);", (value, date, idAccount, idCategory, idType))
        self.conn.commit()
        return {"message": "Transação cadastrada com sucesso!",
                "validation": True}
    
    def getTransactions(self):
        self.cursor.execute("SELECT t.idTransaction, t.value, t.idType, t.data, c.idCategory, c.name from 'transaction' t inner join category c on t.idCategory = c.idCategory;")
        return self.cursor.fetchall()
    
    def delete_transaction(self, idTransaction):
        self.cursor.execute("DELETE FROM 'transaction' WHERE idTransaction = ?;", (idTransaction, ))
        self.conn.commit()
        return {"message": "Transação deletada com sucesso!",
                "validation": True}