# CoffeeScribe

**CoffeeScribe** is a web application designed for creative and expressive note-taking. Users can freely write down their thoughts and ideas in an intuitive, user-friendly interface that mimics the feel of a real notebook, complete with a pen and coffee cup aesthetic.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Production](#production)
- [Contact](#contact)

## Features

- **User Authentication**: Register and log in to manage your notes securely.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Search Functionality**: Easily search through your notes.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Redux, HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Others**: Redux for state management, React Router for navigation

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/vaishnaviprakash12/coffeeScribe
    cd coffeeScribe
    ```

2. **Install dependencies for the frontend**:
    ```bash
    cd frontend
    npm install
    ```

3. **Install dependencies for the backend**:
    ```bash
    cd ../backend
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add the following variables:
    ```env
    NODE_ENV = development
    PORT = 5000
    MONGO_URI = your_mongodb_connection_string
    JWT_SECRET = your_jwt_secret_key
    ```

5. **Run the application**:
    ```bash
    # Start the backend server
    cd backend
    npm run dev

    # Start the frontend server in another terminal
    cd frontend
    npm start
    ```

## Usage

1. **Register**: Create a new account or log in with existing credentials.
2. **Create Notes**: Click on "Create Note" to start a new note.
3. **Manage Notes**: Edit or delete notes as needed.
4. **Search**: Use the search bar to find specific notes quickly.

## Production

To deploy CoffeeScribe in production:

1. Update the `.env` file in the `backend` directory with production MongoDB connection string and JWT secret key.

2. Build the frontend for production:
   ```bash
   cd frontend
   npm run build
## Contact

Vaishnavi Prakash - [LinkedIn](https://www.linkedin.com/in/vaishnavi-prakash-b5547921a/) - [Email](mailto:vaishnaviprakash342@gmail.com)

Project Link: [https://github.com/vaishnaviprakash12/coffeeScribe](https://github.com/vaishnaviprakash12/coffeeScribe)
Live Site: [https://coffeescribe-5coz.onrender.com/](https://coffeescribe-5coz.onrender.com/)
