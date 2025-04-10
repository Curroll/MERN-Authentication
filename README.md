# MERN Authentication System

## Description
A full-stack application for user authentication using the MERN stack (MongoDB, Express, React, Node.js).

## Demo
(Include a link to a live demo if available)

## Features
- User registration and login
- Email verification
- Password reset functionality
- JWT-based authentication

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB

## Installation
1. Clone the repository
2. Navigate to the Client and Server directories and run `npm install` for both.
3. Set up environment variables as needed.
4. Start the server using `npm start` in the Server directory and the client using `npm run dev` in the Client directory.

## API Documentation
### Authentication Routes
- **POST /register**: Registers a new user.
- **POST /login**: Logs in an existing user.
- **POST /logout**: Logs out the user.
- **POST /sendVerifyOtp**: Sends a verification OTP to the user's email (requires authentication).
- **POST /verifyEmail**: Verifies the user's email using the OTP (requires authentication).
- **GET /isAuth**: Checks if the user is authenticated (requires authentication).
- **POST /sendResetOtp**: Sends a password reset OTP to the user's email.
- **POST /resetPassword**: Resets the user's password using the provided OTP.

### User Routes
- **GET /data**: Retrieves user data (requires authentication).

## Contributing
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and commit them with clear messages.
- Push your changes and create a pull request.


## Contact
👤 Prince Dhankar  
📧 dhankarprince02@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/princedhankar)  
💻 [GitHub](https://github.com/Curroll)
