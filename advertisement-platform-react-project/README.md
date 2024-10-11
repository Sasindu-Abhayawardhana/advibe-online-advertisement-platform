# AdVibe - Advertisement Platform Web Services - Frontend

This project is the frontend of the AdVibe web platform, which allows users to manage advertisements, users, and related content. It interacts with the backend API to perform CRUD operations for advertisements and user data. The platform features user authentication via Google and state management across various components.
## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Installation](#installation)
- [App Components](#app-components)
- [API Endpoints](#api-endpoints)
- [License](#license)


## Project Overview
The frontend of AdVibe enables users to:
   * View and filter advertisements.
   * Manage user information (create, update, delete users).
   * Perform CRUD operations for advertisements. 
   * Log in using Google authentication.


## Technologies Used
- **React**: Frontend library for building user interfaces.
- **React Router**: Client-side routing for navigation.
- **State Management**: React hooks like useState and useContext for sharing data across components.
- **CSS**: Custom styling for layout and design.

## Architecture
The application follows a modular structure, with key components organized into:

- **Components**: UI elements and views (`Home`, `UserHandler`, etc.).
- **Context Providers**: Manage global state and data sharing (`UserProvider`)
- **Layouts**: Define overall page structure and navigation (`RootLayout`)


## Installation
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

## App Components

- `App.js` - This is the root of the application. It initializes the routing system and provides context to share data globally.
- `Home.js` - This component loads and displays advertisements from the server. It also includes a search bar to filter ads by title.
- `UserHandler.js` - This component manages user authentication and details. Users can log in using their Google account, and the app fetches, updates, and deletes user data. 
- `UserProvider.js` - This context provider shares user information across components, making the login state accessible anywhere in the app.

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

### Advertisements
- **Google OAuth**: The platform integrates Google login for user authentication.

## License
This project is licensed under the MIT License.