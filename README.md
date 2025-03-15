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

<img src="https://github.com/user-attachments/assets/6ff2d8b8-b27f-401e-82bc-691eb41f9c63" width="500" alt="unit tests fail">

- if the functionalities are implemented, All tests pass.  

<img src="https://github.com/user-attachments/assets/4e02be56-0eb5-49eb-8ac7-15ee90e20395" width="500" alt="all tests pass">

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
<img src="https://github.com/user-attachments/assets/c3a7757f-bbab-4829-84d2-83a24b69f61f" width="800" alt="docker images">

---

## **Automated Deployment with GitHub Actions**

### **Steps in CI/CD Workflow**

1. **Build Docker images** (Frontend & Backend)
2. **Run unit tests** (Django)
3. **Push images to Docker Hub**
4. **Deployment is completed**
- Once a commit is pushed to the `main` branch, the workflow automatically builds and pushes images to **Docker Hub**.

---

## **Jenkins CI/CD Pipeline Integration**

In addition to **GitHub Actions**, this project also integrates a **Jenkins CI/CD pipeline** for automated builds and testing.

**Jenkins Setup on Azure**

The **Jenkins server** is deployed on **Azure** and configured to automate the CI/CD workflow.  

<img src="https://github.com/user-attachments/assets/e73c4c58-6a40-4c62-afde-3a665f6e3d22" width="700" alt="docker images">

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

<img src="https://github.com/user-attachments/assets/08e19785-9501-4601-be92-b71550c617c7" width="700" height="500" alt="docker images">

2.	**Create a New Pipeline** – A pipeline job is created and linked to the repository.

<img src="https://github.com/user-attachments/assets/89be746e-d028-46cf-ac61-a1ea554d2271" width="700" height="500" alt="docker images">

3.	**Triggering the Build** – Clicking **“Build Now”** starts the pipeline, automatically fetching and executing the Jenkinsfile.

4.	**Automated Processing** – The pipeline executes all defined stages, including **building Docker images, running tests, and deploying**.

## **Adding GitHub Credentials to Jenkins**
To allow Jenkins to access private repositories on GitHub, you need to set up GitHub credentials in Jenkins.

### **Step 1: Generate a GitHub Token**
1. Go to **GitHub** → **Settings** → **Developer Settings** → **GitHub Apps**.
2. Click **Generate New App**.
3. Copy the **App ID** for later use.
4. Generate a **Private Key**:
   - Click **Generate Private Key** (it will download a `.pem` file).
   - Convert the key using the following command:
     ```sh
     openssl pkcs8 -topk8 -nocrypt -in downloaded-key.pem
     ```
   - Copy the output and save it for later.

        <img width="468" alt="image" src="https://github.com/user-attachments/assets/012ebd56-7d1b-4052-96c1-5214822fc97d" />

        <img width="388" alt="image" src="https://github.com/user-attachments/assets/3ed9a270-30d2-4ef7-bbf5-84c40279e103" />

        <img width="385" alt="image" src="https://github.com/user-attachments/assets/0556edcf-a082-4038-9761-ca7aa13394ca" />

### **Step 2: Add GitHub Credentials to Jenkins**
1. Open **Jenkins Dashboard** → **Manage Jenkins** → **Manage Credentials**.
2. Under **Global credentials**, click **Add Credentials**.
3. Configure the new credentials:
   - **Kind**: `GitHub App`
   - **App ID**: Paste the **GitHub App ID** copied earlier.
   - **Key**: Paste the **converted private key** from the previous step.
   - **Description**: `GitHub Token for Jenkins`
4. Click **Save**.

    <img width="468" alt="image" src="https://github.com/user-attachments/assets/0f779abf-0b82-421e-84b4-0c9c19d2c406" />

Now, Jenkins can authenticate with GitHub securely and access private repositories for automated builds.

## **Setting Up Webhook Trigger in Jenkins**
To automatically trigger Jenkins builds when new code is pushed to GitHub, configure a webhook in Jenkins.

