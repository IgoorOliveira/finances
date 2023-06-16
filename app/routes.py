from app import app
from flask import Flask, render_template, request, flash, redirect, jsonify, url_for
from app.models.schema import create_database
from app.models.account import Account
from app.models.users import Users
from app.models.transaction import Transaction
from app.greetings import showGreetings
from datetime import date


database = "./app/banco.db"

@app.route('/', methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route('/register', methods=["POST"])
def register():
    connection = create_database(database)
    account = Account(connection)
    users = Users(connection)

    if request.method == "POST":
        answerAccount = account.create_account(request.form["email"], request.form["password"], 0)
        if answerAccount["validation"]:
            users.create_user(request.form["first-name"], request.form["last-name"], request.form["date-birthday"], account.lastRowId())
            flash({"answer": answerAccount["message"],
                   "validation": True})
        else:
            flash({"answer": answerAccount["message"],
                   "validation": False})
    return redirect("/")

@app.route('/login', methods=["POST"])
def login():
    connection = create_database(database)
    account = Account(connection)
    users = Users(connection)

    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        answerAccount = account.login(email, password)

        if answerAccount["validation"]:
            idAccount = account.get_id_account(email)
            name = users.get_name(idAccount).split()[0]
            flash({"answer": answerAccount["message"],
                    "validation": True})
            return redirect(url_for("dashboard", name=name))
        flash({"answer": answerAccount["message"],
                "validation": False})
    return redirect("/")

@app.route("/dashboard/<name>")
def dashboard(name):
    return render_template("dashboard.html", greetings=showGreetings(), name=name)

@app.route("/transactions")
def get_transactions():
    connection = create_database(database)
    transaction = Transaction(connection)
    return jsonify(transaction.getTransactions())