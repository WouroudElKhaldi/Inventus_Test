# Inventus_Test_Back

### Features

- **User Authentication**: Implements authentication using JWT to secure endpoints and ensure data privacy.
- **Table Management**: Allows administrators to add, edit, and delete tables with various attributes such as table number and type.
- **User Management**: Supports user registration and authentication, distinguishing between regular users and administrators.
- **Reservation Handling**: Facilitates the booking of tables by users, enabling them to specify the desired date, time, and duration of the reservation.
- **Role-Based Access Control**: Differentiates between user roles (regular user vs. administrator) to restrict access to certain functionalities.
- **Persistent Data Storage**: Utilizes MongoDB as the database management system for storing table, user, and reservation data.

### Technologies Used

- **MongoDB**: A NoSQL database used to store and manage the application's data.
- **Node.js**: A JavaScript runtime environment that executes server-side code, handling server logic and API endpoints.
- **Express**: A web application framework for Node.js that simplifies the process of building robust APIs.
- **JSON Web Tokens (JWT)**: A standard for securely transmitting information between parties as a JSON object, used for authentication and authorization.
- **JavaScript (ES6+)**: The primary programming language used for both frontend and backend development.

### Instructions

1. **Clone the Repository**: Clone this repository to your local machine using `git clone`.
2. **Install Dependencies**: Navigate to the project directory and run `npm install` to install the required dependencies.
3. **Set Up Environment Variables**: Create a `.env` file in the root directory and configure environment variables such as database connection URI and JWT secret.
4. **Start the Server**: Run `npm start` to start the server. By default, the server will run on port 3000.
5. **Explore the API**: Use tools like Postman or curl to interact with the API endpoints and perform CRUD operations on tables, users, and reservations.