### **Step 1: Enable GitHub Webhook in Jenkins**
1. Open **Jenkins Dashboard** → **Your Project** → **Configure**.
2. Scroll down to **Build Triggers**.
3. Check the option **GitHub hook trigger for GITScm polling**.
4. Click **Save**.

### **Step 2: Add a Webhook in GitHub**
1. Open your **GitHub repository**.
2. Go to **Settings** → **Webhooks**.
3. Click **Add webhook**.
4. Configure the webhook:
   - **Payload URL**: Set it to your Jenkins webhook URL:
     ```
     http://4.172.248.215:8080/github-webhook/
     ```
   - **Content type**: Select `application/json`.
   - **Trigger events**: Select **Just the push event**.
5. Click **Add webhook**.

    <img width="468" alt="image" src="https://github.com/user-attachments/assets/e2cdfd9f-7e89-4f22-a497-2a584913d3f3" />

### **Step 3: Test the Webhook**
- Make a commit and push it to GitHub.
- Go to **Jenkins Dashboard** → **Your Project**.
- The build should start automatically.

Now, Jenkins will automatically trigger a build whenever code is pushed to the GitHub repository.

<img width="468" alt="image" src="https://github.com/user-attachments/assets/789ab61e-c86c-4666-a1a6-be6d523cd740" />


## **Configuring Email Notifications in Jenkins**
Jenkins can send email notifications for **build successes** and **failures**.

### **Step 1: Configure SMTP in Jenkins**
1. Go to **Jenkins Dashboard** → **Manage Jenkins** → **Configure System**.
2. Scroll down to **E-mail Notification**.
3. Set up SMTP settings:
   ```
   SMTP Server: smtp.gmail.com
   SMTP Port: 587
   Use SMTP Authentication: Yes
   User Name: email@gmail.com
   Password: [Google App Password]
   Use TLS: Yes
   ```
    <img width="590" alt="image" src="https://github.com/user-attachments/assets/df8f8ad0-3ccf-425c-8394-ac8520c6cb5b" />

    <img width="590" alt="image" src="https://github.com/user-attachments/assets/01175a64-7c88-419f-a772-d8520a7e99ed" />

4. Click **Test Configuration** to verify.

### **Step 2: Install the Mailer Plugin (if not installed)**
1. Go to **Manage Jenkins** → **Manage Plugins**.
2. Search for **"Mailer"** and **"Email Extension Plugin"**.
3. Install and restart Jenkins if required.

### **Step 3: Add Email Notifications in Jenkins Pipeline**
Modify the `post` section in `Jenkinsfile` to send email notifications:

```groovy
post {
    success {
        emailext (
            to: 'email@gmail.com',
            subject: "Jenkins Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "The build was successful.\n\nCheck details: ${env.BUILD_URL}"
        )
    }

    failure {
        emailext (
            to: 'email@gmail.com',
            subject: "Jenkins Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: "The build failed.\n\nCheck details: ${env.BUILD_URL}"
        )
    }
}
```

### **Step 4: Test the Email Notification**
1. **Trigger a build manually** in Jenkins.
2. If configured correctly, you should receive an email upon **build success** or **failure**.

This ensures that team members stay informed about **build statuses** in Jenkins.


## **Conclusion**

This project successfully implements a **full-stack Todo application** with a **Django backend and React frontend**, following modern **DevOps and CI/CD best practices**.

### **Key Achievements**
- **Automated CI/CD Workflow**:
  - **GitHub Actions** automates testing, building, and deploying Docker images to **Docker Hub**.
  - **Jenkins Pipeline** ensures **automated builds and testing** on an **Azure-hosted Jenkins server**.
- **Containerized Deployment**:
  - Uses **Docker Compose** to orchestrate the backend, frontend, and database services.
  - Provides a **consistent environment** across development, testing, and production.
- **Efficient Code Integration**:
  - **GitHub Webhooks** trigger Jenkins builds automatically upon new commits.
  - **Automated Testing** prevents regressions and ensures application stability.
- **Enhanced Monitoring & Notifications**:
  - **Email notifications** notify team members of build successes and failures.
