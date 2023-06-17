import sqlite3
from sqlite3 import Error
def create_database(base):
  conn = sqlite3.connect(base)
  cursor = conn.cursor()

  try:
    conn.execute('PRAGMA foreign_keys = ON')
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
                                         "idAccount" INTEGER NOT NULL,
                                         PRIMARY KEY("idUser" AUTOINCREMENT),
                                         FOREIGN KEY("idAccount") REFERENCES "account" ("idAccount"));
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS "category"("idCategory" INTEGER NOT NULL,
                                         "name" TEXT UNIQUE NOT NULL,
                                         "idType" INTEGER NOT NULL,
                                         PRIMARY KEY("idCategory" AUTOINCREMENT),
                                         FOREIGN KEY("idType") REFERENCES "type" ("idType"))
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS "type"("idType" INTEGER NOT NULL,
                                      "name" TEXT UNIQUE NOT NULL,
                                      PRIMARY KEY("idType" AUTOINCREMENT))
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS "transaction"("idTransaction" INTEGER NOT NULL,
                                              "value" REAL NOT NULL,
                                              "type" TEXT NOT NULL,
                                              "data" TEXT NOT NULL,
                                              "idAccount" INT NOT NULL,
                                              "idCategory" INT NOT NULL,
                                              "idType" INTEGER NOT NULL,
                                              PRIMARY KEY("idTransaction" AUTOINCREMENT),
                                              FOREIGN KEY("idAccount") REFERENCES "account"("idAccount"),
                                              FOREIGN KEY("idCategory") REFERENCES "category"("idCategory"),
                                              FOREIGN KEY("idType") REFERENCES "type" ("idType"))
    """)
   
    return conn
  except Error as e:
    print(e)
  conn.close()