from app import app
from flask import Flask, render_template, request
from app.models.schema import create_database
from app.models.account import Account
from app.models.users import Users
from app.greetings import showGreetings


database = "./app/banco.db"

@app.route('/', methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route('/result', methods=["POST"])
def result():
    connection = create_database(database)
    account = Account(connection)
    users = Users(connection)
    account.create_account(request.form["email"], request.form["password"], 0)
    users.create_user(request.form["first-name"], request.form["last-name"], "2003-02-01")

    return render_template("index.html")

@app.route('/dashboard', methods=["POST"])
def login():
    connection = create_database(database)
    account = Account(connection)

    if request.method == "POST":
        answer, validation = account.login(request.form["email"], request.form["password"]).values()
        if(validation):
            return render_template("dashboard.html", answer=answer, greetings=showGreetings())
    return render_template("index.html", answer=answer)

