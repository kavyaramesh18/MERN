pipeline {
    agent any

    tools {
        nodejs 'Nodejs' // Replace 'Nodejs' with the exact name of your Node.js installation in Jenkins
    }

    environment {
        SONAR_SCANNER_HOME = tool 'sonarqube' // Replace with the name of your SonarScanner tool in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'mern', variable: 'SONAR_TOKEN')]) {
                    bat """
                    ${SONAR_SCANNER_HOME}/bin/sonar-scanner.bat ^
                      -Dsonar.projectKey=MERN ^
                      -Dsonar.sources=. ^
                      -Dsonar.host.url=http://localhost:9000 ^
                      -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
