# Fleet Management Application

This is a full-stack application for managing a fleet of vehicles. It uses a NestJS backend, an Angular frontend, and a PostgreSQL database, all orchestrated with Docker Compose.

## Features

*   **Backend (NestJS):** Manages vehicle data using TypeORM and PostgreSQL. Provides API endpoints for creating, reading, updating, and deleting vehicles.
*   **Frontend (Angular):** User interface for interacting with the backend API. Allows users to view, add, edit, and delete vehicles, as well as filter them by status.
*   **Database (PostgreSQL):** Stores the vehicle data persistently.

## Technologies Used

*   NestJS
*   Angular
*   TypeORM
*   PostgreSQL
*   Docker
*   Docker Compose

## Getting Started

### Prerequisites

1.  **Git:** Make sure you have Git installed on your system. You can download it from [https://git-scm.com/](https://git-scm.com/).
2.  **Docker:** Ensure Docker and Docker Compose are installed.  You can get Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).

### Installation

1.  **Clone the repository:**

     ```bash
    git clone [https://github.com/Guy-Keinan/vehicle-app.git](https://github.com/Guy-Keinan/vehicle-app.git)
    cd vehicle-app
    ```

### Running the Application

1.  **Start with Docker Compose:**

    ```bash
    docker-compose up --build -d  # The -d flag runs containers in detached mode (background)
    ```

    This command will:

    *   Build the Docker images for the backend and frontend.
    *   Start the PostgreSQL database container.
    *   Start the NestJS backend container.
    *   Start the Angular frontend container.

2.  **Access the application:**

    *   **Frontend:**  [http://localhost:4201](http://localhost:4201)
    *   **Backend API:** [http://localhost:3000](http://localhost:3000) (You can use tools like Postman or curl to interact directly with the API).

3.  **Stop the application:**

    ```bash
    docker-compose down
    ```