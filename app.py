from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///billing.db'
db = SQLAlchemy(app)

class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    items = db.Column(db.JSON, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/create-bill', methods=['POST'])
def create_bill():
    data = request.json
    new_bill = Bill(
        customer_name=data['customerName'],
        items=data['items'],
        total_amount=data['totalAmount']
    )
    db.session.add(new_bill)
    db.session.commit()
    return jsonify({'message': 'Bill created successfully', 'id': new_bill.id})

@app.route('/api/bills', methods=['GET'])
def get_bills():
    bills = Bill.query.order_by(Bill.date.desc()).all()
    return jsonify([{
        'id': bill.id,
        'customerName': bill.customer_name,
        'date': bill.date.strftime('%Y-%m-%d %H:%M:%S'),
        'items': bill.items,
        'totalAmount': bill.total_amount
    } for bill in bills])

if __name__ == '__main__':
    app.run(debug=True)
