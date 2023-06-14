import re
class Account:
  def __init__(self, conn):
    self.email = ""
    self.password = ""
    self.balance = ""
    self.conn = conn
    self.cursor = self.conn.cursor()
    
  def create_account(self, email, password, balance):
    if self.is_email_valid(email) and self.is_password_valid(password):
      self.cursor.execute("INSERT INTO account (email, password, balance) VALUES (?, ?, ?);", (email, password, balance))
      self.conn.commit()
      return {"answer": "Conta criada com sucesso!",
              "validation": True}
    return {"answer": "Dados incorretos!",
              "validation": False}
        
  def is_email_valid(self, email):
    regex = r'^[A-Za-z0-9._+-]+@(gmail|hotmail|outlook)+\.[a-zA-Z]{2,}$'
    return re.match(regex, email)
  def is_password_valid(self, password):
    return len(password) >= 8 and password.isalnum()
    
  def login(self, email, password):
     self.cursor.execute("SELECT * FROM account WHERE email == ? and password == ?;",(email, password)) 
     if(self.cursor.fetchone()):
       return {"answer": "Login realizado com sucesso!",
              "validation": True}
     return {"answer": "Login não realizado!",
             "validation": False}
  
