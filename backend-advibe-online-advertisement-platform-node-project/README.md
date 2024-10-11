# AdVibe - Online Advertisement Platform - Backend

This project is a web service platform for managing advertisements, users, and related 
content. It uses a layered architecture, with controllers, services, and repositories handling core functionality.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)


## Project Overview
The platform enables users to create, manage, and view advertisements. It includes functionalities for handling users, ads, and images, with validation and custom queries built in.


## Technologies Used
- **Node.js**: Backend platform
- **TypeScript**: Typed JavaScript for better development experience
- **Express.js**: Web framework
- **PostgresSQL**: Relational database

## Architecture
The project follows a layere structure with the following key components:

- **Controllers**: Handle HTTP requests (e.g., `advertisement.http.controller.ts`, `user.http.controller.ts`).
- **Services**: Business logic layer (e.g., `ad.service.ts`, `user.service.ts`).
- **Repositories**: Database interaction layer (e.g., `ad.repository.ts`, `user.repository.ts`).
- **Entities**: Represent data models (e.g., `ad.entity.ts`, `user.entity.ts`).


## Installation
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


## License
This project is licensed under the MIT License.
