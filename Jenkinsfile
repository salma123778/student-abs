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

    // Backend dependencies & tests
    stage('📦 Installer dépendances Backend') {
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

    stage('✅ Lancer tests Backend') {
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

    // Frontend dependencies & tests
    stage('📦 Installer dépendances Frontend') {
      agent {
        docker {
          image 'node:18-alpine'
          args "-v $WORKSPACE:$WORKSPACE -w $WORKSPACE"
        }
      }
      steps {
        dir('frontend') {
          sh 'npm install'
        }
      }
    }

    stage('✅ Lancer tests Frontend') {
      agent {
        docker {
          image 'node:18-alpine'
          args "-v $WORKSPACE:$WORKSPACE -w $WORKSPACE"
        }
      }
      steps {
        dir('frontend') {
          sh 'npm test'
        }
      }
    }

    // Build images with docker-compose
    stage('🐳 Construire images avec docker-compose') {
      steps {
        // Assure-toi que docker-compose.yml est à la racine ou indique le chemin
        sh 'docker-compose build'
      }
    }

    // Push images vers Docker Hub
    stage('🚀 Pousser images Docker Hub') {
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

    // Deployment avec Ansible
    stage('🛠 Déployer avec Ansible') {
      steps {
        sh 'ansible-playbook ansible/playbook.yml'
      }
    }
  }
}
