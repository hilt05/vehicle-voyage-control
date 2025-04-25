
# Fleet Vehicles Management System - Backend

This is the backend service for the Fleet Vehicles Management System, built with Spring Boot and MySQL.

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven
- MySQL 8.0 or higher

### Database Setup
1. Create a MySQL database:
   ```sql
   CREATE DATABASE fleet_vehicles;
   ```
2. Create a database user:
   ```sql
   CREATE USER 'fleetadmin'@'localhost' IDENTIFIED BY 'fleetpassword';
   GRANT ALL PRIVILEGES ON fleet_vehicles.* TO 'fleetadmin'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Running the Application
1. Clone the repository
2. Navigate to the project directory
3. Build the project:
   ```bash
   mvn clean install
   ```
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

The server will start on port 8080.

## API Documentation

### Service Providers API

- **GET /api/service-providers** - Get all service providers
- **GET /api/service-providers/{id}** - Get a specific service provider by ID
- **GET /api/service-providers/status/{status}** - Get service providers by status (active/inactive)
- **POST /api/service-providers** - Create a new service provider
- **PUT /api/service-providers/{id}** - Update an existing service provider
- **DELETE /api/service-providers/{id}** - Delete a service provider
- **PATCH /api/service-providers/{id}/toggle-status** - Toggle service provider status

### Inventory API

- **GET /api/inventory** - Get all inventory items
- **GET /api/inventory/{id}** - Get a specific inventory item by ID
- **GET /api/inventory/category/{category}** - Get inventory items by category
- **GET /api/inventory/low-stock** - Get low stock inventory items
- **POST /api/inventory** - Create a new inventory item
- **PUT /api/inventory/{id}** - Update an existing inventory item
- **DELETE /api/inventory/{id}** - Delete an inventory item

## Configuration

Application configuration can be modified in the `src/main/resources/application.properties` file.
