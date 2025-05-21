pipeline {
  agent any

  environment {
    DOCKER_IMAGE_BACKEND = "student-absence-backend"
    DOCKER_IMAGE_FRONTEND = "student-absence-frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([
          $class: 'GitSCM',
          branches: [[name: '*/master']],
          userRemoteConfigs: [[
            url: 'https://github.com/salma123778/student-abs.git'
          ]]
        ])
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir('backend') {
          sh 'npm install'
        }
      }
    }

    stage('Run Backend Tests') {
      steps {
        dir('backend') {
          sh 'npm test'
        }
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('frontend') {
          sh 'npm install'
        }
      }
    }

    stage('Run Frontend Tests') {
      steps {
        dir('frontend') {
          sh 'npm test'
        }
      }
    }

    stage('Build Backend Docker Image') {
      steps {
        dir('backend') {
          sh "docker build -t $DOCKER_IMAGE_BACKEND ."
        }
      }
    }

    stage('Build Frontend Docker Image') {
      steps {
        dir('frontend') {
          sh "docker build -t $DOCKER_IMAGE_FRONTEND ."
        }
      }
    }

    stage('Push Images') {
      steps {
        echo "Push vers registry si configuré"
        // ex: sh "docker push $DOCKER_IMAGE_BACKEND"
        // ex: sh "docker push $DOCKER_IMAGE_FRONTEND"
      }
    }

    stage('Deploy with Ansible') {
      steps {
        sh 'ansible-playbook ansible/playbook.yml'
      }
    }
  }
}
