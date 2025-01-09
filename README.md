# Chatify - Real-time Chat Application

Chatify is a full-stack real-time chat application that allows users to send text messages and images, manage their accounts, and engage in dynamic conversations. The app is built with a powerful backend and an interactive frontend, providing a seamless chat experience.

## Features

### Frontend
- User authentication (login & signup).
- Real-time messaging with Socket.IO.
- Support for image sharing.
- Dynamic user and message management.
- Mobile-friendly responsive UI built with DaisyUI and Tailwind CSS.

### Backend
- RESTful API with Express.js.
- MongoDB for database management.
- Image uploads via Cloudinary.
- Authentication using JSON Web Tokens (JWT).
- Secure password handling with bcrypt.js.
- Middleware for validation using Express Validator.
- Real-time communication with Socket.IO.

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Express Validator**
- **Cloudinary**
- **Cookie-Parser**
- **Bcrypt.js**
- **JSON Web Token (JWT)**
- **Socket.IO**

### Frontend
- **React.js**
- **Zustand** for state management.
- **DaisyUI** and **Tailwind CSS** for styling.
- **Axios** for API requests.
- **React Router DOM** for navigation.
- **React Hot Toast** for notifications.
- **Socket.IO Client** for real-time communication.

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB instance running.

### Backend Setup
1. Clone the repository.
   ```bash
   git clone <repo_url>
   cd <repo_folder>/backend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend server.
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder.
   ```bash
   cd ../frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder and add the following variables:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the frontend development server.
   ```bash
   npm start
   ```

### Running the Application
- Open your browser and navigate to `http://localhost:3000`.

## Project Structure

### Backend
- **routes/**: Contains API route definitions.
- **controllers/**: Business logic for each route.
- **models/**: Mongoose schemas and models.
- **middlewares/**: Custom middleware (e.g., authentication, validation).

### Frontend
- **components/**: Reusable UI components (e.g., Sidebar, ChatHeader).
- **pages/**: Views for different routes (e.g., LoginPage, HomePage).
- **store/**: State management with Zustand.
- **lib/**: Utility functions (e.g., Axios instance, format helpers).

## Scripts

### Backend
- `npm start`: Start the server.
- `npm run dev`: Start the server with hot-reloading using Nodemon.

### Frontend
- `npm start`: Start the React development server.

## License
This project is licensed under the [MIT License](LICENSE).

---

Happy Chatting with ChitChat! 🚀

