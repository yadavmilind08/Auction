# Online Bidding System

This is a full-stack web application that allows users to participate in an online bidding system. The application includes features like user authentication, auction item management, and bidding functionality, offering a smooth and engaging user experience.

## Features

- **User Registration & Authentication**: Sign up, log in, and manage your account.
- **Auction Management**: Create, view, update, and delete auction items.
- **Bidding**: Place bids on auction items.
- **User Interface**: Browse auction items, view detailed information, and manage your auction activities.

## Technology Stack

### Frontend

- **React**: Frontend framework
- **React Router**: Navigation and routing
- **React Hook Form & Yup**: Form handling and validation
- **Axios**: HTTP requests to the backend API
- **CSS/Styled Components**: Styling the user interface

### Backend

- **.NET Core**: Backend framework for building RESTful APIs
- **Entity Framework Core**: ORM for database interactions
- **SQL Server / PostgreSQL**: Database options (configure based on requirements)
- **JWT**: JSON Web Tokens for secure user authentication
- **SignalR (Optional)**: Real-time updates for bidding notifications

## Getting Started

### Prerequisites

- **Frontend**: Node.js (v12 or higher), npm or yarn
- **Backend**: .NET SDK (v6.0 or higher), SQL Server or PostgreSQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yadavmilind08/Auction.git
   cd Auction

# Online Bidding System - Setup Instructions

## Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

3. Create a `.env` file in the frontend directory and add the following environment variables:
    ```env
    VITE_API_BASE_URL=http://localhost:5000/api
    ```
    Replace `http://localhost:5000/api` with the backend API URL.

4. Start the frontend development server:
    ```bash
    npm start
    ```
    or
    ```bash
    yarn start
    ```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd API
    ```

2. Restore dependencies:
    ```bash
    dotnet restore
    ```

3. Configure the database connection string in `appsettings.json`:
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Data source=auction.db"
    }
    ```
    Replace with your actual database connection details.

4. Apply database migrations:
    ```bash
    dotnet ef database update
    ```

5. Run the backend server:
    ```bash
    dotnet run
    ```

The backend will be available at [http://localhost:5000](http://localhost:5000).

