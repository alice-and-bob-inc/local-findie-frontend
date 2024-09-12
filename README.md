# Local Findie - Local Business Directory - Client

## Description

Local Findie is a full-stack web application that helps users discover, review, and interact with local businesses. Users can search for businesses and leave reviews. The app provides search filters, making it easier to find businesses like restaurants, shops, or services in a specific area.

This project is built with a React frontend and a Node.js/Express backend using MongoDB for data storage. It includes full CRUD functionality for businesses.

You will find the Backend Repository with the setup instructions, here:

```
https://github.com/alice-and-bob-inc/local-findie-backend.git
```

## Features

- Users can sign up, log in, and log out.
- Businesses can be created, updated, and deleted by users.
- Users can search and filter businesses with key words.
- Users can leave reviews and rate businesses.


## Instructions to Run the App - Frontend


1. Clone the Frontend Repository

```
git clone https://github.com/alice-and-bob-inc/local-findie-frontend.git

cd local-findie-frontend

code .
```

2. Install Dependencies by running this command

```
npm install
```

3. You will need to create a .env file in the client directory to store environment variables required for the frontend

```
VITE_API_URL=http://localhost:5005

CLOUDINARY_NAME = <must_get_it_from_cloudinary>
CLOUDINARY_KEY = <must_get_it_from_cloudinary>
CLOUDINARY_SECRET = <must_get_it_from_cloudinary>
```

4. Run the Application

```
npm run dev
```

The application will open in your default web browser at http://localhost:5173


## Demo

You can see [here](https://local-findie.netlify.app/) the live version of the project on Netlify.
