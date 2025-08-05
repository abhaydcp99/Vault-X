#!/bin/bash

echo "Starting VaultX Banking API - Spring Boot Backend"
echo "================================================"

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Maven is not installed. Please install Maven to run the Spring Boot application."
    exit 1
fi

# Set port
export SERVER_PORT=8081

echo "Building the application..."
mvn clean compile

echo "Starting Spring Boot application on port 8081..."
echo "API will be available at: http://localhost:8081/api"
echo "H2 Console: http://localhost:8081/api/h2-console"
echo "Swagger UI: http://localhost:8081/api/swagger-ui.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

mvn spring-boot:run
