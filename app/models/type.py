import re

class Type:
    def __init__(self, conn):
        self.name = ""
        self.conn = conn
        self.cursor = self.conn.cursor()

    def create_type(self, name):
        try:
            self.cursor.execute("INSERT INTO type (name) VALUES = ?;", (name, ))
            self.conn.commit()
        except:
            return {"message": "Tipo já cadastrado!",
                    "validation": True}
        else:
            return {"message": "Tipo inserido com sucesso!",
                    "validation": True}
    
    
    def consult_type(self):
        self.cursor.execute("SELECT * FROM type;")
        return self.cursor.fetchall()
    
    def update_type(self, name, idType): 
        try:
            self.cursor.execute("UPDATE type SET name = ? WHERE idType = ?;", (name, idType))
            self.conn.commit()
            return{"message": "Tipo Atualizado!",
                   "validation": True}
        except:
            return{"message": "Erro ao atualizar!",
                   "validation": False}
        
    def delete_type(self, idType):
        self.cursor.execute("DELETE * FROM Type WHERE idType = ?;", (idType, ))
        self.conn.commit()
        return{"message": "Tipo deletado!",
               "validation": True}