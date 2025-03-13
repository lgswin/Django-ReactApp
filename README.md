# **Django-React Todo App**

## **Overview**

This project is a **full-stack Todo application** built with:

- **Django (Backend)** – Provides RESTful API endpoints.
- **React (Frontend)** – A user-friendly UI for managing todos.
- **PostgreSQL (Database)** – Stores todos persistently.
- **Nginx (Frontend Server)** – Serves the React app.
- **Docker & Docker Compose** – Manages containerized deployment.
- **GitHub Actions** – Implements CI/CD automation for building, testing, and pushing images to **Docker Hub**.
- **Jenkins** – Implements Jenkins pipeline for building and testing in Jenkins server established on Azure cloud.

---

## **Project Features**

### **1. Backend (Django)**

- Uses **Django REST Framework** for API development.
- Implements CRUD operations for the `Todo` model with fields:
    - `title`: The title of the task.
    - `description`: Additional details.
    - `completed`: Task completion status.
- Provides an **Admin panel** for database management.
- Uses **PostgreSQL** as the database.
- Includes **unit tests** for API functionality.
- two tests fail
![Screenshot 2025-02-18 at 10 57 26 PM](https://github.com/user-attachments/assets/6ff2d8b8-b27f-401e-82bc-691eb41f9c63)
- if the functionalities are implemented, All tests pass.
![Screenshot 2025-02-18 at 11 04 35 PM](https://github.com/user-attachments/assets/4e02be56-0eb5-49eb-8ac7-15ee90e20395)

### **2. Frontend (React)**

- Built using **React.js**.
- Implements **Add, Edit, Delete** functionalities.
- Uses **Axios** to interact with the backend API.
- Styled with **Bootstrap** for a responsive layout.

### **3. Containerization & Deployment**

- **Dockerfiles** created for both frontend and backend.
- **Docker Compose** orchestrates all services.
- **Nginx** serves the frontend.
- **PostgreSQL** stores the application's data.
- **CI/CD pipeline using GitHub Actions** automates:
    - Testing (unit tests)
    - Building images
    - Pushing images to **Docker Hub**

---

## **Project Structure**

```
Django-React-Todo-App/
│── backend/                     # Django backend
│   ├── Dockerfile                # Dockerfile for backend
│   ├── manage.py                 # Django management script
│   ├── requirements.txt          # Dependencies
│   ├── backend/                  # Django project files
│   ├── todos/                    # Todo app (models, views, serializers)
│   ├── tests/                    # Unit tests
│
│── frontend/                     # React frontend
│   ├── Dockerfile                # Dockerfile for frontend
│   ├── package.json              # Frontend dependencies
│   ├── src/                      # React source files
│   ├── public/                   # Static assets
│
│── .github/workflows/            # GitHub Actions CI/CD
│   ├── ci.yml                     # Workflow for build & deployment
│
│── docker-compose.yml            # Docker Compose configuration
│── README.md                     # Project documentation
```

---

## **How to Run Locally**

Ensure **Docker and Docker Compose** are installed on your system.

1. **Clone the repository**

```
git clone https://github.com/lgswin/Django-ReactApp.git
cd django-react-todo
```

2. **Start the application using Docker Compose**

```
docker compose up --build
```

3. **Access the application**
- Frontend: Open [http://localhost:3000](http://localhost:3000/) in your browser.
- Backend API: Open http://localhost:8000/api/todos/.
4. **Run backend unit tests**

```
docker compose exec backend python manage.py test
```

---

## **CI/CD Pipeline with GitHub Actions**

This project is integrated with **GitHub Actions** to automate:

- Building Docker images
- Running unit tests
- Deploying images to **Docker Hub**

### **Workflow (`.github/workflows/ci.yml`)**

1. **Checkout repository**
2. **Build & test the application using Docker Compose**
3. **Run backend unit tests**
4. **Push Docker images to Docker Hub** (using GitHub Secrets)

### **GitHub Secrets Used**

- **DOCKER_USERNAME:** Docker Hub username
- **DOCKER_PASSWORD:** Docker Hub access token

### **Docker Images in Docker Hub**

- **Backend:** `dockerhub-username/django-react-backend`
- **Frontend:**`dockerhub-username/django-react-frontend`

### **Manually Checking Pushed Images**

You can verify the pushed images in **Docker Hub > Repositories**.
![dockerImages](https://github.com/user-attachments/assets/c3a7757f-bbab-4829-84d2-83a24b69f61f)

---

## **Automated Deployment with GitHub Actions**

### **Steps in CI/CD Workflow**

1. **Build Docker images** (Frontend & Backend)
2. **Run unit tests** (Django)
3. **Push images to Docker Hub**
4. **Deployment is completed**
- Once a commit is pushed to the `main` branch, the workflow automatically builds and pushes images to **Docker Hub**.

---

## + **Jenkins CI/CD Pipeline Integration**

In addition to **GitHub Actions**, this project also integrates a **Jenkins CI/CD pipeline** for automated builds and testing.

**Jenkins Setup on Azure**

The **Jenkins server** is deployed on **Azure** and configured to automate the CI/CD workflow. 

![Screenshot 2025-02-18 at 11 51 23 PM](https://github.com/user-attachments/assets/e73c4c58-6a40-4c62-afde-3a665f6e3d22)

The Jenkinsfile in the repository defines a pipeline similar to the **GitHub Actions** workflow.

```
pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = "docker-compose"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'github_credentials', url: 'https://github.com/lgswin/Django-ReactApp.git', branch: 'main'
            }
        }

        stage('Build and Start Containers') {
            steps {
                sh '${DOCKER_COMPOSE} up -d --build'
            }
        }

        stage('Wait for Services') {
            steps {
                sh '''
                echo "Waiting for PostgreSQL to be ready..."
                sleep 20  # waiting for PostgreSQL running
                ${DOCKER_COMPOSE} exec db pg_isready -U user
                '''
            }
        }

        stage('Run Django Migrations') {
            steps {
                sh '${DOCKER_COMPOSE} exec backend python manage.py migrate'
            }
        }

        stage('Run Tests') {
            steps {
                sh '${DOCKER_COMPOSE} exec backend python manage.py test'
            }
        }

        stage('Teardown') {
            steps {
                sh '${DOCKER_COMPOSE} down'
            }
        }
    }
}
```

**Jenkins Pipeline Workflow**

1.	**Checkout Code** – Jenkins pulls the latest code from the GitHub repository.

2.	**Build and Start Containers** – Uses **Docker Compose** to build and run the frontend, backend, and database services.

3.	**Run Django Migrations** – Ensures the PostgreSQL database is correctly set up.

4.	**Run Tests** – Executes Django unit tests to validate functionality.

5.	**Teardown** – Stops and removes containers after testing to free resources.

**Jenkins Configuration and Execution**

1.	**Add GitHub Repository and Credentials** – In **Jenkins**, the GitHub repository URL is added along with the required credentials for authentication.

![Screenshot 2025-02-18 at 11 55 10 PM](https://github.com/user-attachments/assets/08e19785-9501-4601-be92-b71550c617c7)

2.	**Create a New Pipeline** – A pipeline job is created and linked to the repository.

![Screenshot 2025-02-18 at 11 56 21 PM](https://github.com/user-attachments/assets/89be746e-d028-46cf-ac61-a1ea554d2271)

3.	**Triggering the Build** – Clicking **“Build Now”** starts the pipeline, automatically fetching and executing the Jenkinsfile.

4.	**Automated Processing** – The pipeline executes all defined stages, including **building Docker images, running tests, and deploying**.

![Screenshot 2025-02-18 at 11 58 47 PM](https://github.com/user-attachments/assets/d6f3588e-cce5-44e7-a30d-1a568d0d8724)



## **Conclusion**

- This project implements a **full-stack Todo application** with a **Django backend and React frontend**.
- **Docker Compose** manages all services, including PostgreSQL.
- **GitHub Actions CI/CD** automates testing and deployment to **Docker Hub**.
- Jenkins pipeline is integrated into the project for automated builds and testing.
------- new things