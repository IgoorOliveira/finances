import re
import datetime

class Users:
  def __init__(self, conn):
    self.fullname = ""
    self.date_birthday = ""
    self.conn = conn
    self.cursor = self.conn.cursor()

  def create_user(self, first_name, last_name, data_nasc, idAccount):
    self.cursor.execute("INSERT INTO users (fullname, date_birthday, idAccount) VALUES (?, ?, ?);", (first_name + " " + last_name, data_nasc, idAccount))
    self.conn.commit()
  def is_valid_name(self, name):
    return name.isdigit() and len(name) > 3
  def get_name(self, idAccount):
    self.cursor.execute("SELECT u.fullname FROM users u INNER JOIN account a ON u.idAccount = a.idAccount WHERE a.idAccount = ?;", (idAccount, ))
    return self.cursor.fetchone()[0]
  
  def consult_user(self):
      self.cursor.execute("SELECT * FROM users;")
      return self.cursor.fetchall()

  def update_user(self, fullname, idUser):
      self.cursor.execute("UPDATE users SET fullname = ? WHERE idUser = ?", (fullname, idUser))
      self.conn.commit()
      return{"message": "Dados de usuário atualizados!",
              "validation": True}
       
  def delete_user(self, idUser):
     self.cursor.execute("DELETE * FROM users WHERE idUser = ?;", (idUser, ))
     return{"message": "Usuário deletado com sucesso!",
              "validation": True}
  
    