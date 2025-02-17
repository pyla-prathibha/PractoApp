# Practo Clone - Doctor and Practice Management System

This project is a **Practo Clone** that allows users to search and manage doctors and medical practices. It integrates Spring Boot for the backend, MySQL for data storage, and Elasticsearch for efficient search functionality. This app includes features for managing doctors, practices, specialties, and consultations, providing a platform for users to search for healthcare professionals based on various criteria.

## Features

- **Doctor Management**: Ads doctor details including specialties, qualifications, and contact information.
- **Practice Management**: Manage medical practices including contact details, working hours, and associated doctors.
- **Search Functionality**: Search for doctors and practices using Elasticsearch with filtering by practice name and specialties.
- **Doctor-Doctor Relationships**: Link multiple doctors to a single practice.
- **Doctor and Practice Details**: Retrieve detailed information about a doctor or practice including associated specialties, doctors, and tags.
- **Cross-Origin Resource Sharing (CORS)**: Allows for communication between the backend (Spring Boot) and the frontend (React) hosted on different servers.

## Tech Stack

- **Backend**: Spring Boot, Java
- **Frontend**: React (for the UI) and Tailwind CSS (for styling)
- **Database**: MySQL
- **Search Engine**: Elasticsearch
- **Authentication**: Session-based authentication with cookies
- **Others**: Lombok, JPA, Spring Data Elasticsearch

### Prerequisites

- **Java 17** (or higher)
- **MySQL 8** (or higher)
- **Elasticsearch** (version 7.x or higher)
- **React.js and npm** (for frontend development)

  
## Database Schema

### Tables in `practo` database:
| Table Name             | Description |
|------------------------|-------------|
| `doc_practice`         | Maps doctors to practices (hospitals/clinics). |
| `doctor_qualification` | Stores doctor qualifications. |
| `doctor_speciality`    | Stores doctor specialties. |
| `doctors`             | Stores doctor details. |
| `practice_speciality`  | Maps practices to specialties. |
| `practices`           | Stores hospital/clinic details. |
| `qualifications`       | Stores qualification details. |
| `specialities`        | Stores specialty details. |
| `tags`               | Stores tags for filtering/search. |
| `users`              | Stores user login details. |

## Setup & Installation

1. Clone the repo:
   ```sh
   git clone [your-repo-url]
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Run the Spring Boot application:
   ```sh
   mvn spring-boot:run
   ```
### Frontend:
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start

##Folder Structure
practo-clone/
├── backend/                     # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── practoapp/
│   │   │   │           ├── controller/       # REST Controllers
│   │   │   │           ├── service/          # Services for business logic
│   │   │   │           ├── repository/       # JPA Repositories
│   │   │   │           ├── entity/           # JPA Entities
│   │   │   │           ├── dto/              # Data Transfer Objects
│   │   │   │           ├── elasticsearch/    # Elasticsearch integration
│   │   │   │           └── config/            # Configuration classes
│   │   │   └── resources/
│   │   │       └── application.properties      # Configuration file
│   └── pom.xml                                 # Maven project file
└── frontend/                    # React frontend
    ├── public/
    ├── src/
    │   ├── components/           # React components
    │   ├── pages/                # Pages for routing
    │   ├── App.js                # Main React component
    │   ├── index.js              # Entry point for React app
    ├── package.json              # npm package file


