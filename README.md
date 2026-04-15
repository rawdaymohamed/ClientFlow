# ClientFlow CRM

A full-stack CRM application built with the MERN stack to manage clients, leads, and workflows efficiently.

This project focuses on clean architecture, authentication, and scalable frontend/backend structure using modern tools.

## Tech Stack

### Frontend

- React
- React Router
- TanStack Query (React Query)
- React Hook Form
- Zod
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (authentication with HTTP-only cookies)

### Tools

- Axios
- Vercel (deployment)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/rawdaymohamed/ClientFlow.git
cd ClientFlow
```

### 2. Backend Setup

```bash
cd server
npm install
```

create a `.env` file in the `server` directory with the following content:

```PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

create a `.env` file in the `client` directory with the following content:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

start the frontend development server:

```bash
npm run dev
```

### 4. Access the Application

Open your browser and navigate to `http://localhost:5173` to access the ClientFlow CRM application.

## Features

- User registration and login with secure authentication
- JWT authentication using HTTP-only cookies
- Protected routes for authenticated users
- Guest-only routes (login/register redirection)
- Form validation using Zod and React Hook Form
- API state management with TanStack Query
- Clean and responsive UI with Tailwind CSS
- Dashboard layout with navigation

## Future Improvements

- Add role-based access control (admin vs user)
- Implement CRUD operations for clients and leads
- Add search and filtering for leads
- Improve UI with reusable components and better UX
- Add notifications (success/error toasts)
- Implement logout functionality and session handling
- Deploy full stack (frontend + backend) with proper domain setup
