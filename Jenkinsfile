pipeline {
  agent any

  environment {
    DOCKER_IMAGE_BACKEND = "student-absence-backend"
    DOCKER_IMAGE_FRONTEND = "student-absence-frontend"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'master', url: 'https://github.com/salma123778/student-abs.git'
      }
    }

    stage('Install Backend Dependencies') {
      agent {
        docker {
          image 'node:18-alpine'
          args '-v /var/jenkins_home:/var/jenkins_home'  // optionnel, volume Jenkins
        }
      }
      steps {
        dir('backend') {
          sh 'npm install'
        }
      }
    }

    stage('Run Backend Tests') {
      agent {
        docker {
          image 'node:18-alpine'
        }
      }
      steps {
        dir('backend') {
          sh 'npm test'
        }
      }
    }

    // Idem pour frontend (npm install, npm test) : utiliser agent docker node:18-alpine

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
      }
    }

    stage('Deploy with Ansible') {
      steps {
        sh 'ansible-playbook ansible/playbook.yml'
      }
    }
  }
}
