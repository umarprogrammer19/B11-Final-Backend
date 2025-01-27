export const generateOrderHistoryHTML = (user, orders) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #eee;
                padding-bottom: 10px;
                margin-bottom: 20px;
            }
            .header h1 {
                color: #ff6600;
            }
            .order-info {
                margin-bottom: 20px;
            }
            .order-info p {
                margin: 5px 0;
            }
            .table-container {
                margin-top: 20px;
                border-collapse: collapse;
                width: 100%;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            table th, table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            table th {
                background-color: #ff6600;
                color: white;
            }
            table tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Your Order History</h1>
                <p>Thank you for shopping with us, ${user.fullname}!</p>
            </div>
            <div class="order-info">
                <p><strong>Order Date:</strong> ${new Date().toDateString()}</p>
                <p><strong>Total Orders:</strong> ${orders.length}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders
            .map(
                (order) => `
                            ${order.products
                        .map(
                            (product) => `
                                <tr>
                                    <td>${product.name}</td>
                                    <td>${product.quantity}</td>
                                    <td>Rs. ${product.price}</td>
                                    <td>Rs. ${product.quantity * product.price}</td>
                                </tr>
                            `
                        )
                        .join("")}
                        `
            )
            .join("")}
                </tbody>
            </table>
            <div class="footer">
                <p>Thank you for being a valued customer. If you have any questions, feel free to contact us!</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
