pipeline {
    agent any
    tools {
        nodejs 'node22'
    }
    environment {
        KEYCLOAK_REALM_ID = credentials('keycloak-realm-id')
        KEYCLOAK_REALM_SECRET = credentials('keycloak-realm-secret')
        KEYCLOAK_REALM_ISSUER = credentials('keycloak-realm-issuer')
        NEXTAUTH_URL = credentials('nextauth_url')
    }
    stages {
        stage('Set env vars') {
            steps {
                sh '''
                    npx auth secret
                    echo "AUTH_KEYCLOAK_ID=$KEYCLOAK_ID" >> .env.local
                    echo "AUTH_KEYCLOAK_SECRET=$KEYCLOAK_SECRET" >> .env.local
                    echo "NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER=$KEYCLOAK_REALM_ISSUER" >> .env.local
                    echo "NEXTAUTH_URL=$NEXTAUTH_URL" >> .env.local
                '''
            }
        }
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo ToDo'
            }
        }
    }
}
