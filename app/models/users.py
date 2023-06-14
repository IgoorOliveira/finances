import re
import datetime

class Users:
  def __init__(self, conn):
    self.fullname = ""
    self.date_birthday = ""
    self.conn = conn
    self.cursor = self.conn.cursor()

  def create_user(self, first_name, last_name, data_nasc):
    self.cursor.execute("INSERT INTO users (fullname, date_birthday) VALUES (?, ?);", (first_name + " " + last_name, data_nasc))
    self.conn.commit()
  def is_valid_name(self, name):
    return name.isdigit() and len(name) > 3
  
    