### OnoAir Flight Management and Booking System

#### Project Goal
The purpose of this project is to develop a comprehensive and professional flight booking application that allows users to book flights easily and conveniently. This project will be an ongoing assignment throughout the Frontend Development and Implementation course in the Computer Science department. It will enable students to apply the knowledge and skills acquired during the course.

#### Application Objectives
- **Provide a convenient and efficient solution for flight booking**: Enable users to find and book flights easily and quickly while comparing a wide range of options.
- **Offer an intuitive and efficient management interface for system administrators**: Allow system administrators to monitor the application's performance and manage the database of flights and users. The management interface will include tools for data management and dashboards for analyzing system activity.
- **Introduce advanced features**: Integrate advanced features such as advanced search, seat reservation, special add-ons, and more. The system will incorporate gamification principles to enhance the user experience.


### Overview

OnoAir is a flight booking and management application designed to provide a user-friendly and efficient way for users to book flights and for administrators to manage flight and user data. This project is being developed as part of a course in Frontend Development and Implementation in the Computer Science department.

### Features

#### User Features
- **Flight Search**: Users can search for available flights, filter by origin or destination, and view details for each option.
- **Flight Booking**: A form allows users to enter passenger details and finalize their booking.
- **My Bookings**: Users can view all previous and upcoming bookings, including detailed information for each booking.

#### Admin Features
- **Destination Management**: Administrators can view and add new flight destinations, with a table displaying current destinations.
- **Flight Management**: Administrators can view and add new flights, managing the database of available flights.

## Project Structure

### File and Folder Descriptions

- **index.html**: The main landing page of the application. This page serves as the entry point for users and provides links to other sections of the application, such as user and admin interfaces.

- **global.css**: A global stylesheet for resetting default browser styles and applying base styles like `box-sizing`, margins, padding, font settings, and body background color. This ensures a consistent foundation for styling across all pages.

- **README.md**: The project’s README file, containing an overview of the project, instructions, and descriptions of the file structure and functionality. It serves as a guide for understanding and navigating the project.

- **public/**: A folder for storing static assets such as images, icons, or other media files used throughout the application. For instance, `plain.webp` might be an image used on multiple pages.

- **pages/**: This directory contains all the HTML files for individual pages within the application. Each page or feature (such as booking flights, managing flights, or viewing user bookings) has its own folder within `pages/`, which includes the specific `index.html` and `styles.css` files required for that section. For example:
  - `pages/book_flight/` contains the HTML and CSS files for booking a flight, organized further by specific flight IDs (e.g., `W61283`, `LX8396`).
  - `pages/add_flight/` contains files for the add flight functionality.
  - `pages/user_manage_bookings/` holds files for viewing and managing user bookings.


### Requirements

- Basic HTML and CSS for static content.
- JavaScript can be used to enhance interactivity (e.g., form handling, filters, and navigation).

### Usage

- **User Screens**: Users can search, filter, book, and view their bookings.
- **Admin Screens**: Administrators can manage flight destinations and flights.
