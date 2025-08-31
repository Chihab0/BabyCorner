# BabyCorner API Endpoints

## Auth (Admin)
- `POST /api/admin/login`
  - Login as admin.
  - Body: `{ "username": string, "password": string }`
  - Response: `{ "token": string }`

- `GET /api/admin/me`
  - Get current admin details.
  - Header: `Authorization: Bearer <token>`

---

## Products
### Public
- `GET /api/products`
  - List all products. Supports query params for filtering.

- `GET /api/products/:id`
  - Get product by ID.

### Admin (requires `Authorization: Bearer <token>`)
- `POST /api/admin/products`
  - Create a product.
  - Use `form-data` for file upload (`images` field, up to 5 files)
  - Or use raw JSON with `images` as an array of filenames.

- `GET /api/admin/products`
  - List all products (admin view).

- `GET /api/admin/products/low-stock`
  - List products with low stock.

- `GET /api/admin/products/:id`
  - Get product by ID (admin view).

- `PUT /api/admin/products/:id`
  - Update a product.
  - Use `form-data` for file upload (`images` field)
  - Or use raw JSON with `images` as an array of filenames.

- `DELETE /api/admin/products/:id`
  - Delete a product.

---

## Orders
### Public
- `POST /api/orders`
  - Create an order.
  - Body:
    ```json
    {
      "client_name": string,
      "phone": string,
      "address": string,
      "wilaya_id": number,
      "delivery_company_id": number,
      "delivery_method": "home" | "stopdesk",
      "items": [{ "product_id": number, "quantity": number, "price": number }],
      "total_price": number
    }
    ```

### Admin (requires `Authorization: Bearer <token>`)
- `GET /api/admin/orders`
  - List all orders. Supports query params for filtering.

- `GET /api/admin/orders/:id`
  - Get order by ID.

- `PATCH /api/admin/orders/:id/status`
  - Update order status.
  - Body: `{ "status": "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" }`

---

## Delivery Companies
### Public
- `GET /api/delivery-companies`
  - List all delivery companies.

- `GET /api/delivery-companies/:id/prices`
  - Get all wilaya prices for a delivery company.

### Admin (requires `Authorization: Bearer <token>`)
- `POST /api/admin/delivery-companies`
  - Create a delivery company.
  - Body:
    ```json
    {
      "name": string,
      "prices": [
        { "wilaya_id": number, "home_price": number, "stopdesk_price": number },
        ...
      ]
    }
    ```

- `GET /api/admin/delivery-companies`
  - List all delivery companies.

- `PUT /api/admin/delivery-companies/:id`
  - Update a delivery company (name or prices).

- `DELETE /api/admin/delivery-companies/:id`
  - Delete a delivery company.

- `PUT /api/admin/delivery-companies/:id/prices`
  - Update wilaya prices for a delivery company.
  - Body:
    ```json
    [
      { "wilaya_id": number, "home_price": number, "stopdesk_price": number },
      ...
    ]
    ```

---

## Order Statuses
- `pending`
- `confirmed`
- `shipped`
- `delivered`
- `cancelled`
