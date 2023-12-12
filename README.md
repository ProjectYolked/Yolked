## Project Structure

This project follows the MERN stack architecture. Here's the overview of the project directory structure:

### Root Directory

- `/client`: Contains all the React frontend code.
- `/server`: Contains Node.js and Express backend code.
- `/config`: Global configuration files.
- `/scripts`: Utility scripts.
- `/tests`: Test suites.
- `package.json`: Project metadata and dependencies.
- `README.md`: Documentation of the project.

### Client Directory (React Frontend)

- `/client`
    - `/src`
        - `/components`: Reusable UI components.
        - `/pages`: Components for entire pages.
        - `/hooks`: Custom React hooks.
        - `/assets`: Static files (images, stylesheets).
        - `/utils`: Utility functions.
        - `/services`: API service calls.
        - `App.jsx`: Main React application entry.
        - `main.jsx`: Root JavaScript file.

### Server Directory (Node.js/Express Backend)

- `/server`
    - `/api`
        - `/controllers`: Request handling functions.
        - `/models`: MongoDB models (schemas).
        - `/routes`: API routing.
    - `/config`: Server configurations (db).
    - `/utils`: Backend utilities.
    - `server.js`: Main server entry point.

## Getting Started
- Navigate to the root directory and run 'npm install' to install server dependencies
- Navigate to client directory and run 'npm install' to install server dependencies
- Navigate to the root director and run 'npm run dev' to compile the server and run the client.