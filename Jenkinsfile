pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = "docker compose"
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