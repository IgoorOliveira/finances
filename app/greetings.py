from datetime import datetime, time

def showGreetings():
    currentTime = datetime.now().time()
    if(time(12) < currentTime < time(18)):
        return {"message": "Boa tarde", 
                "icon": "🌅"}
    elif(time(18) < currentTime or currentTime < time(6)):
        return {"message": "Boa noite", 
                "icon": "🌙"}
    else:
       return {"message": "Bom dia", 
               "icon": "☀️"}