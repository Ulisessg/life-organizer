pipeline {
    agent any

    tools {
        nodejs 'node22'
    }

    stages {
        stage('Set env vars to testing') {
            steps {
                withCredentials([
                    string(credentialsId: 'test-keycloak-realm-client-id', variable: 'TEST_KEYCLOAK_REALM_CLIENT_ID'),
                    string(credentialsId: 'test-keycloak-realm-client-secret', variable: 'TEST_KEYCLOAK_REALM_CLIENT_SECRET'),
                    string(credentialsId: 'test-keycloak-realm-client-issuer', variable: 'TEST_KEYCLOAK_ISSUER'),
                    string(credentialsId: 'test-nextauth_url', variable: 'TEST_NEXTAUTH_URL'),
                    string(credentialsId: 'test-cypress-env-json', variable: 'TEST_CYPRESS_ENV_JSON')
                ]) {
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
                sh 'rm -f .env.local cypress.env.json'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'prod-keycloak-realm-client-id', variable: 'PROD_KEYCLOAK_REALM_CLIENT_ID'),
                    string(credentialsId: 'prod-keycloak-realm-client-secret', variable: 'PROD_KEYCLOAK_REALM_CLIENT_SECRET'),
                    string(credentialsId: 'prod-keycloak-realm-client-issuer', variable: 'PROD_KEYCLOAK_ISSUER'),
                    string(credentialsId: 'prod-nextauth_url', variable: 'PROD_NEXTAUTH_URL')
                ]) {
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
}


