from app import app
from flask import Flask, render_template, request, flash, redirect, jsonify, url_for
from flask_login import LoginManager, login_required, logout_user, login_user, current_user
from app.models.schema import create_database
from app.models.account import Account, Object_account
from app.models.users import Users
from app.models.transaction import Transaction
from app.models.category import Category
from app.greetings import showGreetings

database = "./app/banco.db"

lm = LoginManager()
lm.init_app(app)

@lm.user_loader
def load_user(idAccount):
    return Object_account.get_account_by_id(idAccount)

@lm.unauthorized_handler
def unauthorized():
    flash({"answer": "Necessário realizar login",
                   "validation": False})
    return redirect("/")

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
            tuplaAccount = account.get_account_by_email(email)
            login_user(Object_account(tuplaAccount[0], tuplaAccount[1], tuplaAccount[2]))
            flash({"answer": answerAccount["message"],
                    "validation": True})
            return redirect(url_for("dashboard"))
        flash({"answer": answerAccount["message"],
                "validation": False})
    return redirect("/")

@app.route("/dashboard")
@login_required
def dashboard():
    if current_user.is_authenticated:
        return render_template("dashboard.html", greetings=showGreetings(), current_user=current_user.fullname)
    return redirect("/")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect("/")

@app.route("/transactions")
@login_required
def get_transactions():
    connection = create_database(database)
    transaction = Transaction(connection)
   
    return jsonify(transaction.getTransactions())

@app.route("/transactions/add", methods=["POST"], endpoint="add_transaction")
@login_required
def create_transaction():
    connection = create_database(database)
    transaction = Transaction(connection)

    if request.method == "POST":
        answerTransaction = transaction.create_transaction(request.form["value"], request.form["dateTransaction"], current_user.id, request.form["idCategory"], request.form["idType"])
        flash({"answer": answerTransaction["message"],
                "validation": True})
        return redirect("/dashboard")
    
    flash({"answer": answerTransaction["message"],
                "validation": False})
    return redirect("/dashboard")
    

@app.route("/transaction/delete")
def delete_transaction():
    connection = create_database(database)
    transaction = Transaction(connection)

@app.route("/categories/<idType>")
def get_categories(idType):
    connection = create_database(database)
    categories = Category(connection)
    return jsonify(categories.get_categories(idType))



