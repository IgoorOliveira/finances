import re
from sqlite3 import IntegrityError

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
  