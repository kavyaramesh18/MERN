pipeline {
    agent any

    tools {
        nodejs 'Nodejs' // Replace with your Node.js installation name in Jenkins
    }

    environment {
        SONAR_SCANNER_HOME = tool 'sonarqube' // Replace with your SonarScanner tool name in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies using npm
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Pass SonarQube credentials securely
                withCredentials([string(credentialsId: 'mern1', variable: 'SONAR_TOKEN')]) {
                    bat """
                    ${SONAR_SCANNER_HOME}/bin/sonar-scanner.bat ^
                      -Dsonar.projectKey=MERN ^
                      -Dsonar.sources=. ^
                      -Dsonar.host.url=http://localhost:9000 ^
                      -Dsonar.login=%%SONAR_TOKEN%% ^
                      -X
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
