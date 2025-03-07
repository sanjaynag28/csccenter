# CSC Center - Sanjay Computer Center

A comprehensive business management system for Sanjay Computer Center with billing, banking, and customer management features.

## Features

1. **Billing System**
   - Create and manage bills
   - Search and filter bills
   - Print bills

2. **Mini Banking**
   - Track savings and current accounts
   - Record deposits and withdrawals
   - View transaction history

3. **Customer Management**
   - Add and edit customer details
   - Search customers
   - View customer history

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/csccenter.git
cd csccenter
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

## Project Structure

```
csccenter/
├── README.md           # Project documentation
├── app.py             # Flask application
├── billing.html       # Main application file
├── requirements.txt   # Python dependencies
├── static/           # Static assets (CSS, JS, images)
└── templates/        # HTML templates
```

## Usage

1. Open your web browser and navigate to `http://localhost:5000`
2. Use the navigation menu to switch between:
   - Billing
   - Banking
   - Customers

## Development

- The project uses Bootstrap 5 for styling
- Font Awesome for icons
- Local storage for data persistence

## License

This project is licensed under the MIT License.
