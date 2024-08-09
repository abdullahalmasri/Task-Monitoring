Task Management System

This is a task management application built with Node.js and Express. It includes features for user registration, file uploads, real-time updates via WebSockets, and a dashboard for students and teachers.
Features

    User registration and login
    Profile management with profile picture upload
    File upload functionality
    Real-time status updates for file submissions
    Separate dashboards for students and teachers

Installation

Clone the Repository

bash

    git clone [<repository-url>](https://github.com/abdullahalmasri/Task-Monitoring.git)
    cd Task-Monitoring

Install Dependencies

Make sure you have Node.js and npm installed. Then, install the required npm packages:

bash

    npm install

Create Required Directories

Ensure the uploads directory exists for storing uploaded files:

bash

    mkdir uploads

Create users.json and files.json Files

Create empty users.json and files.json files in the root directory:

bash

    touch users.json files.json

Running the Application

Start the Server

Start the application with the following command:

bash

    npm start

The server will be running at http://localhost:3000.

Access the Application

Open your browser and navigate to http://localhost:3000 to access the application.

Endpoints

    GET / - Home page
    GET /register - Registration page
    GET /login - Login page
    GET /student/:username - Student dashboard
    GET /teacher - Teacher dashboard
    GET /aboutUs/:username - About Us page
    GET /contactUs/:username - Contact Us page
    GET /profile/:username - Profile page
    GET /files - List all files
    GET /file-status - Get files for a specific user

File Upload

    POST /upload - Upload a file

User Registration

    POST /register - Register a new user

User Login

    POST /login - Login and redirect based on user role

Real-Time Updates

    The application uses WebSockets for real-time updates. Ensure WebSocket clients are properly connected for receiving updates.

Development

Feel free to contribute to the development of this application. Create a new branch for each feature or fix, and submit a pull request.
License

This project is licensed under the MIT License - see the LICENSE file for details.
Running the Application
Steps to Run

    Clone the Repository: Clone the repository from your version control system (e.g., GitHub).
    Install Dependencies: Run npm install to install all required packages.
    Create Required Files and Directories: Make sure the uploads, users.json, and files.json files exist.
    Start the Server: Use npm start to run the server.
    Access the Application: Visit http://localhost:3000 in your web browser.

Directory Structure

    public/ - Contains static HTML files.
    uploads/ - Stores uploaded files.
    views/ - Contains EJS template files.
    server.js - Main server file for the application.

Dependencies

    express - Web framework for Node.js
    path - Path utilities
    fs - File system utilities
    multer - Middleware for handling file uploads
    ws - WebSocket library
    ejs - Templating engine