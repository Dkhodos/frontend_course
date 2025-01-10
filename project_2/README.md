# **OnoAir Flight Management and Booking System (Angular Version)**

<p align="center">
  <img src="public/plane.webp" alt="OnoAir Logo" style="border-radius: 50%; width: 200px; height: 200px;">
</p>

---

## **Project Overview**

**OnoAir** is a comprehensive flight management and booking system developed with **Angular 19**, providing a seamless user experience for searching and booking flights, while allowing administrators to manage destinations, flights, and passengers. This project follows modern frontend development practices using Angular components, services, and routing.

This is the **second phase** of the project, transitioning from a basic vanilla JavaScript implementation to a scalable Angular-based system. The system is designed according to project specifications, including CRUD operations, search filters, and a dynamic flight schedule powered by a custom **DateUtils** service.

---

## **Project Goals and Requirements**

The main objectives of the project include:

- **Flight Booking Platform**: Enable users to browse, search, and book flights easily and securely.
- **Admin Management Interface**: Provide system administrators with tools to manage flights, destinations, and bookings.
- **User-Friendly Interface**: Create an intuitive UI using **Angular Material** components, ensuring usability and accessibility.
- **Dynamic Data Handling**: Use services and models to manage data dynamically using **TypeScript** classes.

---

## **Application Features**

### **User Features**
- **Search Flights**: Search flights by origin, destination, and dates.
- **Last Minute Flights**: Highlight flights departing soon.
- **Flight Booking**: A dedicated form for adding passenger details and confirming flight bookings.
- **View Bookings**: Separate lists for past and future bookings with view details functionality.

### **Admin Features**
- **Manage Flights**: View, add, and manage available flights.
- **Manage Destinations**: Manage destinations with full details, including names, codes, airports, and photos.
- **Dashboard Summary**: Summary dashboard showing flights, destinations, and bookings.

### **Global Features**
- **Error Handling & Validation**: Handle form validation errors using Angular Material.
- **404 Error Page**: Custom 404 page with SVG illustration and helpful text.
- **Reusable Components**: Use Angular components such as tables, forms, and dialog modals.

---

## **Technologies and Tools Used**
- **Angular 19**: Frontend framework for building a modular and scalable SPA.
- **TypeScript**: Strongly-typed JavaScript for enhanced maintainability.
- **Angular Material**: UI components for a clean and responsive design.
- **Tailwind CSS**: Utility-first CSS framework for easy and modern styling.
- **Node.js & npm/yarn**: Dependency management and local development.
- **Git & GitHub**: Version control and collaboration.

---

## **Project Structure**

```plaintext
src/
├── app/
│   ├── models/               # TypeScript models for Flights, Bookings, and Destinations
│   ├── services/             # Angular services managing core business logic
│   ├── components/           # Reusable components like header, footer, placeholders
│   ├── pages/                # Page-level components for Home, Admin, Booking, and more
│   ├── utils/                # Utility classes such as DateUtils
│   ├── app.component.ts      # Root Angular component
│   ├── app.routes.ts         # Routing definitions
│   └── app.config.ts         # Global application configuration
│
├── assets/                   # Static files like images, icons, and SVGs
│   ├── page-not-found.svg    # Custom 404 illustration
│   ├── destinations/         # Flight destination images
│   └── plane.webp            # Logo
│
├── styles.scss               # Global CSS file
└── main.ts                   # Entry point for the Angular application
```

---

## **Installation & Setup**

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Start the Development Server**
   ```bash
   ng serve
   ```

   Open your browser at [http://localhost:4200](http://localhost:4200).

---

## **Available Scripts**

- **Run Tests**
  ```bash
  ng test
  ```

- **Build for Production**
  ```bash
  ng build --prod
  ```

- **Run Lint Check**
  ```bash
  ng lint
  ```

---

## **Data Management**

- **Dynamic Flight Schedules**:
  - All flight dates are dynamically generated using `DateUtils` to ensure relevant and up-to-date schedules.
  - Services return hardcoded lists of flights, destinations, and bookings with corresponding model definitions.

```typescript
import { dateUtils } from './utils/date-utils';

const today = dateUtils.getToday();              // Current date
const futureDate = dateUtils.getUpcomingDate(7); // 7 days ahead
const pastDate = dateUtils.getPastDate(3);       // 3 days ago
```

---

## **Testing & Validation**

- **Unit Tests**: Execute using `ng test` with Karma.
- **Linting**: Ensure code consistency with `ng lint`.
- **Manual Testing**: Thorough testing of all core features before submission.

---

## **Deployment Instructions**

1. **Build the Project for Production**
   ```bash
   ng build --prod
   ```

2. **Serve Locally**
   ```bash
   npx http-server dist/project2
   ```

3. **Deployment Platform**
   Upload the contents of the `dist/` folder to any hosting service (e.g., Firebase, GitHub Pages).

---

## **Assignment-Specific Deliverables**

1. **Frontend Screens**:
   - **Admin Pages**: Manage Flights, Destinations, and Bookings.
   - **User Pages**: Search Flights, Bookings Overview, Last Minute Flights, and Help Center.
   - **404 Error Page**: SVG-based fallback for missing pages.

2. **Commit & Submission Guidelines**:
   - Use **meaningful commit messages** describing the change.
   - **Multiple small commits** are preferred over large commits.
   - Ensure proper **GitHub repository linking**.

---
