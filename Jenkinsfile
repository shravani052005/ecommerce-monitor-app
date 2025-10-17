pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "2203128/ecommerce-monitor"
        KUBE_CONFIG = "/var/lib/jenkins/.kube/config" // Adjust if needed
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-username/ecommerce-monitor.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:latest -f docker/Dockerfile .'
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-cred',
                usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push $DOCKER_IMAGE:latest"
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f k8s-manifests/deployment.yaml'
                    sh 'kubectl apply -f k8s-manifests/service.yaml'
                }
            }
        }
    }
}
