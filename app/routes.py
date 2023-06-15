from app import app
from flask import Flask, render_template, request, flash, redirect, jsonify
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

    if request.method == "POST":
        answerAccount = account.login(request.form["email"], request.form["password"])
        if answerAccount["validation"]:
            flash({"answer": answerAccount["message"],
                    "validation": True})
            return redirect("/dashboard")
        flash({"answer": answerAccount["message"],
                "validation": False})
    return redirect("/")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html", greetings=showGreetings())

@app.route("/transactions")
def get_transactions():
    connection = create_database(database)
    transaction = Transaction(connection)
    return jsonify(transaction.getTransactions())