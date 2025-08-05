# VaultX Banking System - Backend Integration

This project now includes **TWO separate backend implementations** providing identical banking functionality:

1. **Spring Boot Backend** (Java) - Port 8081
2. **.NET Core Backend** (C#) - Port 5001

Both backends implement the same REST API endpoints and can be used interchangeably with the React frontend.

## 🏗️ Architecture Overview

```
Frontend (React)
       ↓
API Service Layer
   ↙       ↘
Spring Boot   .NET Core
(Port 8081)   (Port 5001)
   ↓           ↓
H2 Database   In-Memory DB
```

## 🚀 Quick Start

### Prerequisites

- **For Spring Boot**: Java 17+, Maven 3.6+
- **For .NET Core**: .NET 8.0 SDK
- **For Frontend**: Node.js 18+, npm

### 1. Start the Frontend

```bash
npm install
npm run dev
```

The frontend will be available at `http://localhost:8080`

### 2. Start Spring Boot Backend

```bash
cd backend-springboot
./start.sh
# Or manually:
# mvn spring-boot:run
```

The Spring Boot API will be available at `http://localhost:8081/api`

### 3. Start .NET Core Backend

```bash
cd backend-dotnet
./start.sh
# Or manually:
# cd VaultX.Banking.API && dotnet run --urls="http://localhost:5001"
```

The .NET Core API will be available at `http://localhost:5001/api`

## 🔄 Backend Switching

The frontend includes a **Backend Selector** component that allows you to:

1. **View available backends** and their status
2. **Switch between backends** in real-time
3. **Test API connectivity** for both backends
4. **Compare response times** and functionality

### How to Switch Backends

1. Click the **Backend Selector** button in the top navigation
2. View the status of both backends (running/stopped)
3. Click "Switch to [Backend]" to change the active backend
4. The frontend will immediately start using the selected backend

## 📡 API Endpoints

Both backends implement identical REST API endpoints:

### Health & Demo
- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint with backend info

### Customer Management
- `POST /api/customers/register` - Register new customer
- `POST /api/customers/login` - Customer login
- `GET /api/customers` - Get all customers
- `GET /api/customers/{id}` - Get customer by ID
- `PUT /api/customers/{id}/status` - Update customer status

### Banking Operations
- `POST /api/customers/{id}/transactions` - Create transaction
- `GET /api/customers/{id}/transactions` - Get customer transactions
- `GET /api/customers/{id}/balance` - Get customer balance

## 🧪 Testing the Integration

### 1. Backend Demo Page

Visit `http://localhost:8080/backend-demo` to access the comprehensive testing interface:

- **Backend Status Monitoring**
- **API Endpoint Testing**
- **Performance Comparison**
- **Real-time Backend Switching**

### 2. Manual API Testing

#### Test Spring Boot Backend:
```bash
# Health check
curl http://localhost:8081/api/ping

# Demo endpoint
curl http://localhost:8081/api/demo

# Get customers
curl http://localhost:8081/api/customers
```

#### Test .NET Core Backend:
```bash
# Health check
curl http://localhost:5001/api/ping

# Demo endpoint
curl http://localhost:5001/api/demo

# Get customers
curl http://localhost:5001/api/customers
```

### 3. Integration Testing

The frontend automatically adapts to whichever backend is selected:

1. **Register a customer** using one backend
2. **Switch to the other backend**
3. **Login with the same credentials** (data is isolated per backend)
4. **Perform banking operations** (transfers, deposits, withdrawals)
5. **Compare functionality** between both backends

## 🔧 Backend Technologies

### Spring Boot Backend
- **Framework**: Spring Boot 3.2.1
- **Language**: Java 17
- **Database**: H2 In-Memory Database
- **ORM**: JPA/Hibernate
- **Security**: Spring Security + BCrypt
- **Documentation**: Swagger UI at `/swagger-ui.html`
- **Database Console**: H2 Console at `/h2-console`

### .NET Core Backend
- **Framework**: .NET 8.0
- **Language**: C#
- **Database**: In-Memory Database
- **ORM**: Entity Framework Core
- **Security**: JWT Authentication + BCrypt
- **Documentation**: Swagger UI at `/swagger`

## 💾 Database & Data

### Data Isolation
- Each backend maintains its **own database**
- Customer data registered in Spring Boot **won't appear** in .NET Core
- This allows for **independent testing** of both backends

### Seed Data
Both backends include sample data:

**Employees:**
- Admin: `admin@vaultx.com` / `admin123`
- Manager: `manager@vaultx.com` / `manager123`
- Clerk: `clerk@vaultx.com` / `clerk123`

**Customers:**
- John Doe: `john.doe@example.com` / `customer123`

## 🔒 Security & CORS

Both backends are configured with:

- **CORS enabled** for frontend origins (`localhost:8080`, `localhost:3000`, `localhost:5173`)
- **Password hashing** using BCrypt
- **Input validation** on all endpoints
- **Error handling** with consistent response format

## 🐛 Troubleshooting

### Backend Not Starting

**Spring Boot:**
```bash
# Check Java version
java -version

# Check Maven
mvn -version

# Clean and rebuild
mvn clean compile
```

**-.NET Core:**
```bash
# Check .NET version
dotnet --version

# Restore dependencies
dotnet restore

# Clean and rebuild
dotnet clean && dotnet build
```

### Port Conflicts

If ports 8081 or 5001 are in use:

**Spring Boot:** Edit `application.yml` and change `server.port`
**.NET Core:** Edit `appsettings.Development.json` and change `Urls`

### CORS Issues

Both backends are pre-configured for local development. If you encounter CORS issues:

1. Check that the frontend origin is in the allowed origins list
2. Ensure the backend is running on the expected port
3. Clear browser cache and cookies

## 📊 Performance Comparison

The Backend Demo page provides performance metrics:

- **Response Times** for each endpoint
- **Success/Failure Rates** for API calls
- **Backend Availability** monitoring
- **Feature Comparison** table

## 🔮 Future Enhancements

- **Database Persistence**: Add PostgreSQL/SQL Server support
- **Authentication**: Implement JWT tokens for session management
- **Caching**: Add Redis caching layer
- **Monitoring**: Integrate application performance monitoring
- **Load Balancing**: Support multiple backend instances
- **Docker**: Containerize both backends

## 🤝 Contributing

When working with the dual backend setup:

1. **Maintain API Compatibility**: Changes to one backend should be mirrored in the other
2. **Update Documentation**: Keep this README updated with any changes
3. **Test Both Backends**: Ensure functionality works identically in both
4. **Consider Performance**: Compare response times and optimization opportunities

## 📝 API Response Format

Both backends use consistent response format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

This ensures the frontend can work seamlessly with either backend implementation.
