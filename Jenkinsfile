pipeline {
    agent any
    tools {
        nodejs 'node22'
    }
    environment {
        // Testing
        TEST_KEYCLOAK_REALM_CLIENT_ID = credentials('test-keycloak-realm-client-id')
        TEST_KEYCLOAK_REALM_CLIENT_SECRET = credentials('test-keycloak-realm-client-secret')
        TEST_KEYCLOAK_ISSUER = credentials('test-keycloak-realm-client-issuer')
        TEST_NEXTAUTH_URL = credentials('test-nextauth_url')
        TEST_CYPRESS_ENV_JSON = credentials('test-cypress-env-json')
        // Production
        PROD_KEYCLOAK_REALM_CLIENT_ID = credentials('prod-keycloak-realm-client-id')
        PROD_KEYCLOAK_REALM_CLIENT_SECRET = credentials('prod-keycloak-realm-client-secret')
        PROD_KEYCLOAK_ISSUER = credentials('prod-keycloak-realm-client-issuer')
        PROD_NEXTAUTH_URL = credentials('prod-nextauth_url')
    }
    stages {
        stage('Set env vars') {
            steps {
                // Create env vars for NextJs server and cypress
                sh '''
                    npx auth secret
                    echo "AUTH_KEYCLOAK_ID=$TEST_KEYCLOAK_REALM_CLIENT_ID" >> .env.local
                    echo "AUTH_KEYCLOAK_SECRET=$TEST_KEYCLOAK_REALM_CLIENT_SECRET" >> .env.local
                    echo "NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER=$TEST_KEYCLOAK_ISSUER" >> .env.local
                    echo "NEXTAUTH_URL=$TEST_NEXTAUTH_URL" >> .env.local
                    echo "$TEST_CYPRESS_ENV_JSON" > cypress.env.json
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
                sh 'rm .env.local'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    npx auth secret
                    echo "AUTH_KEYCLOAK_ID=$PROD_KEYCLOAK_REALM_CLIENT_ID" >> .env.local
                    echo "AUTH_KEYCLOAK_SECRET=$PROD_KEYCLOAK_REALM_CLIENT_SECRET" >> .env.local
                    echo "NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER=$PROD_KEYCLOAK_ISSUER" >> .env.local
                    echo "NEXTAUTH_URL=$PROD_NEXTAUTH_URL" >> .env.local
                '''
                sh 'echo ToDo'
            }
        }
    }
}
