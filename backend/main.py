from fastapi import FastAPI
from pydantic import BaseModel
from backend.firebase_config import db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Expense(BaseModel):
    user_id: str
    title: str
    amount: float
    category: str
    date: str


@app.get("/")
def home():
    return {"message": "Expense Tracker API Running"}

@app.post("/expenses")
def add_expense(expense: Expense):

    doc = db.collection("expenses").document()

    doc.set(expense.dict())

    return {"message": "Expense Added"}
@app.get("/expenses/{user_id}")
def get_expenses(user_id: str):

    docs = (
        db.collection("expenses")
        .where("user_id", "==", user_id)
        .stream()
    )

    expenses = []

    for doc in docs:
        item = doc.to_dict()
        item["id"] = doc.id
        expenses.append(item)

    return expenses
@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str):

    db.collection("expenses").document(expense_id).delete()

    return {"message": "Deleted"}
@app.get("/all")
def get_all():
    docs = db.collection("expenses").stream()

    result = []

    for doc in docs:
        item = doc.to_dict()
        item["id"] = doc.id
        result.append(item)

    return result