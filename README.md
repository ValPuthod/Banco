# Banco

This is the README for the Banco, which consists of a backend developed with Python FastAPI, a frontend using React.js, and a PostgreSQL database. This document outlines the steps required to set up and run the different components of the project

## Database Setup (PostgreSQL)

### Install PostgreSQL

First, ensure that PostgreSQL is installed on your system. If it's not installed, you can download it from [PostgreSQL Official Site](https://www.postgresql.org/download/)

### Create Database

Once PostgreSQL is installed, follow these steps to create a new database:

1. Open the PostgreSQL command line client:

```
 psql -U postgres
```

2. Create a new database named 'banco':

```sql
 CREATE DATABASE banco;
```

3. Exit the PostgreSQL client:

```
 \q
```

## Backend Setup (FastAPI)

The backend is built with Python FastAPI, providing robust API endpoints for application functionalities

### Environment Setup

1. **Create a Virtual Environment:**

```
 python -m venv venv
```

2. **Activate the Virtual Environment:**

```
 source venv/bin/activate
```

3. **Install Required Packages:**

```
 pip install -r requirements.txt
```

### Running the Backend Server

To run the backend server locally, use the following command:

```
uvicorn main:app --reload
```

This command will start the server with auto-reload enabled, making development easier

### Available Endpoints

- Documentation of all available endpoints can be accessed at `/docs` or `/redoc` once the server is running

## Frontend Setup (React.js)

The frontend interface is built using React.js, offering a responsive and dynamic user experience

### Install Dependencies

1. **Navigate to the frontend directory and install dependencies:**

```
 yarn install
```

### Running the Frontend Project

1. **Start the Development Server:**

```
 yarn dev
```

This command runs the app in development mode, and you can view it in the browser at `http://localhost:3000`

## General Instructions

- Ensure that the PostgreSQL database is properly configured and running before starting the backend server
- Ensure that the backend server is running and properly configured before starting the frontend application
- Adjust environment variables or configuration files as needed for different deployment environments
