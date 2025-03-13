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

    post {
        success {
            emailext (
                to: 'your-email@yourcollege.edu',
                subject: "Jenkins Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The build was successful.\n\nCheck details: ${env.BUILD_URL}"
            )
        }

        failure {
            emailext (
                to: 'your-email@yourcollege.edu',
                subject: "Jenkins Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "The build failed.\n\nCheck details: ${env.BUILD_URL}"
            )
        }
    }
}