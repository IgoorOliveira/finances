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

    def create_transaction(self, description, value, date, idAccount, idCategory, idType):
        self.cursor.execute("INSERT INTO 'transaction' (description, value, data, idAccount, idCategory, idType) VALUES (?, ?, ?, ?, ?, ?);", (description, value, date, idAccount, idCategory, idType))
        self.conn.commit()
        return {"message": "Transação cadastrada com sucesso!",
                "validation": True}
    
    def getTransactions(self, idAccount):
        self.cursor.execute("SELECT t.idTransaction, t.description, t.value, t.idType, t.data, c.idCategory, c.name from 'transaction' t inner join category c on t.idCategory = c.idCategory WHERE t.idAccount = ?;", (idAccount, ))
        return self.cursor.fetchall()
    
    def update_transaction(self, description, value, data, idAccount, idCategory, idType, idTransaction):
        try:
            self.cursor.execute("UPDATE 'transaction' SET description = ?, value = ?, data = ?, idAccount = ?, idCategory = ?, idType = ? WHERE idTransaction = ?;", (description, value, data, idAccount, idCategory, idType, idTransaction))
            self.conn.commit()
        except:
            return {"message": "Informações de transação inválida!",
                    "validation": False}
        else:
            return {"message": "Transação Atualizada!",
                    "validation": True}
    
    def delete_transaction(self, idTransaction):
        self.cursor.execute("DELETE FROM 'transaction' WHERE idTransaction = ?;", (idTransaction, ))
        self.conn.commit()
        return {"message": "Transação deletada com sucesso!",
                "validation": True}
    
    def get_grafic1(self, idAccount):
        self.cursor.execute("SELECT c.name, t.value FROM 'transaction' t INNER JOIN category c ON t.idCategory = c.idCategory GROUP BY c.name HAVING t.idAccount = ? and t.idType = 2", (idAccount, ))
        return self.cursor.fetchall()