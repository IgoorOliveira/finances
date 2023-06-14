import sqlite3
from sqlite3 import Error
def create_database(base):
  conn = sqlite3.connect(base)
  cursor = conn.cursor()

  try:
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS "account"("idAccount" INTEGER NOT NULL,
                                        "email" TEXT UNIQUE NOT NULL,
                                        "password" TEXT NOT NULL,
                                        "balance" REAL NOT NULL,
                                        PRIMARY KEY("idAccount" AUTOINCREMENT));
      """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS "users" ("idUser" INTEGER NOT NULL,
                                         "fullname" TEXT NOT NULL,
                                         "date_birthday" TEXT NOT NULL,
                                         PRIMARY KEY("idUser" AUTOINCREMENT));
    """)
   
    return conn
  except Error as e:
    print(e)
  conn.close()