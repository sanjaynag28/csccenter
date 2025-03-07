document.addEventListener('DOMContentLoaded', function() {
    const itemsContainer = document.getElementById('itemsContainer');
    const addItemBtn = document.getElementById('addItem');
    const billForm = document.getElementById('billForm');
    const totalAmountSpan = document.getElementById('totalAmount');
    const recentBillsDiv = document.getElementById('recentBills');

    function createItemRow() {
        const row = document.createElement('div');
        row.className = 'item-row mb-3';
        row.innerHTML = `
            <div class="row">
                <div class="col-md-5">
                    <input type="text" class="form-control item-name" placeholder="Item Name" required>
                </div>
                <div class="col-md-3">
                    <input type="number" class="form-control item-quantity" placeholder="Quantity" min="1" required>
                </div>
                <div class="col-md-3">
                    <input type="number" class="form-control item-price" placeholder="Price" step="0.01" min="0" required>
                </div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-danger remove-item">&times;</button>
                </div>
            </div>
        `;
        return row;
    }

    function updateTotal() {
        let total = 0;
        const rows = itemsContainer.getElementsByClassName('item-row');
        
        for (const row of rows) {
            const quantity = parseFloat(row.querySelector('.item-quantity').value) || 0;
            const price = parseFloat(row.querySelector('.item-price').value) || 0;
            total += quantity * price;
        }
        
        totalAmountSpan.textContent = total.toFixed(2);
    }

    function loadRecentBills() {
        fetch('/api/bills')
            .then(response => response.json())
            .then(bills => {
                recentBillsDiv.innerHTML = bills.map(bill => `
                    <div class="bill-item">
                        <strong>${bill.customerName}</strong><br>
                        Date: ${new Date(bill.date).toLocaleDateString()}<br>
                        Amount: ₹${bill.totalAmount.toFixed(2)}
                    </div>
                `).join('');
            })
            .catch(error => console.error('Error loading bills:', error));
    }

    addItemBtn.addEventListener('click', () => {
        itemsContainer.appendChild(createItemRow());
    });

    itemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            e.target.closest('.item-row').remove();
            updateTotal();
        }
    });

    itemsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('item-quantity') || e.target.classList.contains('item-price')) {
            updateTotal();
        }
    });

    billForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const items = [];
        const rows = itemsContainer.getElementsByClassName('item-row');
        
        for (const row of rows) {
            items.push({
                name: row.querySelector('.item-name').value,
                quantity: parseInt(row.querySelector('.item-quantity').value),
                price: parseFloat(row.querySelector('.item-price').value),
                amount: parseInt(row.querySelector('.item-quantity').value) * parseFloat(row.querySelector('.item-price').value)
            });
        }

        const billData = {
            customerName: document.getElementById('customerName').value,
            items: items,
            totalAmount: parseFloat(totalAmountSpan.textContent)
        };

        fetch('/api/create-bill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(billData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Bill created successfully!');
            billForm.reset();
            itemsContainer.innerHTML = '';
            itemsContainer.appendChild(createItemRow());
            updateTotal();
            loadRecentBills();
        })
        .catch(error => {
            console.error('Error creating bill:', error);
            alert('Error creating bill. Please try again.');
        });
    });

    // Initialize with one item row
    itemsContainer.appendChild(createItemRow());
    loadRecentBills();
});
