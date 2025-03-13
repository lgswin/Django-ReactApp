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
        script {
            echo "Build successful - attempting to send email"
        }
        emailext (
            recipientProviders: [culprits(), developers()],
            to: 'lgswin@gmail.com',
            replyTo: 'noreply@yourdomain.com',
            subject: "Jenkins Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
            The build was successful.

            - Job: ${env.JOB_NAME}
            - Build Number: ${env.BUILD_NUMBER}
            - Build URL: ${env.BUILD_URL}
            """
        )
    }

    failure {
        script {
            echo "Build failed - attempting to send email"
        }
        emailext (
            recipientProviders: [culprits(), developers()],
            to: 'lgswin@gmail.com',
            replyTo: 'noreply@yourdomain.com',
            subject: "Jenkins Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
            The build failed.

            - Job: ${env.JOB_NAME}
            - Build Number: ${env.BUILD_NUMBER}
            - Build URL: ${env.BUILD_URL}
            - Please check logs for more details.
            """
        )
    }
}
}