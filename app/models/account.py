import re
from sqlite3 import IntegrityError
from app.models.schema import create_database
from flask_login import UserMixin
database = "./app/banco.db"

class Account:
  def __init__(self, conn):
    self.email = ""
    self.password = ""
    self.balance = ""
    self.conn = conn
    self.cursor = self.conn.cursor()
    
  def create_account(self, email, password, balance):
    try:
      if self.is_email_valid(email) and self.is_password_valid(password):
        self.cursor.execute("INSERT INTO account (email, password, balance) VALUES (?, ?, ?);", (email, password, balance))
        self.conn.commit()
        return {"message": "Conta criada com sucesso!",
                "validation": True}
      return {"message": "Dados incorretos!",
                "validation": False}
    except IntegrityError:
      self.cursor.execute("SELECT * FROM account WHERE email == ?;",(email,)) 
      if(self.cursor.fetchone()):
        return {"message": "Email já cadastrado",
                "validation": False}
      
          
  def is_email_valid(self, email):
    regex = r'^[A-Za-z0-9._+-]+@(gmail|hotmail|outlook)+\.[a-zA-Z]{2,}$'
    return re.match(regex, email)
  def is_password_valid(self, password):
    return len(password) >= 8 and password.isalnum()
    
  def login(self, email, password):
    self.cursor.execute("SELECT * FROM account WHERE email == ? and password == ?;",(email, password)) 
    if(self.cursor.fetchone()):
      return {"message": "Login realizado com sucesso!",
            "validation": True}
    return {"message": "Login não realizado!",
            "validation": False}
  def lastRowId(self):
    return self.cursor.lastrowid
  def get_account_by_email(self, email):
    self.cursor.execute("SELECT a.idAccount, a.email, u.fullname FROM account a INNER JOIN users u ON a.idAccount = u.idAccount WHERE a.email = ?;", (email,))
    return self.cursor.fetchone()
  

class Object_account(UserMixin):
  def __init__(self, idAccount, email, fullname):
    self.id = idAccount
    self.email = email
    self.fullname = fullname

  @staticmethod
  def get_account_by_id(idAccount):
    cursor = create_database(database).execute("SELECT a.idAccount, a.email, u.fullname FROM account a INNER JOIN users u ON a.idAccount = u.idAccount WHERE a.idAccount = ?;", (idAccount, ))
    result = cursor.fetchone()
    if result:
      return Object_account(result[0], result[1], result[2])
    else:
      return None
  def get_id(self):
      return str(self.id)
  
  

  