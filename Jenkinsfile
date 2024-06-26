pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = "docker-compose.yml"
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                script {
                    deleteDir() // Limpa o diretório de trabalho antes de clonar (opcional)
                    git branch: 'main', url: 'https://github.com/carlosmoysesai/multiDocker'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} build"
                }
            }
        }
        
        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down"
                }
            }
        }
        
        stage('Run New Containers') {
            steps {
                script {
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
                }
            }
        }
    }
    
    post {
        success {
            emailext(
                subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) succeeded",
                body: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) succeeded.",
                recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: 'carlos.moyses@gmail.com'
            )
        }
        failure {
            emailext(
                subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) failed",
                body: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) failed. Check Jenkins for details.",
                recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: 'carlos.moyses@gmail.com'
            )
        }
    }
}
