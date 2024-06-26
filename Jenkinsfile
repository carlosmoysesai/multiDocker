pipeline {
    agent any
    environment {
        DOCKER_COMPOSE_FILE = "docker-compose.yml"  // Arquivo docker-compose
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/carlosmoysesai/multiDocker'  // URL do seu repositório Git e o nome do branch correto
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
                    // Remove todos os containers definidos no docker-compose.yml
                    sh "docker-compose -f ${DOCKER_COMPOSE_FILE} down"
                }
            }
        }
        stage('Run New Containers') {
            steps {
                script {
                    // Inicia todos os containers em modo detached
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
                to: 'yuriflausino14@gmail.com'
            )
        }
        failure {
            emailext(
                subject: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) failed",
                body: "Job '${env.JOB_NAME}' (${env.BUILD_NUMBER}) failed. Check Jenkins for details.",
                recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: 'yuriflausino14@gmail.com'
            )
        }
    }
}
