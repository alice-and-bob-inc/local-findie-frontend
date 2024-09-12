# Local Findie - Local Business Directory

## Description

Local Findie is a full-stack web application that helps users discover, review, and interact with local businesses. Users can search for businesses and leave reviews. The app provides search filters, making it easier to find businesses like restaurants, shops, or services in a specific area.

This project is built with a React frontend and a Node.js/Express backend using MongoDB for data storage. It includes full CRUD functionality for businesses.


## Features

- Users can sign up, log in, and log out.
- Businesses can be created, updated, and deleted by users.
- Users can search and filter businesses with key words.
- Users can leave reviews and rate businesses.


## Instructions to Run the App

### Prerequisites

Before running the application locally, ensure you have the following installed on your machine:

- Node.js (version 14.x or higher)
- MongoDB (local instance or MongoDB Atlas account)
- Git


### Installation

1. Clone the Backend Repository

git clone https://github.com/alice-and-bob-inc/local-findie-backend.git

cd local-findie-backend

code .

2. Install Dependencies by running this command

```
npm install
```

3. You will need to create a .env file in the server directory to store environment variables required for the backend

```
PORT = 5005
ORIGIN = http://localhost:5173
TOKEN_SECRET = <a_password_of_your_choice>
```

4. Run the Server

npm run dev

The backend API will be listening on http://localhost:5005

5. Clone the Frontend Repository

git clone https://github.com/alice-and-bob-inc/local-findie-frontend.git

cd local-findie-frontend

code .

6. Install Dependencies by running this command

npm install

7. You will need to create a .env file in the client directory to store environment variables required for the frontend

VITE_API_URL=http://localhost:5005

CLOUDINARY_NAME = <_must_get_it_from_cloudinary>
CLOUDINARY_KEY = <_must_get_it_from_cloudinary>
CLOUDINARY_SECRET = <_must_get_it_from_cloudinary>

8. Run the Application

npm run dev

The application will open in your default web browser at http://localhost:5173






## Demo

You can see [here](https://local-findie.netlify.app/) the live version of the project on Netlify.

