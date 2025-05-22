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
          args "-v $WORKSPACE:$WORKSPACE -w $WORKSPACE"
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
          args "-v $WORKSPACE:$WORKSPACE -w $WORKSPACE"
        }
      }
      steps {
        dir('backend') {
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
          sh "docker build -t $DOCKER_IMAGE_FRONTEND -f frontend/Dockerfile frontend"
        }
      }
    }

    stage('Push Images') {
      steps {
        echo "Push vers registry si configuré"
        // Exemples :
        // sh "docker tag $DOCKER_IMAGE_BACKEND your-registry/$DOCKER_IMAGE_BACKEND"
        // sh "docker push your-registry/$DOCKER_IMAGE_BACKEND"
      }
    }

    stage('Deploy with Ansible') {
      steps {
        sh 'ansible-playbook ansible/playbook.yml'
      }
    }
  }
}
