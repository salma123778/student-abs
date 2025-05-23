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

    stage('📦 Installer dépendances Backend et Frontend') {
      steps {
        script {
          def services = ['backend', 'frontend']
          services.each { service ->
            echo "Installation des dépendances pour ${service}"
            docker.image('node:18-alpine').inside("-v ${env.WORKSPACE}/${service}:/app -w /app") {
              sh 'npm install'
            }
          }
        }
      }
    }

    stage('✅ Lancer tests Backend et Frontend') {
      steps {
        script {
          def services = ['backend', 'frontend']
          services.each { service ->
            echo "Lancement des tests pour ${service}"
            docker.image('node:18-alpine').inside("-v ${env.WORKSPACE}/${service}:/app -w /app") {
              sh 'npm test'
            }
          }
        }
      }
    }

    stage('🐳 Construire images avec docker-compose') {
      steps {
        sh 'docker-compose -f docker-compose.yml build'
      }
    }

    stage('🚀 Pousser images vers Docker Hub') {
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
