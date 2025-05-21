pipeline {
    agent any
    stages {
        stage('Test clone') {
            steps {
                sh 'rm -rf student-abs'
                sh 'git clone https://github.com/salma123778/student-abs.git'
            }
        }
    }
}
