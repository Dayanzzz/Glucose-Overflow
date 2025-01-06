# Glucose Overflow

Glucose Overflow is a web application built with Flask for the backend and React for the frontend, designed to manage and analyze glucose data. This project allows users to track glucose levels and offers insights into health trends based on user data.

### Prerequisites

Before getting started, ensure you have the following installed:

- Python 3.x
- Node.js (for frontend)
- SQLite3 or Postgres for the database

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/glucose-overflow.git
    ```

2. Install backend dependencies:
    ```bash
    pipenv install -r requirements.txt
    ```

3. Set up environment variables:
    - Copy the `.env.example` file to `.env` and update it with your settings, including database URL and other configuration values.

4. Ensure the SQLite3 database connection URL is in the `.env` file.

### Database Setup

This application uses an SQLite or Postgres database. Set up the database schema by updating the `SCHEMA` variable in your `.env` file to a unique name (in snake_case).

Once configured, enter your pipenv environment, run the database migrations, and seed the data:

```bash
pipenv shell
flask db upgrade
flask seed all
flask run
