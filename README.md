# AdVibe - Online Advertisement Platform - Full Stack Project

This project is a full-stack web service platform for managing advertisements,
users, and related content.
It uses a layered architecture, with separate backend and frontend components
handling core functionality.
The backend manages business logic, database interactions, and API services,
while the front end provides a user interface for managing advertisements and user data. [Demo](#demo)

***

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
   - [Backend](#backend)
   - [Frontend](#frontend)
- [API Endpoints](#api-endpoints)
- [App Components](#app-components)
- [Demo](#demo)

***

## Project Overview
**AdVibe** enables users to:
- **View, create, update, and delete advertisements.**
- **Manage user information** (create, update, delete users).
- **Authenticate users via Google OAuth.**

The platform includes both a backend API for managing data and a frontend UI for user interaction. It is designed with a layered architecture to separate concerns and improve maintainability.

***

## Technologies Used

**Backend**
- **Node.js**: Backend platform
- **TypeScript**: Typed JavaScript for better development experience
- **Express.js**: Web framework for building APIs.
- **PostgresSQL**: Relational database

**Frontend**
- **React**: Frontend library for building user interfaces.
- **React Router**: Client-side routing for navigation.
- **CSS**: Custom styling for layout and design.
- **Google OAuth**: For user authentication.

***

## Architecture

**Backend**
- **Controllers**: Handle HTTP requests (e.g., `advertisement.http.controller.ts`, `user.http.controller.ts`).
- **Services**: Business logic layer (e.g., `ad.service.ts`, `user.service.ts`).
- **Repositories**: Database interaction layer (e.g., `ad.repository.ts`, `user.repository.ts`).
- **Entities**: Represent data models (e.g., `ad.entity.ts`, `user.entity.ts`).

**Frontend**
- **Components**: UI elements and views (`Home`, `UserHandler`, etc.).
- **Context Providers**: Manage global state and data sharing (`UserProvider`)
- **Layouts**: Define overall page structure and navigation (`RootLayout`)

***

## Installation

**Backend Installation**
1. Clone the repository:
   ```bash
   https://github.com/Sasindu-Abhayawardhana/advibe-online-advertisement-platform.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment:
   ```bash
   cp .env
   # Set database credentials and other config in the .env file
   ```

4. Run the application:
   ```bash
   npm compile
   npm start
   ```
5. Access the application at `http://localhost:5050`

**Frontend Installation**

1. Clone the repository:
   ```bash
   https://github.com/Sasindu-Abhayawardhana/advibe-online-advertisement-platform.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:3000`

***

## API Endpoints
The API has several endpoints to manage ads, users, and images.

### Users
- `GET /users` - Retrieve all users
- `POST /users` - Create a new user
- `GET /users/:id` - Retrieve a user by ID
- `DELETE /users/:id` - Delete a user by ID

### Advertisements
- `GET /ads` - Retrieve all ads
- `POST /ads` - Create a new advertisement
- `GET /ads/:id` - Retrieve an ad by ID
- `DELETE /ads/:id` - Delete an ad by ID

***

### Demo

#### Demo Video:

https://github.com/user-attachments/assets/7d22c345-439c-4d9f-bc3a-cf685e6b18f5

https://github.com/user-attachments/assets/c1ef3216-3edc-4ff6-b541-64cae14ce619

https://github.com/user-attachments/assets/e7935ff2-7b50-45a9-8cf8-ea00dcb4b786


***

## License
This project is licensed under the MIT License.
