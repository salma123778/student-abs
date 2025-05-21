pipeline {
  agent any

  stages {
    stage('Nettoyage du workspace') {
      steps {
        deleteDir()
      }
    }

    stage('Vérification de Git') {
      steps {
        sh 'git --version'
      }
    }

    stage('Récupération du code') {
      steps {
        git url: 'https://github.com/salma123778/student-abs.git', branch: 'master'
      }
    }
  }
}
