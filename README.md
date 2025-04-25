
# Auth Profile Flow

A full-stack user authentication and profile management application built with React, TypeScript, and Express.

## Features

- User authentication (signup, login, logout)
- Form validation with Formik and Yup
- Session management with express-session
- Automatic parsing of user data (name, email domain)
- Protected routes
- Profile display

## Project Structure

- Frontend: React + TypeScript application with form handling and routing
- Backend: Express server with in-memory user storage

## Running the Project

### Frontend

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

The frontend will be available at `http://localhost:8080`.

### Backend

1. Navigate to the server directory:
```
cd src/server
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm run dev
```

The API server will run at `http://localhost:3001`.

## API Endpoints

- `POST /signup` - Create a new user
- `POST /login` - Authenticate user
- `POST /logout` - End user session
- `GET /me` - Get logged-in user profile

## Technologies Used

- React
- TypeScript
- Express
- Formik + Yup
- Axios
- Tailwind CSS
- shadcn/ui

## User Data Structure

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  firstName: string;
  lastName: string;
  emailDomain: string;
  password: string; // In a real app, this would be hashed
}
```

## Validation Rules

- Email must be valid format
- Phone must match common patterns
- Age must be a number ≥ 13
- All fields are required

