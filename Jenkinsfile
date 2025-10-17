pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "2203128/ecommerce-monitor" // Replace with your DockerHub username
        KUBE_CONFIG = "/var/lib/jenkins/.kube/config" // Adjust if your kubeconfig is elsewhere
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/shravani052005/ecommerce-monitor-app.git'
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
                                                  usernameVariable: 'DOCKER_USER', 
                                                  passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push $DOCKER_IMAGE:latest'
                    }
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

        stage('Verify Deployment') {
            steps {
                script {
                    sh 'kubectl get pods'
                    sh 'kubectl get svc'
                    sh 'kubectl get deployments'
                }
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline completed successfully!'
        }
        failure {
            echo '❌ CI/CD Pipeline failed. Check logs!'
        }
    }
}
