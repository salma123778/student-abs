pipeline {
  agent any

  stages {
    stage('Cloner le dépôt') {
      steps {
        git branch: 'master', url: 'https://github.com/salma123778/student-abs.git'
      }
    }

    stage('Installer dépendances Backend et Frontend') {
      steps {
        script {
          ['backend', 'frontend'].each { service ->
            echo "Installer dépendances pour ${service}"
            docker.image('node:18-alpine').inside("-v ${env.WORKSPACE}/${service}:/app -w /app") {
              sh 'ls -l /app'   // Pour vérifier que package.json est bien là
              sh 'npm install'
            }
          }
        }
      }
    }

    stage('Lancer tests Backend et Frontend') {
      steps {
        script {
          ['backend', 'frontend'].each { service ->
            echo "Lancer tests pour ${service}"
            docker.image('node:18-alpine').inside("-v ${env.WORKSPACE}/${service}:/app -w /app") {
              sh 'npm test'
            }
          }
        }
      }
    }

    stage('Construire images avec docker-compose') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Pousser images vers Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'git-docker', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh '''
            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
            docker-compose push
          '''
        }
      }
    }

    stage('Déployer avec Ansible') {
      steps {
        sh 'ansible-playbook ansible/playbook.yml'
      }
    }
  }
}
