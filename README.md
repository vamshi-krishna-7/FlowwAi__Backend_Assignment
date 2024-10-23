<<<<<<< HEAD
# FlowwAi__Backend_Assignment
=======
# Personal Finance API

A RESTful API to manage personal financial records, including income, expenses, and balance summary.

## Endpoints

### Add a new transaction
- **POST /transactions**
- **Body**:
    ```json
    {
      "type": "income",
      "category": "Salary",
      "amount": 5000,
      "date": "2024-10-22",
      "description": "October Salary"
    }
    ```

### Get all transactions
- **GET /transactions**

### Get a transaction by ID
- **GET /transactions/:id**

### Update a transaction by ID
- **PUT /transactions/:id**
- **Body**:
    ```json
    {
      "type": "expense",
      "category": "Rent",
      "amount": 1500,
      "date": "2024-10-22",
      "description": "October rent"
    }
    ```

### Delete a transaction by ID
- **DELETE /transactions/:id**

### Get summary of income and expenses
- **GET /summary**

## Setup and Run

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the server: `npm start`.

## Testing

Test the API using Postman with the provided endpoints.


## API Testing Screenshots

### POST /transactions

![POST /transactions](./screenshots/postman_post_transaction.png)

### GET /transactions

![GET /transactions](./screenshots/postman_get_transactions.png)

### GET /transactions by id

![GET /transactions/:id](./screenshots/postman_get_transactions_by_id.png)

### PUT /transactions by id

![GET /transactions/:id](./screenshots/postman_update_transactions_by_id.png)

### DELETE /transactions by id

![GET /transactions/:id](./screenshots/postman_delete_transactions_by_id.png)

### GET /summary

![GET /summary](./screenshots/postman_get_summary.png)
>>>>>>> b78507c (commit)
