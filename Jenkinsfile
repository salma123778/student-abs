pipeline {
  agent any

  environment {
    DOCKER_IMAGE_BACKEND = "salma123778/student-absence-backend"
    DOCKER_IMAGE_FRONTEND = "salma123778/student-absence-frontend"
  }

  stages {

    stage('📥 Cloner le dépôt GitHub') {
      steps {
        git branch: 'master', url: 'https://github.com/salma123778/student-abs.git'
        sh 'ls -l'
      }
    }

    // BACKEND
    stage('📦 Installer les dépendances Backend') {
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

    stage('✅ Lancer les tests Backend') {
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

    // FRONTEND
    stage('📦 Installer les dépendances Frontend') {
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

    stage('✅ Lancer les tests Frontend') {
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

    // BUILD IMAGES
    stage('🐳 Construction de l’image Docker Backend') {
      steps {
        dir('backend') {
          sh "docker build -t $DOCKER_IMAGE_BACKEND ."
        }
      }
    }

    stage('🐳 Construction de l’image Docker Frontend') {
      steps {
        dir('frontend') {
          sh "docker build -t $DOCKER_IMAGE_FRONTEND -f Dockerfile ."
        }
      }
    }

    // PUSH IMAGES
    stage('🚀 Pousser les images vers Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'git-docker',
          usernameVariable: 'DOCKER_USERNAME',
          passwordVariable: 'DOCKER_PASSWORD'
        )]) {
          sh '''
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            docker push $DOCKER_IMAGE_BACKEND
            docker push $DOCKER_IMAGE_FRONTEND
          '''
        }
      }
    }

    // DEPLOY
    stage('🛠 Déploiement avec Ansible') {
      steps {
        sh 'ansible-playbook ansible/playbook.yml'
      }
    }
  }
}
