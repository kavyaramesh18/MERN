pipeline {
    agent any
    tools {
        nodejs 'Nodejs'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/kavyaramesh18/MERN.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
    }
}
