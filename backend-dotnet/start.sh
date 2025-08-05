#!/bin/bash

echo "Starting VaultX Banking API - .NET Core Backend"
echo "==============================================="

# Check if .NET is installed
if ! command -v dotnet &> /dev/null; then
    echo ".NET SDK is not installed. Please install .NET 8.0 SDK to run the application."
    exit 1
fi

# Navigate to project directory
cd VaultX.Banking.API

echo "Restoring dependencies..."
dotnet restore

echo "Building the application..."
dotnet build

echo "Starting .NET Core application on port 5001..."
echo "API will be available at: http://localhost:5001/api"
echo "Swagger UI: http://localhost:5001/swagger"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

dotnet run --urls="http://localhost:5001"
