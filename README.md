# HR Management Backend

A simple Node.js RESTful API for HR management, built with Express, TypeScript, Knex, and PostgreSQL.

## Prerequisites
- Node.js (v18+)
- PostgreSQL database

## Installation

1. Clone the repository and navigate to the folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your database credentials and configuration:
   ```bash
   cp .env.example .env
   ```

## Database Setup

Run database migrations to create the tables, and seed the initial HR user:

```bash
# Run migrations
npm run knex migrate:latest

# Seed initial HR user (hr@gmail.com / 12345678)
npm run knex seed:run
```

## Running the Application

- **Development mode** (runs with nodemon and ts-node):
  ```bash
  npm run dev
  ```
- **Production mode**:
  ```bash
  npm run build
  npm start
  ```

## API Documentation

Once the application is running, you can test and view the interactive API documentation at:
- `http://localhost:3000/api-docs`

Use the **Authorize** button on the top right to authenticate using the JWT token returned from the login endpoint.

## Code Quality

- Format the code:
  ```bash
  npm run format
  ```
- Lint the code:
  ```bash
  npm run lint
  ```
