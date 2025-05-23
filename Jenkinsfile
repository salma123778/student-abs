pipeline {
  agent any

  environment {
    DOCKER_IMAGE_BACKEND = "salma123778/student-absence-backend"
    DOCKER_IMAGE_FRONTEND = "salma123778/student-absence-frontend"
  }

  stages {

    stage('📥 Cloner le dépôt') {
      steps {
        git branch: 'master', url: 'https://github.com/salma123778/student-abs.git'
        sh 'ls -l'
      }
    }

    stage('📦 dépendances') {
      agent {
        docker {
          image 'node:18-alpine'
          args "-v $WORKSPACE/backend:$WORKSPACE/backend -v $WORKSPACE/frontend:$WORKSPACE/frontend"
        }
      }
      steps {
        dir('backend') {
          sh 'npm install'
        }
        dir('frontend') {
          sh 'npm install'
        }
      }
    }

    stage('✅ tests') {
      agent {
        docker {
          image 'node:18-alpine'
          args "-v $WORKSPACE/backend:$WORKSPACE/backend -v $WORKSPACE/frontend:$WORKSPACE/frontend"
        }
      }
      steps {
        dir('backend') {
          sh 'npm test'
        }
        dir('frontend') {
          sh 'npm test'
        }
      }
    }

    stage('🐳 Docker Compose') {
      steps {
        // Vérifie que docker-compose.yml est à la racine du workspace
        sh 'docker-compose -f docker-compose.yml build'
      }
    }

    stage('🚀 Push Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'git-docker',
          usernameVariable: 'DOCKER_USERNAME',
          passwordVariable: 'DOCKER_PASSWORD'
        )]) {
          sh '''
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            docker-compose push
          '''
        }
      }
    }

    stage('🛠 Déployer avec Ansible') {
      steps {
        sh 'ansible-playbook ansible/playbook.yml'
      }
    }
  }
}
