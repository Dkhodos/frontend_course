# OnoAir Flight Management and Booking System

<p align="center">
  <img src="public/plane.webp" alt="OnoAir" style="border-radius: 50%; width: 200px; height: 200px;">
</p>

## Project Goal

The purpose of this project is to develop a comprehensive and professional flight booking application that allows users to book flights easily and conveniently. This project will be an ongoing assignment throughout the Frontend Development and Implementation course in the Computer Science department. It will enable students to apply the knowledge and skills acquired during the course.

## Application Objectives

- **Provide a convenient and efficient solution for flight booking**: Enable users to find and book flights easily and quickly while comparing a wide range of options.

- **Offer an intuitive and efficient management interface for system administrators**: Allow system administrators to monitor the application's performance and manage the database of flights and users. The management interface will include tools for data management and dashboards for analyzing system activity.

- **Introduce advanced features**: Integrate advanced features such as advanced search, seat reservation, special add-ons, and more. The system will incorporate gamification principles to enhance the user experience.

## Overview

OnoAir is a flight booking and management application designed to provide a user-friendly and efficient way for users to book flights and for administrators to manage flight and user data. This project is being developed as part of a course in Frontend Development and Implementation in the Computer Science department.

## Features

### User Features

- **Flight Search**: Users can search for available flights, filter by origin or destination, and view details for each option.

- **Flight Booking**: A form allows users to enter passenger details and finalize their booking.

- **My Bookings**: Users can view all previous and upcoming bookings, including detailed information for each booking.

### Admin Features

- **Destination Management**: Administrators can view and add new flight destinations, with a table displaying current destinations.

- **Flight Management**: Administrators can view and add new flights, managing the database of available flights.

## Project Structure

### Folder Descriptions

- **`models/`**: Contains the core data models representing the system's entities, such as flights, bookings, passengers, and destinations.

- **`public/`**: Stores static assets such as images, icons, and media files used throughout the application.

- **`pages/`**: Includes the HTML and CSS files for each feature of the application, such as booking flights, managing flights, and viewing user bookings. Each feature is organized into its own subfolder for better structure and maintainability.

- **`styles/`**: A folder dedicated to global and feature-specific stylesheets, ensuring the application maintains a consistent look and feel.

## Server Setup

The application uses an Express server built with Node.js to serve static files and handle routing. It also includes logging setup using Winston to log server calls and activity.

### Dependencies

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **Nodemon**: Utility that monitors for changes in your source and automatically restarts the server.
- **Winston**: Logging library for Node.js.
- **express-winston**: Middleware for logging Express requests and responses using Winston.

## Requirements

- **Node.js** and **npm** installed on your machine.
- Basic knowledge of command-line operations.

## Run Project

To install dependencies  and start the project, run:

```shell
yarn install
yarn start
```
