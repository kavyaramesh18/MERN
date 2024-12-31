pipeline {
    agent any

    tools {
        nodejs 'Nodejs'  // Ensure this matches the Node.js tool name in Jenkins
    
    }

    environment {
        PATH = "${tool 'NodeJS 14'}/bin:${env.PATH}"  // Ensures Node.js is available in the path
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the code from the GitHub repository
                git url: 'https://github.com/kavyaramesh18/MERN.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies using npm (Windows-specific command)
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Use the SonarQube token stored in Jenkins credentials
                withCredentials([string(credentialsId: 'mern', variable: 'SONAR_TOKEN')]) {
                    // Run SonarQube analysis using the token
                    bat 'sonar-scanner.bat -D"sonar.projectKey=MERN" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=${SONAR_TOKEN}"'
                }
            }
        }
    }

    post {
        success {
            echo 'Build and SonarQube analysis completed successfully!'
        }
        failure {
            echo 'Build or analysis failed.'
        }
    }
}
