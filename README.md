# **Django-React Todo App**

## **Overview**

This project is a **full-stack Todo application** built with:

- **Django (Backend)** – Provides RESTful API endpoints.
- **React (Frontend)** – A user-friendly UI for managing todos.
- **PostgreSQL (Database)** – Stores todos persistently.
- **Nginx (Frontend Server)** – Serves the React app.
- **Docker & Docker Compose** – Manages containerized deployment.
- **GitHub Actions** – Implements CI/CD automation for building, testing, and pushing images to **Docker Hub**.

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

1. **Start the application using Docker Compose**

```
docker compose up --build
```

1. **Access the application**
- Frontend: Open [http://localhost:3000](http://localhost:3000/) in your browser.
- Backend API: Open http://localhost:8000/api/todos/.
1. **Run backend unit tests**

```
cd backend
python manage.py test
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

---

## **Automated Deployment with GitHub Actions**

### **Steps in CI/CD Workflow**

1. **Build Docker images** (Frontend & Backend)
2. **Run unit tests** (Django)
3. **Push images to Docker Hub**
4. **Deployment is completed**
- Once a commit is pushed to the `main` branch, the workflow automatically builds and pushes images to **Docker Hub**.

---

## **Conclusion**

- This project implements a **full-stack Todo application** with a **Django backend and React frontend**.
- **Docker Compose** manages all services, including PostgreSQL.
- **GitHub Actions CI/CD** automates testing and deployment to **Docker Hub**.
- The application can be easily deployed and tested both **locally and in production environments**.